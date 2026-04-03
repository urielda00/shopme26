import { FC } from "react";
import { Container, Typography, Box, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { updateQuantityThunk, removeItemThunk } from "../../features/cartSlice";
import CartItem from "../../components/cart/CartItem";
import CartSummary from "../../components/cart/CartSummary";
import { ICartItem } from "../../interfaces";
import { pageContainerSx, cartContentWrapperSx, checkoutBtnSx } from "./Cart.styles";
import { useTitle } from "../../hooks/useTitle";

const MotionBox = motion.create(Box);

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, duration: 0.5 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

const CartPage: FC = () => {
  const cartState = useAppSelector((state) => state.cart);
  const items = cartState?.items || [];
  const totalPrice = cartState?.totalPrice || 0;
  const totalQuantity = cartState?.totalQuantity || 0;

  const dispatch = useAppDispatch();

  useTitle("Cart");

  const renderCartWrapper = (children: React.ReactNode) => (
    <Box sx={pageContainerSx}>
      <Container maxWidth="lg">
        <MotionBox
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          sx={cartContentWrapperSx}
        >
          {children}
        </MotionBox>
      </Container>
    </Box>
  );

  if (items.length === 0) {
    return renderCartWrapper(
      <MotionBox
        variants={itemVariants}
        sx={{
          py: 12,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
        }}
      >
        <Typography variant="h5" color="#86868B" sx={{ fontWeight: 400 }}>
          Your cart is empty.
        </Typography>

        <Button component={Link} to="/productsList" sx={{ ...checkoutBtnSx, px: 6 }}>
          Discover Products
        </Button>
      </MotionBox>
    );
  }

  return renderCartWrapper(
    <Grid container spacing={5} alignItems="flex-start">
      <Grid
        size={{ xs: 12, md: 8 }}
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: 0,
        }}
      >
        <MotionBox variants={itemVariants}>
          <Typography
            sx={{
              fontWeight: 600,
              letterSpacing: "-0.5px",
              color: "#1d1d1f",
              fontSize: { xs: "1.75rem", md: "3rem" },
              textAlign: { xs: "center", md: "left" },
              mb: { xs: 3, md: 4 },
            }}
          >
            Your Cart
          </Typography>
        </MotionBox>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            minHeight: 0,
            maxHeight: { xs: "unset", lg: "calc(100vh - 260px)" },
            overflowY: { xs: "unset", lg: "auto" },
            pr: { xs: 0, lg: 2 },
            "&::-webkit-scrollbar": { width: "6px" },
            "&::-webkit-scrollbar-track": { background: "transparent" },
            "&::-webkit-scrollbar-thumb": {
              background: "rgba(255, 255, 255, 0.15)",
              borderRadius: "10px",
            },
            "&::-webkit-scrollbar-thumb:hover": {
              background: "rgba(255, 255, 255, 0.3)",
            },
          }}
        >
          {items.map((item: ICartItem) => (
            <MotionBox key={item._id} variants={itemVariants}>
              <CartItem
                item={item}
                onIncrement={() =>
                  dispatch(
                    updateQuantityThunk({
                      productId: item._id,
                      action: "inc",
                      price: item.price,
                    })
                  )
                }
                onDecrement={() =>
                  dispatch(
                    updateQuantityThunk({
                      productId: item._id,
                      action: "dec",
                      price: item.price,
                    })
                  )
                }
                onRemove={() => dispatch(removeItemThunk(item))}
              />
            </MotionBox>
          ))}
        </Box>
      </Grid>

      <Grid size={{ xs: 12, md: 4 }}>
        <MotionBox variants={itemVariants}>
          <CartSummary totalPrice={totalPrice} totalQuantity={totalQuantity} />
        </MotionBox>
      </Grid>
    </Grid>
  );
};

export default CartPage;