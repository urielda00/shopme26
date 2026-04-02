import { Box, Skeleton, Stack } from '@mui/material';

const ProductListSkeleton = () => {
  return (
    <Stack spacing={2.2}>
      {Array.from({ length: 4 }).map((_, index) => (
        <Box
          key={index}
          sx={{
            borderRadius: 4,
            border: '1px solid rgba(255,255,255,0.12)',
            background:
              'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
            backdropFilter: 'blur(14px)',
            boxShadow:
              '0 12px 28px rgba(15,23,42,0.08), inset 0 1px 0 rgba(255,255,255,0.08)',
            p: 2,
          }}
        >
          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <Skeleton
              variant="rounded"
              width={190}
              height={160}
              sx={{ borderRadius: 3, flexShrink: 0 }}
            />
            <Box sx={{ flex: 1 }}>
              <Skeleton variant="text" height={42} width="52%" />
              <Skeleton variant="text" height={26} width="88%" />
              <Skeleton variant="text" height={26} width="72%" />
              <Skeleton variant="rounded" height={38} width="34%" sx={{ mt: 1.5 }} />
            </Box>
          </Stack>
        </Box>
      ))}
    </Stack>
  );
};

export default ProductListSkeleton;