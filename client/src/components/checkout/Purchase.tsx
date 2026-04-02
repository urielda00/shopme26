import { FC, FocusEvent, useMemo, useState } from 'react';
import Grid from '@mui/material/Grid2';
import { Box, Stack, TextField, Typography } from '@mui/material';

type CardFocus = 'number' | 'name' | 'expiry' | 'cvc' | '';

interface PaymentState {
  cvc: string;
  name: string;
  expiry: string;
  number: string;
  focus: CardFocus;
}

const initialState: PaymentState = {
  cvc: '',
  name: '',
  expiry: '',
  number: '',
  focus: '',
};

const formatCardNumber = (value: string) =>
  value
    .replace(/\D/g, '')
    .slice(0, 16)
    .replace(/(\d{4})(?=\d)/g, '$1 ')
    .trim();

const formatExpiry = (value: string) => {
  const cleaned = value.replace(/\D/g, '').slice(0, 4);
  if (cleaned.length <= 2) return cleaned;
  return `${cleaned.slice(0, 2)}/${cleaned.slice(2)}`;
};

const maskCardNumber = (value: string) => {
  const digits = value.replace(/\D/g, '');
  if (!digits) return '•••• •••• •••• ••••';

  const padded = digits.padEnd(16, '•');
  return padded.replace(/(.{4})/g, '$1 ').trim();
};

const maskCvc = (value: string) => {
  if (!value) return '•••';
  return value.replace(/\D/g, '').slice(0, 4).padEnd(3, '•');
};

const Purchase: FC = () => {
  const [state, setState] = useState<PaymentState>(initialState);

  const cardNumber = useMemo(() => maskCardNumber(state.number), [state.number]);
  const cardName = useMemo(
    () => state.name.trim() || 'CARDHOLDER NAME',
    [state.name]
  );
  const cardExpiry = useMemo(
    () => state.expiry || 'MM/YY',
    [state.expiry]
  );
  const cardCvc = useMemo(() => maskCvc(state.cvc), [state.cvc]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setState((prev) => {
      switch (name) {
        case 'number':
          return { ...prev, number: formatCardNumber(value) };
        case 'expiry':
          return { ...prev, expiry: formatExpiry(value) };
        case 'cvc':
          return { ...prev, cvc: value.replace(/\D/g, '').slice(0, 4) };
        case 'name':
          return { ...prev, name: value.toUpperCase().slice(0, 26) };
        default:
          return prev;
      }
    });
  };

  const handleInputFocus = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const fieldName = e.target.name as CardFocus;
    setState((prev) => ({ ...prev, focus: fieldName }));
  };

  return (
    <Box>
      <Stack spacing={0.75} sx={{ mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 800 }}>
          Payment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This is a visual payment step only. Connect it to your payment provider later.
        </Typography>
      </Stack>

      <Box
        sx={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 4,
          p: 3,
          mb: 3,
          minHeight: 220,
          color: 'common.white',
          background:
            state.focus === 'cvc'
              ? 'linear-gradient(135deg, #23263a 0%, #131522 50%, #2b3152 100%)'
              : 'linear-gradient(135deg, #141726 0%, #1d2340 48%, #2f3963 100%)',
          border: '1px solid rgba(255,255,255,0.14)',
          boxShadow:
            '0 24px 60px rgba(8, 12, 32, 0.35), inset 0 1px 0 rgba(255,255,255,0.12)',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            inset: 'auto auto -40px -30px',
            width: 160,
            height: 160,
            borderRadius: '50%',
            background: 'rgba(146, 163, 255, 0.16)',
            filter: 'blur(20px)',
          }}
        />

        <Box
          sx={{
            position: 'absolute',
            inset: '-40px -30px auto auto',
            width: 180,
            height: 180,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
            filter: 'blur(20px)',
          }}
        />

        {state.focus === 'cvc' ? (
          <Stack justifyContent="space-between" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                mt: 2,
                height: 42,
                bgcolor: 'rgba(0,0,0,0.42)',
                mx: -3,
              }}
            />
            <Box sx={{ alignSelf: 'flex-end', width: { xs: '50%', sm: '35%' } }}>
              <Typography variant="caption" sx={{ opacity: 0.75, letterSpacing: 1.2 }}>
                SECURITY CODE
              </Typography>
              <Box
                sx={{
                  mt: 1,
                  px: 1.5,
                  py: 1,
                  borderRadius: 2,
                  textAlign: 'right',
                  bgcolor: 'rgba(255,255,255,0.12)',
                  border: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <Typography sx={{ fontWeight: 700, letterSpacing: 2 }}>
                  {cardCvc}
                </Typography>
              </Box>
            </Box>
          </Stack>
        ) : (
          <Stack justifyContent="space-between" sx={{ height: '100%', position: 'relative', zIndex: 1 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <Box
                sx={{
                  width: 46,
                  height: 34,
                  borderRadius: 1.5,
                  background:
                    'linear-gradient(135deg, rgba(255,215,140,0.85), rgba(255,255,255,0.45))',
                }}
              />
              <Typography sx={{ fontSize: 12, letterSpacing: 3, opacity: 0.75 }}>
                SHOPME
              </Typography>
            </Stack>

            <Typography
              sx={{
                fontSize: { xs: 22, sm: 28 },
                fontWeight: 800,
                letterSpacing: 2.8,
                lineHeight: 1.2,
              }}
            >
              {cardNumber}
            </Typography>

            <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.72, letterSpacing: 1.2 }}>
                  CARDHOLDER
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                  {cardName}
                </Typography>
              </Box>

              <Box sx={{ textAlign: 'right' }}>
                <Typography variant="caption" sx={{ opacity: 0.72, letterSpacing: 1.2 }}>
                  EXPIRES
                </Typography>
                <Typography sx={{ fontWeight: 700, mt: 0.5 }}>
                  {cardExpiry}
                </Typography>
              </Box>
            </Stack>
          </Stack>
        )}
      </Box>

      <Box component="form" noValidate>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Card number"
              name="number"
              value={state.number}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-number"
              placeholder="1234 5678 9012 3456"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 12 }}>
            <TextField
              fullWidth
              label="Cardholder name"
              name="name"
              value={state.name}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-name"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="Expiry date"
              name="expiry"
              value={state.expiry}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-exp"
              placeholder="MM/YY"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            />
          </Grid>

          <Grid size={{ xs: 6 }}>
            <TextField
              fullWidth
              label="CVC"
              name="cvc"
              value={state.cvc}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              autoComplete="cc-csc"
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  backgroundColor: 'rgba(255,255,255,0.05)',
                },
              }}
            />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Purchase;