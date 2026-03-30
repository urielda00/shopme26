import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { createOrderAPI } from '../services/orderService'; // Using our new service
import { deleteAllCart } from '../features/cartSlice';

const useCheckout = () => {
    const dispatch = useAppDispatch();
    const steps = ['Cart', 'Delivery', 'Payment'];
    const { cart, totalPrice } = useAppSelector((state) => state.cart);
    const { isAddress } = useAppSelector((state) => state.address);

    const [activeStep, setActiveStep] = useState(0);
    const [isOrderCompleted, setIsOrderCompleted] = useState(false);

    const handleNext = () => setActiveStep((prev) => prev + 1);
    const handleBack = () => setActiveStep((prev) => prev - 1);

    const handleFinalSubmit = async () => {
        try {
            // Server only needs address, it knows the user and cart from cookies
            await createOrderAPI(isAddress.AddressLine); 
            dispatch(deleteAllCart());
            setIsOrderCompleted(true);
        } catch (error) {
            console.error('Order failed', error);
        }
    };

    return {
        steps,
        activeStep,
        totalPrice,
        cart,
        isOrderCompleted,
        handleNext,
        handleBack,
        handleFinalSubmit
    };
};

export default useCheckout;