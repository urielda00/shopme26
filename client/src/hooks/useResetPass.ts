import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams, useNavigate } from "react-router-dom";
import { resetPasswordAPI } from "../services/passwordService";
import axiosInstance from "../utils/axiosInstance";

export interface ResetFormValues {
	password: string;
	confirmPassword: string;
}

export const useResetPass = () => {
	const { id, token } = useParams<{ id: string; token: string }>();
	const navigate = useNavigate();

	const [loading, setLoading] = useState(false);
	const [verifyingLink, setVerifyingLink] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [successMessage, setSuccessMessage] = useState("");
	const [submitError, setSubmitError] = useState("");

	const { register, handleSubmit, formState, watch, reset } = useForm<ResetFormValues>({
		mode: "onChange",
		defaultValues: {
			password: "",
			confirmPassword: "",
		},
	});

	useEffect(() => {
		const verifyResetLink = async () => {
			if (!id || !token) {
				setSubmitError("Reset link is invalid or incomplete.");
				setVerifyingLink(false);
				return;
			}

			try {
				await axiosInstance.get(`/resetPass/reset/${id}/${token}`);
				setSubmitError("");
			} catch (error: any) {
				console.error("Link verification error:", error);
				const serverMessage = error?.message || "This reset link is invalid or has expired.";
				setSubmitError(`Server Error: ${serverMessage}`);
			} finally {
				setVerifyingLink(false);
			}
		};

		verifyResetLink();
	}, [id, token]);

	const onSubmit = async (data: ResetFormValues) => {
		if (!id || !token) {
			setSubmitError("Reset link is invalid or incomplete.");
			return;
		}

		setSubmitError("");
		setSuccessMessage("");
		setLoading(true);

		try {
			await resetPasswordAPI(id, token, {
				password: data.password,
				confirmPassword: data.confirmPassword,
			});

			setSuccessMessage("Password updated successfully. Redirecting to login...");
			reset();

			setTimeout(() => {
				navigate("/login");
			}, 1800);
		} catch (error: any) {
			// Retrieve the specific validation error array first, then fallback to the general message
			const serverMessage =
				error?.errors?.[0] ||
				error?.message ||
				"Something went wrong while updating your password. Please try again.";
			setSubmitError(serverMessage);
		} finally {
			setLoading(false);
		}
	};

	return {
		register,
		handleSubmit,
		errors: formState.errors,
		isValid: formState.isValid,
		isDirty: formState.isDirty,
		passwordValue: watch("password"),
		loading,
		verifyingLink,
		showPassword,
		setShowPassword,
		successMessage,
		submitError,
		onSubmit,
	};
};
