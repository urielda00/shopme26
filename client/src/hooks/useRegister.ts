import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { registerAPI } from '../services/authService';
import { IFormValues } from '../interfaces/auth.interface';

const useRegister = () => {
    const [passwordEye, setPasswordEye] = useState(false);
    const [passwordEyeVerify, setPasswordEyeVerify] = useState(false);
    const [fetchErrors, setFetchErrors] = useState<string | null>(null);
    const [openPassHelp, setOpenPassHelp] = useState(false);
    const [successFetch, setSuccessFetch] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);

    const navigate = useNavigate();

    const form = useForm<IFormValues>({ mode: 'onChange' });
    const { register, handleSubmit, formState, watch, reset } = form;
    const { errors, isDirty, isValid, isSubmitSuccessful } = formState;

    const password = watch('password');

    const onCaptchaChange = () => setCaptchaVerified(true);
    const handleChangeEyePassword = () => setPasswordEye(!passwordEye);
    const handleChangeEyeVerify = () => setPasswordEyeVerify(!passwordEyeVerify);

    const onSubmit = async (data: IFormValues) => {
        try {
            await registerAPI(data);
            setFetchErrors(null);
            setSuccessFetch(true);
            
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error: any) {
            setFetchErrors(error.message);
        }
    };

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset();
            const timer = setTimeout(() => {
                setFetchErrors(null);
            }, 4000);
            return () => clearTimeout(timer); // Cleanup timeout on unmount
        }
    }, [isSubmitSuccessful, reset]);

const passwordErrors: string[] = errors.password?.message ? [errors.password.message] : [];
    return {
        reset,
        errors,
        isDirty,
        isValid,
        passwordErrors,
        onSubmit: handleSubmit(onSubmit),
        password,
        register,
        passwordEye,
        fetchErrors,
        openPassHelp,
        successFetch,
        onCaptchaChange,
        captchaVerified,
        setOpenPassHelp,
        passwordEyeVerify,
        handleChangeEyeVerify,
        handleChangeEyePassword,
    };
};

export default useRegister;