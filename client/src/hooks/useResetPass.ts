import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import { resetPasswordAPI } from '../services/passwordService';

export interface ResetFormValues {
    password: string;
    confirmPassword: string; // Adjusted to match your API
}

export const useResetPass = () => {
    const { id, token } = useParams<{ id: string; token: string }>();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const { register, handleSubmit, formState, watch } = useForm<ResetFormValues>({ 
        mode: 'onChange' 
    });

    const onSubmit = async (data: ResetFormValues) => {
        if (!id || !token) return;
        
        setLoading(true);
        try {
            // Sending the exact object your API expects
            await resetPasswordAPI(id, token, { 
                password: data.password, 
                confirmPassword: data.confirmPassword 
            });
            
            // Navigate to login after success
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            // Error handled by your axios interceptor
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
        onSubmit
    };
};