import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Chip,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded';
import CategoryRoundedIcon from '@mui/icons-material/CategoryRounded';
import BrandingWatermarkRoundedIcon from '@mui/icons-material/BrandingWatermarkRounded';
import MemoryRoundedIcon from '@mui/icons-material/MemoryRounded';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import { categoryList, brandsList, osCaseList, yearsList } from '../../utils/data/productsData';
import { useProductFilters } from '../../hooks/useProductFilters';

const chipSx = (selected: boolean) => ({
  borderRadius: 999,
  fontWeight: 600,
  border: selected
    ? '1px solid rgba(255,255,255,0.24)'
    : '1px solid rgba(255,255,255,0.12)',
  background: selected
    ? 'linear-gradient(180deg, rgba(255,255,255,0.16), rgba(255,255,255,0.08))'
    : 'rgba(255,255,255,0.04)',
  boxShadow: selected ? '0 8px 18px rgba(15,23,42,0.10)' : 'none',
  '&:hover': {
    background: selected
      ? 'linear-gradient(180deg, rgba(255,255,255,0.18), rgba(255,255,255,0.10))'
      : 'rgba(255,255,255,0.08)',
  },
});

const ProductFiltersSidebar = () => {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useProductFilters();

  const availableBrands = filters.category ? brandsList[filters.category] ?? [] : [];
  const availableOs = filters.category ? osCaseList[filters.category] ?? [] : [];

  const activeCount = [filters.category, filters.brand, filters.os, filters.year].filter(Boolean)
    .length;

  return (
    <Box
      sx={{
        p: 2.2,
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.14)',
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        backdropFilter: 'blur(18px)',
        boxShadow:
          '0 16px 34px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.08)',
        position: { lg: 'sticky' },
        top: { lg: 110 },
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ mb: 1.5 }}
      >
        <Box>
          <Typography variant="h6" sx={{ fontWeight: 800 }}>
            Filters
          </Typography>
          <Typography variant="body2" sx={{ opacity: 0.66 }}>
            {activeCount > 0 ? `${activeCount} active` : 'Refine your product list'}
          </Typography>
        </Box>

        <Button
          size="small"
          variant="outlined"
          disabled={!hasActiveFilters}
          onClick={clearFilters}
          startIcon={<RestartAltRoundedIcon />}
          sx={{
            borderRadius: 999,
            textTransform: 'none',
            borderColor: 'rgba(255,255,255,0.16)',
          }}
        >
          Clear
        </Button>
      </Stack>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)', mb: 1.5 }} />

      <Accordion disableGutters elevation={0} defaultExpanded sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <CategoryRoundedIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography fontWeight={700}>Category</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            <Chip
              label="All"
              clickable
              onClick={() =>
                updateFilters({ category: '', brand: '', os: '', year: filters.year })
              }
              sx={chipSx(!filters.category)}
            />

            {categoryList
              .filter((item) => item.category)
              .map((item) => {
                const value = String(item.category);
                const selected = filters.category === value;

                return (
                  <Chip
                    key={value}
                    clickable
                    label={item.name}
                    onClick={() =>
                      updateFilters({
                        category: selected ? '' : value,
                        brand: '',
                        os: '',
                        year: filters.year,
                      })
                    }
                    sx={chipSx(selected)}
                  />
                );
              })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} defaultExpanded sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <BrandingWatermarkRoundedIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography fontWeight={700}>Brand</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {!filters.category ? (
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Choose a category first to unlock matching brands
            </Typography>
          ) : (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {availableBrands.map((brand) => (
                <Chip
                  key={brand}
                  clickable
                  label={brand}
                  onClick={() =>
                    updateFilters({
                      brand: filters.brand === brand ? '' : brand,
                    })
                  }
                  sx={chipSx(filters.brand === brand)}
                />
              ))}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} defaultExpanded sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <MemoryRoundedIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography fontWeight={700}>OS</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          {!filters.category ? (
            <Typography variant="body2" sx={{ opacity: 0.6 }}>
              Choose a category first to unlock compatible OS options
            </Typography>
          ) : (
            <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
              {availableOs.map((os) => (
                <Chip
                  key={os}
                  clickable
                  label={os}
                  onClick={() =>
                    updateFilters({
                      os: filters.os === os ? '' : os,
                    })
                  }
                  sx={chipSx(filters.os === os)}
                />
              ))}
            </Stack>
          )}
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} defaultExpanded sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Stack direction="row" spacing={1} alignItems="center">
            <EventRoundedIcon sx={{ fontSize: 18, opacity: 0.8 }} />
            <Typography fontWeight={700}>Year</Typography>
          </Stack>
        </AccordionSummary>
        <AccordionDetails>
          <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
            {yearsList.map((year) => {
              const yearValue = String(year);

              return (
                <Chip
                  key={yearValue}
                  clickable
                  label={yearValue}
                  onClick={() =>
                    updateFilters({
                      year: filters.year === yearValue ? '' : yearValue,
                    })
                  }
                  sx={chipSx(filters.year === yearValue)}
                />
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default ProductFiltersSidebar;