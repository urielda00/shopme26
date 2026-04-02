import { Box, Button, Container, Stack, Typography } from '@mui/material';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import ArrowForwardRoundedIcon from '@mui/icons-material/ArrowForwardRounded';
import { Link as RouterLink } from 'react-router-dom';

const ThankYouPage = () => {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        pt: {
          xs: '92px',
          md: '108px',
        },
        pb: {
          xs: 4,
          md: 6,
        },
        px: 2,
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: `
          radial-gradient(circle at top left, rgba(124, 92, 255, 0.14), transparent 32%),
          radial-gradient(circle at top right, rgba(90, 169, 255, 0.14), transparent 30%),
          linear-gradient(180deg, #f8fafc 0%, #eef2f7 100%)
        `,
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '30px',
            px: {
              xs: 3,
              sm: 5,
            },
            py: {
              xs: 4.5,
              sm: 6,
            },
            textAlign: 'center',
            backdropFilter: 'blur(18px)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.84) 0%, rgba(255,255,255,0.72) 100%)',
            border: '1px solid rgba(255,255,255,0.75)',
            boxShadow:
              '0 24px 80px rgba(15, 23, 42, 0.10), 0 8px 24px rgba(124, 92, 255, 0.08)',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(135deg, rgba(255,255,255,0.35), rgba(255,255,255,0.02) 42%, transparent 70%)',
            }}
          />

          <Stack spacing={3} alignItems="center" sx={{ position: 'relative', zIndex: 1 }}>
            <Box
              sx={{
                width: {
                  xs: 78,
                  sm: 92,
                },
                height: {
                  xs: 78,
                  sm: 92,
                },
                borderRadius: '24px',
                display: 'grid',
                placeItems: 'center',
                background:
                  'linear-gradient(135deg, rgba(124, 92, 255, 0.14), rgba(90, 169, 255, 0.18))',
                border: '1px solid rgba(124, 92, 255, 0.16)',
                boxShadow: '0 12px 30px rgba(124, 92, 255, 0.14)',
              }}
            >
              <CheckCircleRoundedIcon
                sx={{
                  fontSize: {
                    xs: 42,
                    sm: 50,
                  },
                  color: '#6d5dfc',
                }}
              />
            </Box>

            <Stack spacing={1.25}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: {
                    xs: '2rem',
                    sm: '2.5rem',
                  },
                  fontWeight: 700,
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  color: '#111827',
                }}
              >
                Thank you
              </Typography>

              <Typography
                sx={{
                  maxWidth: 420,
                  mx: 'auto',
                  fontSize: {
                    xs: '0.98rem',
                    sm: '1.05rem',
                  },
                  lineHeight: 1.75,
                  color: 'rgba(17, 24, 39, 0.72)',
                }}
              >
                Your details were sent successfully. We received everything and will continue from
                here.
              </Typography>
            </Stack>

            <Button
              component={RouterLink}
              to="/"
              endIcon={<ArrowForwardRoundedIcon />}
              sx={{
                mt: 1,
                minWidth: {
                  xs: '100%',
                  sm: 220,
                },
                height: 52,
                borderRadius: '16px',
                textTransform: 'none',
                fontSize: '0.98rem',
                fontWeight: 600,
                color: '#ffffff',
                background: 'linear-gradient(135deg, #6d5dfc 0%, #4f8cff 100%)',
                boxShadow: '0 14px 30px rgba(79, 140, 255, 0.24)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, opacity 0.2s ease',
                '&:hover': {
                  background: 'linear-gradient(135deg, #5f50ee 0%, #4380f0 100%)',
                  boxShadow: '0 18px 34px rgba(79, 140, 255, 0.28)',
                  transform: 'translateY(-2px)',
                },
              }}
            >
              Back to home
            </Button>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default ThankYouPage;