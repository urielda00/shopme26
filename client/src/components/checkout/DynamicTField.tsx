import { FC } from 'react';
import Grid from '@mui/material/Grid2';
import { TextField, FormControlLabel, Checkbox } from '@mui/material';
import { ICheckoutField } from '../../interfaces';

interface Props {
    formData: ICheckoutField[];
}

const DynamicTField: FC<Props> = ({ formData }) => {
    return (
        <Grid container spacing={3}>
            {formData.map((field) => (
                <Grid key={field.id} size={{ xs: 12, sm: 6 }}>
                    <TextField
                        fullWidth
                        id={field.id}
                        name={field.name}
                        variant="standard"
                        label={field.label}
                        autoComplete={field.autoComplete}
                        required={field.required || false}
                    />
                </Grid>
            ))}
            <Grid size={12}>
                <FormControlLabel 
                    control={<Checkbox color="secondary" name="saveAddress" value="yes" />} 
                    label="Confirm the address details" 
                />
            </Grid>
        </Grid>
    );
};

export default DynamicTField;