import { FC } from 'react';
import { Grid2 as Grid, TextField, Button } from '@mui/material';
import { IContactField } from '../../interfaces/contact.interface';

interface Props {
    fields: IContactField[];
}

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
                    />
                </Grid>
            ))}
            <Grid size={12}>
                <Button 
                    type="submit" 
                    fullWidth 
                    variant="contained" 
                    sx={{ mt: 3, mb: 2, bgcolor: 'var(--cartBtnDarkGrey)', height: '50px' }}
                >
                    Submit
                </Button>
            </Grid>
        </Grid>
    );
};

export default ContactFormFields;