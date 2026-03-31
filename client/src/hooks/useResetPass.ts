import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../services/passwordService';

export interface ResetFormValues {
    password: string;
    confirmPassword: string;
}

export const useResetPass = () => {
    const { id, token } = useParams<{ id: string; token: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [submitError, setSubmitError] = useState('');

    const { register, handleSubmit, formState, watch, reset } = useForm<ResetFormValues>({
        mode: 'onChange',
        defaultValues: {
            password: '',
            confirmPassword: '',
        },
    });

    const onSubmit = async (data: ResetFormValues) => {
        if (!id || !token) {
            setSubmitError('Reset link is invalid or incomplete.');
            return;
        }

        setSubmitError('');
        setSuccessMessage('');
        setLoading(true);

        try {
            await resetPasswordAPI(id, token, {
                password: data.password,
                confirmPassword: data.confirmPassword,
            });

            setSuccessMessage('Password updated successfully. Redirecting to login...');
            reset();

            setTimeout(() => {
                navigate('/login');
            }, 1800);
        } catch (error) {
            setSubmitError('Something went wrong while updating your password. Please try again.');
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
        passwordValue: watch('password'),
        loading,
        showPassword,
        setShowPassword,
        successMessage,
        submitError,
        onSubmit,
    };
};