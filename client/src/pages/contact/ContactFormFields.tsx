import { FC } from 'react';
import { Grid2 as Grid, TextField, Button } from '@mui/material';
import { IContactField } from '../../interfaces/contact.interface';

interface Props {
    fields: IContactField[];
}

const inputStyles = {
    '& .MuiOutlinedInput-root': {
        color: '#111827',
        background: 'rgba(255,255,255,0.62)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        borderRadius: '14px',
        '& fieldset': {
            borderColor: 'rgba(17,24,39,0.10)',
            borderRadius: '14px',
        },
        '&:hover': {
            background: 'rgba(255,255,255,0.78)',
        },
        '&:hover fieldset': {
            borderColor: 'rgba(17,24,39,0.18)',
        },
        '&.Mui-focused': {
            background: 'rgba(255,255,255,0.86)',
            boxShadow: '0 0 0 4px rgba(99,102,241,0.08)',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#6366f1',
        },
        '& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active, & textarea:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 1000px rgba(255,255,255,0.86) inset',
            WebkitTextFillColor: '#111827',
            transition: 'background-color 5000s ease-in-out 0s',
            borderRadius: '14px'
        }
    },
    '& .MuiInputLabel-root': {
        color: 'rgba(17,24,39,0.52)',
        '&.Mui-focused': {
            color: '#4f46e5',
        }
    }
};

const ContactFormFields: FC<Props> = ({ fields }) => {
    return (
        <Grid container spacing={2}>
            {fields.map((field) => (
                <Grid key={field.id} size={{ xs: 12, sm: field.id === 'moreInfo' ? 12 : 6 }}>
                    <TextField
                        required
                        fullWidth
                        id={field.id}
                        name={field.name}
                        label={field.label}
                        rows={field.rows || 1}
                        type={field.type || 'text'}
                        autoComplete={field.autoComplete}
                        multiline={field.multiline || false}
                        variant="outlined"
                        sx={inputStyles}
                    />
                </Grid>
            ))}

            <Grid size={12}>
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{
                        mt: 1.5,
                        height: '48px',
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        color: '#ffffff',
                        fontWeight: 600,
                        letterSpacing: '1.5px',
                        borderRadius: '14px',
                        textTransform: 'uppercase',
                        boxShadow: '0 12px 24px rgba(99,102,241,0.22)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            background: 'linear-gradient(135deg, #5b5ff0, #7c3aed)',
                            transform: 'translateY(-2px)',
                            boxShadow: '0 16px 30px rgba(99,102,241,0.28)'
                        }
                    }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default ContactFormFields;