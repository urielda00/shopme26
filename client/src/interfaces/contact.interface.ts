export interface IContactField {
    id: string;
    name: string;
    label: string;
    type?: string;
    rows?: number;
    multiline?: boolean;
    autoComplete?: string;
}

export interface ContactFormProps {
    fields: IContactField[];
}