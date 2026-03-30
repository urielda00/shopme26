/**
 * Interface for a single field in the contact form
 */
export interface IContactField {
    id: string;
    name: string;
    label: string;
    type?: string;
    rows?: number;
    multiline?: boolean;
    autoComplete?: string;
}

/**
 * Props for the Contact Form component
 */
export interface IContactFormProps {
    formData: IContactField[];
}