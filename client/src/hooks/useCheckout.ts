import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createOrderAPI } from '../services/orderService';
import { clearCart } from '../features/cartSlice';

const useCheckout = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { items, totalPrice } = useAppSelector((state) => state.cart);
    const { isAddress } = useAppSelector((state) => state.address);

    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const steps = ['Cart', 'Delivery', 'Payment'];

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleFinalSubmit = async () => {
        setIsLoading(true);
        setError(null);

        try {
            const addressToSend = isAddress?.AddressLine || '123 Test Street, City';

            const data = await createOrderAPI(addressToSend);

            if (!data?.success) {
                throw new Error('Order process failed');
            }

            dispatch(clearCart());

            navigate('/thankYou', {
                state: {
                    order: data.order,
                    invoice: data.invoice,
                },
            });
        } catch (err: any) {
            setError(
                err?.response?.data?.message ||
                err?.message ||
                'Order process failed. Please try again.'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return {
        steps,
        activeStep,
        totalPrice,
        items,
        isLoading,
        error,
        handleNext,
        handleBack,
        handleFinalSubmit
    };
};

export default useCheckout;