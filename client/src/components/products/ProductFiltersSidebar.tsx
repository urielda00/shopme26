import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  Typography,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { brandsList, osCaseList, yearsList } from '../../utils/data/productsData';
import { useProductFilters } from '../../hooks/useProductFilters';

const ProductFiltersSidebar = () => {
  const { filters, updateFilters, clearFilters, hasActiveFilters } = useProductFilters();

  const availableBrands = filters.category ? brandsList[filters.category] ?? [] : [];
  const availableOs = filters.category ? osCaseList[filters.category] ?? [] : [];

  return (
    <Box
      sx={{
        p: 2,
        borderRadius: 4,
        border: '1px solid rgba(255,255,255,0.12)',
        background: 'rgba(255,255,255,0.05)',
        backdropFilter: 'blur(16px)',
        position: { lg: 'sticky' },
        top: { lg: 110 },
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
        Filters
      </Typography>

      <Accordion disableGutters elevation={0} sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Brands</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {availableBrands.length === 0 ? (
              <Typography variant="body2" sx={{ opacity: 0.65 }}>
                Select a category first
              </Typography>
            ) : (
              availableBrands.map((brand) => (
                <FormControlLabel
                  key={brand}
                  control={<Checkbox checked={filters.brand === brand} />}
                  label={brand}
                  onChange={() =>
                    updateFilters({
                      brand: filters.brand === brand ? '' : brand,
                    })
                  }
                />
              ))
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>OS</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {availableOs.length === 0 ? (
              <Typography variant="body2" sx={{ opacity: 0.65 }}>
                Select a compatible category first
              </Typography>
            ) : (
              availableOs.map((os) => (
                <FormControlLabel
                  key={os}
                  control={<Checkbox checked={filters.os === os} />}
                  label={os}
                  onChange={() =>
                    updateFilters({
                      os: filters.os === os ? '' : os,
                    })
                  }
                />
              ))
            )}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters elevation={0} sx={{ background: 'transparent' }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight={600}>Year</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Stack>
            {yearsList.map((year) => {
              const yearValue = String(year);

              return (
                <FormControlLabel
                  key={year}
                  control={<Checkbox checked={filters.year === yearValue} />}
                  label={yearValue}
                  onChange={() =>
                    updateFilters({
                      year: filters.year === yearValue ? '' : yearValue,
                    })
                  }
                />
              );
            })}
          </Stack>
        </AccordionDetails>
      </Accordion>

      <Button
        fullWidth
        variant="contained"
        disabled={!hasActiveFilters}
        onClick={clearFilters}
        sx={{ mt: 2 }}
      >
        Clear Filters
      </Button>
    </Box>
  );
};

export default ProductFiltersSidebar;