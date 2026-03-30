import { FC, useState, ChangeEvent, FocusEvent } from 'react';
import Grid from '@mui/material/Grid2'; // Using modern Grid2
import { Box, TextField } from '@mui/material';
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';

// Fix for TS2786: Explicitly cast the third-party component to 'any' to bypass JSX type mismatch
const CreditCard = Cards as any;

const Purchase: FC = () => {
    const [state, setState] = useState({
        cvc: '',
        name: '',
        expiry: '',
        number: '',
        focus: ''
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState((prev) => ({ ...prev, [name]: value }));
    };

    const handleInputFocus = (e: FocusEvent<HTMLInputElement>) => {
        // Safe casting to string for the focused property
        setState((prev) => ({ ...prev, focus: e.target.name }));
    };

    return (
        <Box>
            {/* Using the casted component to solve the TypeScript error */}
            <CreditCard 
                number={state.number} 
                name={state.name} 
                expiry={state.expiry} 
                cvc={state.cvc} 
                focused={state.focus} 
            />
            
            <Box component="form" sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Card Number"
                            name="number"
                            value={state.number}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            // Using slotProps for modern MUI text field
                            slotProps={{ htmlInput: { maxLength: 16 } }}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <TextField
                            fullWidth
                            label="Full Name"
                            name="name"
                            value={state.name}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="Expiry Date"
                            name="expiry"
                            value={state.expiry}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                            placeholder="MM/YY"
                        />
                    </Grid>
                    <Grid size={{ xs: 6 }}>
                        <TextField
                            fullWidth
                            label="CVC"
                            name="cvc"
                            value={state.cvc}
                            onChange={handleInputChange}
                            onFocus={handleInputFocus}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );
};

export default Purchase;