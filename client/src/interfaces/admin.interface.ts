/**
 * Shared fields for all product forms
 */
interface IBaseFormValues {
    os: string;
    brand: string;
    price: number;
    company: string;
    quantity: string;
    category: string;
    productName: string;
    releaseYear: number;
    longDescription: string;
    shortDescription: string;
}

/**
 * Image structure as handled by the frontend before upload
 */
type StringImg = [string];

/**
 * Interface for creating a new product
 */
export interface ICreateFormValues extends IBaseFormValues {
    image1: StringImg;
    image2: StringImg;
    image3: StringImg;
    image4: StringImg;
    productID?: string;
}

/**
 * Interface for updating an existing product
 */
export interface IUpdateFormValues extends IBaseFormValues {
    image1: StringImg | undefined;
    image2: StringImg | undefined;
    image3: StringImg | undefined;
    image4: StringImg | undefined;
    productID: string;
}

/**
 * Unified type for forms that can handle both create and update
 */
export interface IBothFormValues extends IBaseFormValues {
    image1: StringImg | undefined;
    image2: StringImg | undefined;
    image3: StringImg | undefined;
    image4: StringImg | undefined;
    productID?: string;
}

/**
 * Props for the Product Form component
 */
export interface IAdminFormProps {
    isUpdate: boolean;
    isCreate: boolean;
}

/**
 * Function type for product submission handlers
 */
export type ISubmitHandler = (
    image1: string, 
    image2: string, 
    image3: string, 
    image4: string, 
    data: ICreateFormValues
) => void;