import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../app/hooks";
import { loginAPI } from "../services/authService";
import { setAuthUser, setLoginError } from "../features/userSlice";
import { setUserCart, resetOnLogOut } from "../features/cartSlice";
import { getCartAPI } from "../services/cartService";
import { IFormValues } from "../interfaces/auth.interface";
import { logError } from "../utils/logger";

type LoginValues = Pick<IFormValues, "userName" | "password">;

const useLogin = () => {
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	const handleLoginSubmit = async (data: LoginValues) => {
		try {
			const response = await loginAPI(data);
			console.log("login response", response.data);
			const {
				isAdmin,
				userName,
				userId,
				cart = [],
				totalPrice = 0,
				totalItemsInCart = 0,
			} = response.data;

			window.sessionStorage.setItem("isLogged", "true");

			if (isAdmin) {
				window.sessionStorage.setItem("userName", userName);
			} else {
				window.sessionStorage.removeItem("userName");
			}

			dispatch(
				setAuthUser({
					userId,
					userName,
					isAdmin,
				}),
			);
			console.log("dispatching immediate cart from login", {
				cart,
				totalPrice,
				totalItemsInCart,
			});
			console.log("login cart first item full shape", cart?.[0]);
			console.log(
				"login cart image fields",
				cart?.map((item: any) => ({
					productName: item.productName,
					image: item.image,
					imageUrl: item.imageUrl,
					images: item.images,
					productImage: item.product?.image,
					productImages: item.product?.images,
				})),
			);
			// Immediate UI hydration from login response
			dispatch(
				setUserCart({
					cart,
					totalPrice,
					totalItemsInCart,
				}),
			);

			navigate("/");
		} catch (error: any) {
			logError(error, "useLogin - handleLoginSubmit");
			dispatch(resetOnLogOut());
			dispatch(setLoginError(error.message || "Login failed"));
		}
	};

	return { handleLoginSubmit };
};

export default useLogin;
