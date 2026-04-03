import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as types from '../interfaces/admin.interface';
import { createProductAPI, updateProductAPI } from '../services/adminService';

interface UseCreateUpdateProps {
    isUpdate: boolean;
}

const useCreateUpdate = ({ isUpdate }: UseCreateUpdateProps) => {
    const [step, setStep] = useState(1);
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');
    const [image1, setImage1] = useState<File | null>(null);
    const [image2, setImage2] = useState<File | null>(null);
    const [image3, setImage3] = useState<File | null>(null);
    const [image4, setImage4] = useState<File | null>(null);

    const form = useForm<types.IBothFormValues>({
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const { register, handleSubmit, formState, watch, reset, trigger, setValue } = form;
    const { errors, isValid, isDirty, isValidating } = formState;

    const nextStep = async () => {
        let fieldsToValidate: string[] = [];

        if (step === 1) {
            fieldsToValidate = ['productName', 'shortDescription', 'longDescription'];
        }

        if (step === 2) {
            fieldsToValidate = ['quantity', 'releaseYear', 'price'];
        }

        if (step === 3) {
            fieldsToValidate = ['company', 'os', 'brand', 'category'];
        }

        const valid = await trigger(fieldsToValidate as any);
        if (!valid) return;

        setStep((prev) => prev + 1);
    };

    const prevStep = () => setStep((prev) => prev - 1);

    const isImage1 = watch('image1');
    const isImage2 = watch('image2');
    const isImage3 = watch('image3');
    const isImage4 = watch('image4');

    const image1Length = isImage1?.length;
    const image2Length = isImage2?.length;
    const image3Length = isImage3?.length;
    const image4Length = isImage4?.length;

    const changeState = (newValue: File, image: string) => {
        switch (image) {
            case 'image1':
                setImage1(newValue);
                break;
            case 'image2':
                setImage2(newValue);
                break;
            case 'image3':
                setImage3(newValue);
                break;
            case 'image4':
                setImage4(newValue);
                break;
            default:
                break;
        }
    };

    const clearLocalImages = () => {
        setImage1(null);
        setImage2(null);
        setImage3(null);
        setImage4(null);
    };

    const buildFormData = (data: types.IBothFormValues) => {
        const formData = new FormData();

        if (data.productName) formData.append('productName', data.productName);
        if (data.shortDescription) formData.append('shortDescription', data.shortDescription);
        if (data.longDescription) formData.append('longDescription', data.longDescription);
        if (data.quantity !== undefined) formData.append('quantity', String(data.quantity));
        if (data.releaseYear !== undefined) formData.append('releaseYear', String(data.releaseYear));
        if (data.brand) formData.append('brand', data.brand);
        if (data.category) formData.append('category', data.category);
        if (data.company) formData.append('company', data.company);
        if (data.os) formData.append('os', data.os);
        if (data.price !== undefined) formData.append('price', String(data.price));

        [image1, image2, image3, image4].forEach((file) => {
            if (file) {
                formData.append('images', file);
            }
        });

        return formData;
    };

    const onSubmit = async (data: types.IBothFormValues) => {
        try {
            setSubmitting(true);
            setSubmitError('');

            const formData = buildFormData(data);

            if (isUpdate) {
                if (!data.productID) {
                    throw new Error('Please select a product to update');
                }

                await updateProductAPI(data.productID, formData);
            } else {
                await createProductAPI(formData);
            }

            setStep(5);
            reset();
            clearLocalImages();
        } catch (error: any) {
            const message =
                error?.response?.data?.message ||
                error?.message ||
                'Failed to save product';

            setSubmitError(message);
        } finally {
            setSubmitting(false);
        }
    };

    return {
        step,
        form,
        watch,
        errors,
        setStep,
        isValid,
        isDirty,
        isValidating,
        register,
        nextStep,
        prevStep,
        formState,
        onSubmit,
        changeState,
        handleSubmit,
        image1Length,
        image2Length,
        image3Length,
        image4Length,
        submitting,
        submitError,
        reset,
        setValue,
        clearLocalImages,
    };
};

export default useCreateUpdate;