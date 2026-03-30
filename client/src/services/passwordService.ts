import axiosInstance from '../utils/axiosInstance';

/**
 * Sends a password reset link to the user's email.
 */
export const forgotPasswordAPI = (email: string) => {
    return axiosInstance.post('/resetPass/', { email });
};

/**
 * Updates the password using the provided token and ID.
 * Expects an object with password and confirmPassword.
 */
export const resetPasswordAPI = (id: string, token: string, passwords: { password: string, confirmPassword: string }) => {
    const url = `/resetPass/reset/${id}/${token}`;
    return axiosInstance.post(url, passwords);
};