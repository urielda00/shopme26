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
  const formattedPrice = hasValidPrice ? `$${price.toFixed(2)}` : 'N/A';
  const totalItemPrice = hasValidPrice ? `$${(price * itemQuantity).toFixed(2)}` : 'N/A';

  return (
    <Box sx={cartItemSx}>
      <Box
        sx={{
          width: { xs: 70, sm: 100 },
          height: { xs: 70, sm: 100 },
          borderRadius: 2,
          bgcolor: 'rgba(255,255,255,0.6)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          overflow: 'hidden',
          border: '1px solid rgba(0,0,0,0.05)',
        }}
      >
        {!hideImage && imageUrl ? (
          <Box
            component="img"
            src={imageUrl}
            alt={item.productName || 'Product'}
            loading="lazy"
            onError={() => setHideImage(true)}
            sx={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
              p: 1,
            }}
          />
        ) : (
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            No image
          </Typography>
        )}
      </Box>

      <Box sx={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', gap: 0.5,ml:1 }}>
        <Typography
          variant="subtitle1"
          sx={{
            fontWeight: 600,
            color: '#1d1d1f',
            fontSize: { xs: '0.95rem', sm: '1.1rem' },
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.productName}
        </Typography>

        <Typography variant="body2" sx={{ color: '#86868b', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
          {formattedPrice}
        </Typography>

        
      </Box>

      <Box
  sx={{
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-end',
    mb: 0.5,
    ml: 'auto',
    mr: -2
  }}
>
        <Stack direction="row" alignItems="center" sx={quantityStackSx}>
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
          <CloseIcon sx={{ fontSize: { xs: '1.2rem', sm: '1.4rem' } }} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default CartItem;