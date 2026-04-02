import { FC, useMemo, useState } from 'react';
import { Box, Stack, Typography, Divider } from '@mui/material';
import { ICartItem } from '../../interfaces';
import { getImageUrl } from '../../utils/getImageUrl';

interface Props {
  cart: ICartItem[];
}

const formatPrice = (value: number) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);

const CartStep: FC<Props> = ({ cart }) => {
  const [hiddenImages, setHiddenImages] = useState<Record<string, boolean>>({});

  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.itemQuantity * item.price, 0),
    [cart]
  );

  if (!cart.length) {
    return (
      <Box
        sx={{
          minHeight: 280,
          display: 'grid',
          placeItems: 'center',
          textAlign: 'center',
          borderRadius: 4,
          border: '1px solid rgba(255,255,255,0.12)',
          background:
            'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.03))',
          backdropFilter: 'blur(14px)',
        }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
            Your cart is empty
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Add a few products and continue to checkout.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        maxHeight: 420,
        overflowY: 'auto',
        pr: 0.5,
        '&::-webkit-scrollbar': {
          width: 8,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(255,255,255,0.14)',
          borderRadius: 999,
        },
      }}
    >
      <Stack spacing={2}>
        {cart.map((item, index) => {
          const imageSrc = item.image ? getImageUrl(item.image) : '';
          const itemTotal = item.itemQuantity * item.price;

          return (
            <Box key={item._id}>
              <Stack
                direction="row"
                spacing={2}
                alignItems="center"
                sx={{
                  p: 1.5,
                  borderRadius: 3,
                  border: '1px solid rgba(255,255,255,0.08)',
                  background:
                    'linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.025))',
                  backdropFilter: 'blur(14px)',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    borderColor: 'rgba(255,255,255,0.16)',
                  },
                }}
              >
                {!hiddenImages[item._id] && imageSrc ? (
                  <Box
                    component="img"
                    src={imageSrc}
                    alt={item.productName}
                    onError={() =>
                      setHiddenImages((prev) => ({ ...prev, [item._id]: true }))
                    }
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 2.5,
                      objectFit: 'cover',
                      flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.08)',
                      backgroundColor: 'rgba(255,255,255,0.04)',
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      width: 72,
                      height: 72,
                      borderRadius: 2.5,
                      flexShrink: 0,
                      border: '1px solid rgba(255,255,255,0.08)',
                      background:
                        'linear-gradient(135deg, rgba(255,255,255,0.10), rgba(255,255,255,0.03))',
                      display: 'grid',
                      placeItems: 'center',
                    }}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      sx={{ letterSpacing: 1 }}
                    >
                      ITEM
                    </Typography>
                  </Box>
                )}

                <Box sx={{ minWidth: 0, flexGrow: 1 }}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontWeight: 700,
                      mb: 0.5,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {item.productName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    Qty {item.itemQuantity} x {formatPrice(item.price)}
                  </Typography>
                </Box>

                <Typography
                  variant="body1"
                  sx={{ fontWeight: 800, whiteSpace: 'nowrap' }}
                >
                  {formatPrice(itemTotal)}
                </Typography>
              </Stack>

              {index !== cart.length - 1 && (
                <Divider sx={{ borderColor: 'rgba(255,255,255,0.06)', my: 1 }} />
              )}
            </Box>
          );
        })}

        <Box
          sx={{
            mt: 1,
            p: 2,
            borderRadius: 3,
            border: '1px solid rgba(255,255,255,0.08)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.07), rgba(255,255,255,0.03))',
          }}
        >
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography variant="subtitle1" color="text.secondary">
              Cart total
            </Typography>
            <Typography variant="h6" sx={{ fontWeight: 800 }}>
              {formatPrice(total)}
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
};

export default CartStep;