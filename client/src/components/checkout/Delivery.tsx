import { FC } from 'react';
import { Typography, Box } from '@mui/material';
import DynamicTField from './DynamicTField';
import { ICheckoutField } from '../../interfaces'; // Using our new interface

const deliveryFields: ICheckoutField[] = [
    { id: 'firstName', name: 'firstName', label: 'First name', required: true, autoComplete: 'given-name' },
    { id: 'lastName', name: 'lastName', label: 'Last name', required: true, autoComplete: 'family-name' },
    { id: 'address1', name: 'address1', label: 'Address line 1', required: true, autoComplete: 'shipping address-line1' },
    { id: 'city', name: 'city', label: 'City', required: true, autoComplete: 'shipping address-level2' },
    { id: 'zip', name: 'zip', label: 'Zip / Postal code', required: true, autoComplete: 'shipping postal-code' },
    { id: 'country', name: 'country', label: 'Country', required: true, autoComplete: 'shipping country' },
];

const Delivery: FC = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 3 }}>
                Shipping Address
            </Typography>
            <DynamicTField formData={deliveryFields} />
        </Box>
    );
};

export default Delivery;