export interface IAddress {
    Zip: string;
    City: string;
    Region: string;
    Country: string;
    LastName: string;
    FirstName: string;
    AddressLine: string;
}

// For Checkout dynamic forms
export interface ICheckoutField {
    id: string;
    name: string;
    label: string;
    required?: boolean;
    autoComplete?: string;
}