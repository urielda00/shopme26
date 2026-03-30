import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createOrderAPI } from '../services/orderService'; 
import { resetCartThunk } from '../features/cartSlice'; // Use the professional Thunk

const useCheckout = () => {
    const dispatch = useAppDispatch();
    const { items, totalPrice } = useAppSelector((state) => state.cart);
    const { isAddress } = useAppSelector((state) => state.address);

    const [activeStep, setActiveStep] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);

    const steps = ['Cart', 'Delivery', 'Payment'];

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    /**
     * Finalizes the order and clears the cart on success.
     */
    const handleFinalSubmit = async () => {
        setIsLoading(true);
        setError(null);
        try {
            // Validation: Ensure address exists before API call
            if (!isAddress?.AddressLine) {
                throw new Error("Delivery address is missing.");
            }

            await createOrderAPI(isAddress.AddressLine); 
            
            // Clear cart globally (server + local)
            await dispatch(resetCartThunk()).unwrap();
            
            setIsOrderCompleted(true);
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
        isOrderCompleted,
        handleNext,
        handleBack,
        handleFinalSubmit
    };
};

export default useCheckout;