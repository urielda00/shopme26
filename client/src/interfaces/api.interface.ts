export interface IApiResponse<T = any> {
    success: boolean;
    message: string;
    data?: T;
    errors?: string[]; // Array for validation errors
}

export interface IServerError {
    success: boolean;
    message: string;
    errors: any[];
}