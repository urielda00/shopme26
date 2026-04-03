import { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { updateAuthUser } from "../features/userSlice";
import {
	getMyOrdersAPI,
	getMyProfileAPI,
	updateUserInfoAPI,
	updateUserPasswordAPI,
	IUserOrder,
	IUserProfile,
} from "../services/userDashboardService";

export interface ProfileFormState {
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
}

export interface PasswordFormState {
	insertPrePassword: string;
	password: string;
	verifyPass: string;
}

const initialProfileForm: ProfileFormState = {
	firstName: "",
	lastName: "",
	userName: "",
	email: "",
};

const initialPasswordForm: PasswordFormState = {
	insertPrePassword: "",
	password: "",
	verifyPass: "",
};

export const useUserDashboard = () => {
	const dispatch = useAppDispatch();
	const { userId } = useAppSelector((state) => state.user);

	const [profile, setProfile] = useState<IUserProfile | null>(null);
	const [orders, setOrders] = useState<IUserOrder[]>([]);
	const [loading, setLoading] = useState(true);

	const [infoLoading, setInfoLoading] = useState(false);
	const [passwordLoading, setPasswordLoading] = useState(false);

	const [infoSuccess, setInfoSuccess] = useState("");
	const [infoError, setInfoError] = useState("");
	const [passwordSuccess, setPasswordSuccess] = useState("");
	const [passwordError, setPasswordError] = useState("");

	const [profileForm, setProfileForm] = useState<ProfileFormState>(initialProfileForm);
	const [passwordForm, setPasswordForm] = useState<PasswordFormState>(initialPasswordForm);

	const totalSpent = useMemo(() => {
		return orders.reduce((sum, order) => sum + (Number(order.totalPrice) || 0), 0);
	}, [orders]);

	const latestOrderDate = useMemo(() => {
		if (!orders.length) return "No orders yet";

		return new Date(orders[0].createdAt).toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});
	}, [orders]);

	const totalProductsOrdered = useMemo(() => {
		return orders.reduce((sum, order) => {
			const orderQty = order.products.reduce(
				(innerSum, item) => innerSum + (item.quantity || 0),
				0,
			);
			return sum + orderQty;
		}, 0);
	}, [orders]);

	useEffect(() => {
		const loadDashboard = async () => {
			try {
				setLoading(true);

				const [profileResponse, ordersResponse] = await Promise.all([
					getMyProfileAPI(),
					getMyOrdersAPI(),
				]);

				const fetchedProfile: IUserProfile = {
					userId: profileResponse.userId,
					userName: profileResponse.userName,
					firstName: profileResponse.firstName,
					lastName: profileResponse.lastName,
					email: profileResponse.email,
					isAdmin: profileResponse.isAdmin,
					cart: profileResponse.cart || [],
					totalPrice: profileResponse.totalPrice || 0,
					totalItemsInCart: profileResponse.totalItemsInCart || 0,
				};

				const fetchedOrders: IUserOrder[] = Array.isArray(ordersResponse.orders)
					? ordersResponse.orders
					: [];

				setProfile(fetchedProfile);
				setOrders(fetchedOrders);
				setProfileForm({
					firstName: fetchedProfile.firstName || "",
					lastName: fetchedProfile.lastName || "",
					userName: fetchedProfile.userName || "",
					email: fetchedProfile.email || "",
				});
			} catch (error: any) {
				setInfoError(error?.response?.data?.message || "Failed to load user dashboard");
			} finally {
				setLoading(false);
			}
		};

		void loadDashboard();
	}, []);

	const handleProfileInputChange = (field: keyof ProfileFormState, value: string) => {
		setProfileForm((prev) => ({
			...prev,
			[field]: value,
		}));
	};

	const handlePasswordInputChange = (field: keyof PasswordFormState, value: string) => {
		setPasswordForm((prev) => ({
			...prev,
			[field]: value,
		}));

		if (passwordError) setPasswordError("");
		if (passwordSuccess) setPasswordSuccess("");
	};

	const handleSaveProfile = async () => {
		try {
			if (!userId) {
				setInfoError("Missing authenticated user id");
				return;
			}

			setInfoLoading(true);
			setInfoError("");
			setInfoSuccess("");

			const response = await updateUserInfoAPI(userId, profileForm);
			const updated = response.data;

			setProfile((prev) =>
				prev
					? {
							...prev,
							firstName: updated.firstName,
							lastName: updated.lastName,
							userName: updated.userName,
							email: updated.email,
						}
					: prev,
			);

			dispatch(updateAuthUser({ userName: updated.userName }));
			setInfoSuccess("Account details updated successfully");
		} catch (error: any) {
			const backendErrors = error?.response?.data?.errors;
			if (Array.isArray(backendErrors) && backendErrors.length > 0) {
				setInfoError(backendErrors.join(", "));
			} else {
				setInfoError(error?.response?.data?.message || "Failed to update account details");
			}
		} finally {
			setInfoLoading(false);
		}
	};

	const handleSavePassword = async () => {
		try {
			if (!userId) {
				setPasswordError("Missing authenticated user id");
				return;
			}

			setPasswordLoading(true);
			setPasswordError("");
			setPasswordSuccess("");

			await updateUserPasswordAPI(userId, passwordForm);

			setPasswordForm(initialPasswordForm);
			setPasswordSuccess("Password updated successfully");
		} catch (error: any) {
			const backendErrors = error?.response?.data?.errors;
			if (Array.isArray(backendErrors) && backendErrors.length > 0) {
				setPasswordError(backendErrors.join(", "));
			} else {
				setPasswordError(error?.response?.data?.message || "Failed to update password");
			}
		} finally {
			setPasswordLoading(false);
		}
	};

	return {
		profile,
		orders,
		loading,

		infoLoading,
		passwordLoading,

		infoSuccess,
		infoError,
		passwordSuccess,
		passwordError,

		profileForm,
		passwordForm,

		totalSpent,
		latestOrderDate,
		totalProductsOrdered,

		onProfileChange: handleProfileInputChange,
		onPasswordChange: handlePasswordInputChange,
		onSaveProfile: handleSaveProfile,
		onSavePassword: handleSavePassword,
	};
};
