import { InputAdornment } from '@mui/material';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import axiosInstance from './utils/axiosInstance';
import { RegisterOptions, FieldValues } from 'react-hook-form';
const baseMaxMessage = 'Maximum length is';
const baseMinMessage = 'Minimum length is';

const min = {
    four: {
        value: 4,
        message: `${baseMinMessage} 4`,
    },
    two: {
        value: 2,
        message: `${baseMinMessage} 2`,
    },
};

export const validateShortObj = {
    minLength: min.four,
    maxLength: {
        value: 50,
        message: `${baseMaxMessage} 50`,
    },
};

export const validateProductNameObj = {
    minLength: min.two,
    maxLength: {
        value: 20,
        message: `${baseMaxMessage} 20`,
    },
};

export const validateLongObj = {
    minLength: min.four,
    maxLength: {
        value: 150,
        message: `${baseMaxMessage} 150`,
    },
};

export const companyObj = {
    minLength: min.two,
    maxLength: {
        value: 20,
        message: `${baseMaxMessage} 20`,
    },
};

export const brandObj = {
    minLength: min.two,
    maxLength: {
        value: 20,
        message: `${baseMaxMessage} 20`,
    },
};

export const osObj = {
    minLength: min.two,
    maxLength: {
        value: 20,
        message: `${baseMaxMessage} 20`,
    },
};

export const categoryObj = {
    minLength: min.two,
    maxLength: {
        value: 20,
        message: `${baseMaxMessage} 20`,
    },
};

export const required = {
    required: 'This field is required',
    valueAsNumber: true,
};

export const priceInputProps = {
    endAdornment: (
        <InputAdornment position='end'>
            <AttachMoneyIcon />
        </InputAdornment>
    ),
};

export const validateID: any = {
    required: 'Product ID is required',
    minLength: {
        value: 1,
        message: 'Product ID is too short',
    },
    validate: {
        productExists: async (fieldValue: any) => {
            try {
                const response = await axiosInstance.get(
                    `/product/check-exists/_id/${encodeURIComponent(fieldValue)}`
                );
                return response.data?.exists || 'Product does not exist';
            } catch (error) {
                return 'Unable to validate product ID';
            }
        },
    },
};