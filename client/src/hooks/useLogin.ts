import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { loginAPI, getMeAPI } from "../services/authService";
import { setAuthUser, setLoginError } from "../features/userSlice";
import { setUserCart, resetOnLogOut } from "../features/cartSlice";
import { syncCartAPI } from "../services/cartService";
import { IFormValues } from "../interfaces/auth.interface";

type LoginValues = Pick<IFormValues, "userName" | "password">;

const useLogin = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const localCartItems = useAppSelector((state) => state.cart.items);

  const handleLoginSubmit = async (data: LoginValues) => {
    try {
      const guestCartSnapshot = [...localCartItems];

      await loginAPI(data);

      const { data: me } = await getMeAPI();

      dispatch(
        setAuthUser({
          userId: me.userId,
          userName: me.userName,
          isAdmin: me.isAdmin,
        }),
      );

      if (guestCartSnapshot.length > 0) {
        const syncResponse = await syncCartAPI(guestCartSnapshot);

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
            cart: me.cart || [],
            totalPrice: me.totalPrice || 0,
            totalItemsInCart: me.totalItemsInCart || 0,
          }),
        );
      }

      window.sessionStorage.setItem("isLogged", "true");

      if (me.isAdmin) {
        window.sessionStorage.setItem("userName", me.userName);
      } else {
        window.sessionStorage.removeItem("userName");
      }

      navigate("/");
    } catch (error: any) {
      dispatch(resetOnLogOut());
      dispatch(setLoginError(error.message || "Login failed"));
    }
  };

  return { handleLoginSubmit };
};

export default useLogin;