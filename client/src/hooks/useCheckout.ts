import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createOrderAPI } from '../services/orderService'; 
import { resetCartThunk } from '../features/cartSlice';

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
            // Fallback address for testing since Delivery form is not connected to Redux yet
            const addressToSend = isAddress?.AddressLine || "123 Test Street, City";

            await createOrderAPI(addressToSend); 
            
            await dispatch(resetCartThunk()).unwrap();
            
            navigate('/thankYou');
        } catch (err: any) {
            setError(err.message || 'Order process failed. Please try again.');
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