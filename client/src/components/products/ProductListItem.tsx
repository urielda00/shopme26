import { Box, Button, Rating, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks';
import { addToCartThunk } from '../../features/cartSlice';
import { IProduct } from '../../interfaces/product.interface';
import { ICartItem } from '../../interfaces/cart.interface';

interface ProductListItemProps {
  product: IProduct;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
  const dispatch = useAppDispatch();

  const imageSrc = product.images?.[0]
    ? `${import.meta.env.VITE_BASE_BACK_URL}/product/readProducts/${product.images[0]}`
    : '';

  const cartItem: ICartItem = {
    _id: product._id,
    productName: product.productName,
    price: product.price,
    quantity: product.quantity,
    itemQuantity: 1,
    image: product.images?.[0],
    category: product.category,
  };

  const handleAddToCart = () => {
    void dispatch(addToCartThunk(cartItem));
  };

  return (
    <Box
      sx={{
        p: 2.5,
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.12)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.03))',
        backdropFilter: 'blur(16px)',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        spacing={3}
        alignItems={{ xs: 'stretch', md: 'center' }}
      >
        <Box
          component={Link}
          to={`/product/${product._id}?category=${product.category}`}
          sx={{
            width: { xs: '100%', md: 240 },
            minWidth: { md: 240 },
            height: 190,
            borderRadius: 3,
            overflow: 'hidden',
            display: 'block',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          {imageSrc ? (
            <Box
              component="img"
              src={imageSrc}
              alt={product.productName}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          ) : null}
        </Box>

        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 1 }}>
            {product.productName}
          </Typography>

          {product.shortDescription ? (
            <Typography variant="body1" sx={{ opacity: 0.8, mb: 1.5 }}>
              {product.shortDescription}
            </Typography>
          ) : null}

          <Stack
            direction="row"
            spacing={1.5}
            useFlexGap
            flexWrap="wrap"
            sx={{ mb: 1.5, opacity: 0.72 }}
          >
            <Typography variant="body2">Category: {product.category}</Typography>
            <Typography variant="body2">Brand: {product.brand}</Typography>
            <Typography variant="body2">OS: {product.os}</Typography>
            <Typography variant="body2">Year: {product.releaseYear}</Typography>
          </Stack>

          <Rating value={4.5} precision={0.5} readOnly />
        </Box>

        <Stack
          spacing={1.5}
          alignItems={{ xs: 'stretch', md: 'flex-end' }}
          sx={{ minWidth: { md: 180 } }}
        >
          <Typography variant="h5" sx={{ fontWeight: 800 }}>
            ${product.price}
          </Typography>

          <Button variant="contained" onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Button
            component={Link}
            to={`/product/${product._id}?category=${product.category}`}
            variant="outlined"
          >
            More Info
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
};

export default ProductListItem;