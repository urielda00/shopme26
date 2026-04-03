import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginAPI } from "../services/authService";
import { setAuthUser, setLoginError } from "../features/userSlice";
import { setUserCart, resetOnLogOut, clearCart } from "../features/cartSlice";
import { syncCartAPI } from "../services/cartService";
import { IFormValues } from "../interfaces/auth.interface";
import { logError } from "../utils/logger";

type LoginValues = Pick<IFormValues, "userName" | "password">;

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localCartItems = useAppSelector((state) => state.cart.items);

  const handleLoginSubmit = async (data: LoginValues) => {
    try {
      const guestCartSnapshot = [...localCartItems];

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

      if (guestCartSnapshot.length > 0) {
        console.log("syncing guest cart into user cart", guestCartSnapshot);

        const syncResponse = await syncCartAPI(guestCartSnapshot);

        console.log("sync response", syncResponse.data);

        dispatch(
          setUserCart({
            cart: syncResponse.data.cart || [],
            totalPrice: syncResponse.data.totalPrice || 0,
            totalItemsInCart: syncResponse.data.totalItemsInCart || 0,
          }),
        );
      } else {
        dispatch(
          setUserCart({
            cart,
            totalPrice,
            totalItemsInCart,
          }),
        );
      }

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