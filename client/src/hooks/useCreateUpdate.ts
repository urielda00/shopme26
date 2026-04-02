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

    const nextStep = () => setStep((prev) => prev + 1);
    const prevStep = () => setStep((prev) => prev - 1);

    // Changed mode to 'onBlur' to optimize async validation calls
    const form = useForm<types.IBothFormValues>({ mode: 'onBlur' });
    const { register, handleSubmit, formState, watch, reset } = form;
    
    // Added isValidating to the destructuring
    const { errors, isValid, isDirty, isValidating } = formState;

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

    const buildFormData = (data: types.IBothFormValues) => {
        const formData = new FormData();

        if (data.productName) formData.append('productName', data.productName);
        if (data.shortDescription) formData.append('shortDescription', data.shortDescription);
        if (data.longDescription) formData.append('longDescription', data.longDescription);
        if (data.quantity) formData.append('quantity', String(data.quantity));
        if (data.releaseYear) formData.append('releaseYear', String(data.releaseYear));
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
                    throw new Error('Product ID is required for update');
                }

                await updateProductAPI(data.productID, formData);
            } else {
                await createProductAPI(formData);
            }

            setStep(5);
            reset();
            setImage1(null);
            setImage2(null);
            setImage3(null);
            setImage4(null);
        } catch (error: any) {
            setSubmitError(error.message || 'Failed to save product');
        } finally {
            setSubmitting(false);
        }
    };

    return {
        step,
        form,
        watch,
        image1,
        image2,
        image3,
        image4,
        errors,
        setStep,
        isValid,
        isDirty,
        isValidating, // Now returned to the component
        isImage1,
        isImage2,
        isImage3,
        isImage4,
        register,
        nextStep,
        prevStep,
        setImage1,
        setImage2,
        setImage3,
        setImage4,
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
    };
};

export default useCreateUpdate;