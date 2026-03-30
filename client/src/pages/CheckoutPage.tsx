import { FC } from 'react';
import { Container, Paper, Stepper, Step, StepLabel, Button, Box, Typography } from '@mui/material';
import useCheckout from '../hooks/useCheckout';
import CartStep from '../components/checkout/CartStep';
import Delivery from '../components/checkout/Delivery';
import Purchase from '../components/checkout/Purchase';
import OrderCompleted from '../components/checkout/OrderCompleted';

const CheckoutPage: FC = () => {
    const { steps, activeStep, cart, totalPrice, isOrderCompleted, handleNext, handleBack, handleFinalSubmit } = useCheckout();

    if (isOrderCompleted) return <OrderCompleted />;

    return (
        <Container maxWidth="sm" sx={{ py: 8 }}>
            <Paper sx={{ p: 4, borderRadius: 3, bgcolor: 'var(--white)' }}>
                <Typography variant="h4" align="center" sx={{ mb: 4, fontFamily: '"Tilt Prism", cursive' }}>
                    Checkout
                </Typography>

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label) => (
                        <Step key={label}><StepLabel>{label}</StepLabel></Step>
                    ))}
                </Stepper>

                <Box sx={{ minHeight: '300px', mb: 4 }}>
                    {activeStep === 0 && <CartStep cart={cart} />}
                    {activeStep === 1 && <Delivery />}
                    {activeStep === 2 && <Purchase />}
                </Box>

                {activeStep === 0 && (
                    <Typography variant="h6" sx={{ textAlign: 'right', mb: 2 }}>
                        Total: {totalPrice}$
                    </Typography>
                )}

                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Button disabled={activeStep === 0} onClick={handleBack}>Back</Button>
                    <Button 
                        variant="contained" 
                        onClick={activeStep === steps.length - 1 ? handleFinalSubmit : handleNext}
                    >
                        {activeStep === steps.length - 1 ? 'Place Order' : 'Next'}
                    </Button>
                </Box>
            </Paper>
        </Container>
    );
};

export default CheckoutPage;