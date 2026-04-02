import { FC } from 'react';
import { Typography, Box, Stack } from '@mui/material';
import DynamicTField from './DynamicTField';
import { ICheckoutField } from '../../interfaces';

const deliveryFields: ICheckoutField[] = [
  {
    id: 'firstName',
    name: 'firstName',
    label: 'First name',
    required: true,
    autoComplete: 'given-name',
  },
  {
    id: 'lastName',
    name: 'lastName',
    label: 'Last name',
    required: true,
    autoComplete: 'family-name',
  },
  {
    id: 'address1',
    name: 'address1',
    label: 'Address line 1',
    required: true,
    autoComplete: 'shipping address-line1',
  },
  {
    id: 'city',
    name: 'city',
    label: 'City',
    required: true,
    autoComplete: 'shipping address-level2',
  },
  {
    id: 'zip',
    name: 'zip',
    label: 'Zip / Postal code',
    required: true,
    autoComplete: 'shipping postal-code',
  },
  {
    id: 'country',
    name: 'country',
    label: 'Country',
    required: true,
    autoComplete: 'shipping country',
  },
];

const Delivery: FC = () => {
  return (
    <Box>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Delivery details
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Enter the address for secure shipping and fast order processing.
        </Typography>
      </Stack>

      <DynamicTField formData={deliveryFields} />
    </Box>
  );
};

export default Delivery;