import { Box, Skeleton, Stack } from '@mui/material';

const ProductListSkeleton = () => {
  return (
    <Stack spacing={2}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.12)',
            background: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(14px)',
            p: 2,
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Skeleton variant="rounded" width={220} height={180} />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={46} width="60%" />
              <Skeleton variant="text" height={28} width="90%" />
              <Skeleton variant="text" height={28} width="40%" />
              <Skeleton variant="text" height={36} width="22%" sx={{ mt: 2 }} />
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ProductListSkeleton;