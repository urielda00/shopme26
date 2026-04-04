import { useEffect } from "react";
import { useAppDispatch } from "../app/hooks";
import { setAuthInitialized, setAuthUser, clearAuthUser } from "../features/userSlice";
import { setUserCart } from "../features/cartSlice";
import { getMeAPI } from "../services/authService";

const AuthBootstrap = () => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		const bootstrap = async () => {
			try {
				const { data } = await getMeAPI();

				dispatch(
					setAuthUser({
						userId: data.userId,
						userName: data.userName,
						isAdmin: data.isAdmin,
					}),
				);

				dispatch(
					setUserCart({
						cart: data.cart || [],
						totalItemsInCart: data.totalQuantity || 0,
						totalPrice: data.totalPrice || 0,
					}),
				);
			} catch (error) {
				dispatch(clearAuthUser());
				dispatch(
					setUserCart({
						cart: [],
						totalItemsInCart: 0,
						totalPrice: 0,
					}),
				);
			} finally {
				dispatch(setAuthInitialized(true));
			}
		};

		bootstrap();
	}, [dispatch]);

	return null;
};

export default AuthBootstrap;
