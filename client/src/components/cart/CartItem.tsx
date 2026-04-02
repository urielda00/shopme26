import { FC, useEffect, useMemo, useState } from 'react';
import { Stack, Box, Typography, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { ICartItem } from '../../interfaces/cart.interface';
import { cartItemSx, quantityStackSx, quantityBtnSx } from '../../pages/cart/Cart.styles';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  item: ICartItem;
  onIncrement: () => void;
  onDecrement: () => void;
  onRemove: () => void;
}

const CartItem: FC<Props> = ({ item, onIncrement, onDecrement, onRemove }) => {
  const normalizedImage = Array.isArray(item.image) ? item.image[0] : item.image;
  const imageUrl = useMemo(
    () => (normalizedImage ? getImageUrl(normalizedImage) : ''),
    [normalizedImage]
  );

  const [hideImage, setHideImage] = useState(false);

  useEffect(() => {
    setHideImage(false);
  }, [imageUrl]);

  const price = typeof item.price === 'number' ? item.price : NaN;
  const itemQuantity = typeof item.itemQuantity === 'number' ? item.itemQuantity : 1;

  const hasValidPrice = !Number.isNaN(price);
  const lineTotal = hasValidPrice ? price * itemQuantity : NaN;

  console.log('CartItem image debug', {
    productName: item.productName,
    rawImage: item.image,
    normalizedImage,
    imageUrl,
    hideImage,
  });

  return (
    <Box sx={cartItemSx}>
      {!hideImage && imageUrl ? (
        <Box
          component="img"
          src={imageUrl}
          alt={item.productName}
          onError={() => {
            console.log('CartItem image failed', {
              productName: item.productName,
              rawImage: item.image,
              imageUrl,
            });
            setHideImage(true);
          }}
          sx={{
            width: { xs: 70, sm: 100 },
            height: { xs: 70, sm: 100 },
            borderRadius: { xs: 2, sm: 3 },
            objectFit: 'cover',
            bgcolor: '#f5f5f7',
            mr: { xs: 1.5, sm: 3 },
            flexShrink: 0,
            border: '1px solid rgba(0,0,0,0.06)',
          }}
        />
      ) : (
        <Box
          sx={{
            width: { xs: 70, sm: 100 },
            height: { xs: 70, sm: 100 },
            borderRadius: { xs: 2, sm: 3 },
            bgcolor: 'rgba(255,255,255,0.7)',
            mr: { xs: 1.5, sm: 3 },
            flexShrink: 0,
            border: '1px solid rgba(0,0,0,0.06)',
            display: 'grid',
            placeItems: 'center',
          }}
        >
          <Typography variant="caption" color="text.secondary">
            ITEM
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          minWidth: 0,
          pr: 1,
        }}
      >
        <Typography
          variant="subtitle1"
          fontWeight={600}
          color="#1d1d1f"
          sx={{
            fontSize: { xs: '0.9rem', sm: '1.1rem' },
            lineHeight: 1.2,
            mb: 0.5,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.productName || 'Unnamed product'}
        </Typography>

        <Typography
          variant="body2"
          color="#86868b"
          fontWeight={500}
          sx={{ mb: 1.5, fontSize: { xs: '0.8rem', sm: '0.875rem' } }}
        >
          {hasValidPrice ? `$${price.toFixed(2)}` : 'Price unavailable'}
        </Typography>

        <Stack direction="row" alignItems="center" spacing={0.5} sx={quantityStackSx}>
          <IconButton
            size="small"
            onClick={onDecrement}
            disabled={itemQuantity <= 1}
            sx={{ ...quantityBtnSx, p: { xs: 0.3, sm: 0.8 } }}
          >
            <RemoveIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }} />
          </IconButton>

          <Typography
            fontWeight={500}
            sx={{
              minWidth: { xs: 18, sm: 30 },
              textAlign: 'center',
              color: '#1d1d1f',
              fontSize: { xs: '0.8rem', sm: '1rem' },
            }}
          >
            {itemQuantity}
          </Typography>

          <IconButton
            size="small"
            onClick={onIncrement}
            disabled={itemQuantity >= (item.quantity || 1)}
            sx={{ ...quantityBtnSx, p: { xs: 0.3, sm: 0.8 } }}
          >
            <AddIcon sx={{ fontSize: { xs: '0.9rem', sm: '1.25rem' } }} />
          </IconButton>
        </Stack>
      </Box>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          height: { xs: '70px', sm: '100px' },
          flexShrink: 0,
        }}
      >
        <IconButton
          onClick={onRemove}
          size="small"
          sx={{ color: 'rgba(0,0,0,0.3)', p: 0, '&:hover': { color: '#d32f2f' } }}
        >
          <CloseIcon sx={{ fontSize: { xs: '1.1rem', sm: '1.5rem' } }} />
        </IconButton>

        <Typography
          fontWeight={700}
          sx={{ color: '#1d1d1f', fontSize: { xs: '0.95rem', sm: '1.2rem' }, mt: 'auto' }}
        >
          {hasValidPrice ? `$${lineTotal.toFixed(2)}` : '--'}
        </Typography>
      </Box>
    </Box>
  );
};

export default CartItem;