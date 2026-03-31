// src/hooks/useLogin.ts
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../app/hooks';
import { loginAPI } from '../services/authService';
import { logged, isAdmin, errorLogged } from '../features/userSlice';
import { setUserCart } from '../features/cartSlice';
import { IFormValues } from '../interfaces/auth.interface';
import { logError } from '../utils/logger';

type LoginValues = Pick<IFormValues, 'email' | 'password'>;

const useLogin = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleLoginSubmit = async (data: LoginValues) => {
        try {
            const response = await loginAPI(data);
            const { totalPrice, cart, admin, userName, user_id, totalQuantity } = response.data;

            // Session storage handling
            window.sessionStorage.setItem('isLogged', 'true');
            if (admin) window.sessionStorage.setItem('userName', userName);

            // Redux dispatching
            dispatch(admin ? isAdmin(user_id) : logged(user_id));
            dispatch(setUserCart({ cart, totalPrice, totalItemsInCart: totalQuantity }));

            navigate('/');
        } catch (error: any) {
            logError(error, 'useLogin - handleLoginSubmit');
            dispatch(errorLogged(error.message || 'Login failed'));
        }
    };

    return { handleLoginSubmit };
};

export default useLogin;