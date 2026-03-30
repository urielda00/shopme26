import { FC } from 'react';
import { Container, Paper, Stepper, Step, StepLabel, Button, Box, Typography, CircularProgress, Alert } from '@mui/material';
import useCheckout from '../hooks/useCheckout';
import CartStep from '../components/checkout/CartStep';
import Delivery from '../components/checkout/Delivery';
import Purchase from '../components/checkout/Purchase';
import OrderCompleted from '../components/checkout/OrderCompleted';
import { commonContainerSx } from '../styles/common.styles';

// Move static styles outside the component
const wrapperSx = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    bgcolor: 'var(--containerPinkBackground)',
    minHeight: '90vh', // Using minHeight for better responsiveness
    py: { xs: 4, md: 0 }
};

const CheckoutPage: FC = () => {
    const { 
        steps, 
        activeStep, 
        items, 
        totalPrice, 
        isOrderCompleted, 
        isLoading, 
        error, 
        handleNext, 
        handleBack, 
        handleFinalSubmit 
    } = useCheckout();

    if (isOrderCompleted) return <OrderCompleted />;

    // Helper to render the current step content
    const renderStepContent = (step: number) => {
        switch (step) {
            case 0: return <CartStep cart={items} />;
            case 1: return <Delivery />;
            case 2: return <Purchase />;
            default: return <Typography>Unknown Step</Typography>;
        }
    };

    const isLastStep = activeStep === steps.length - 1;

    return (
        <Box sx={[commonContainerSx, { bgcolor: 'var(--containerPinkBackground)' }]}>
            <Container maxWidth="sm">
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, bgcolor: 'var(--white)' }}>
                    <Typography variant="h4" align="center" sx={{ mb: 4, fontFamily: '"Tilt Prism", cursive' }}>
                        Checkout
                    </Typography>

                    <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>

                    {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                    <Box sx={{ minHeight: '300px', mb: 4 }}>
                        {renderStepContent(activeStep)}
                    </Box>

                    {activeStep === 0 && (
                        <Typography variant="h6" sx={{ textAlign: 'right', mb: 2, fontWeight: 'bold' }}>
                            Total: {totalPrice.toFixed(2)}$
                        </Typography>
                    )}

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', pt: 2 }}>
                        <Button 
                            disabled={activeStep === 0 || isLoading} 
                            onClick={handleBack}
                            sx={{ color: 'text.secondary' }}
                        >
                            Back
                        </Button>
                        
                        <Button 
                            variant="contained" 
                            disabled={isLoading}
                            onClick={isLastStep ? handleFinalSubmit : handleNext}
                            sx={{ 
                                bgcolor: 'var(--cartBtnDarkGrey)', 
                                minWidth: '120px',
                                '&:hover': { bgcolor: 'var(--black)' } 
                            }}
                        >
                            {isLoading ? <CircularProgress size={24} color="inherit" /> : (isLastStep ? 'Place Order' : 'Next')}
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

export default CheckoutPage;