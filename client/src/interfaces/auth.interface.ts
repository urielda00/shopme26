export interface IFormValues {
    email: string;
    lastName: string;
    userName: string;
    password: string;
    firstName: string;
    verifyPass: string;
    phoneNumber: number;
}

export interface IUser {
    userId: string | null | false;
    profile: string;
    user: boolean;
    isAdmin: boolean;
}