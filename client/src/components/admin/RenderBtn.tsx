import { Button } from '@mui/material';

interface RenderBtnProps {
    step: number;
    nextStep: () => void;
    isValid: boolean;
    isDirty: boolean;
    submitting?: boolean;
    isUpdate?: boolean;
}

const RenderBtn = ({
    step,
    nextStep,
    isValid,
    isDirty,
    submitting = false,
    isUpdate = false,
}: RenderBtnProps) => {
    if (step > 4) {
        return null;
    }

    if (step === 4) {
        return (
            <Button
                type='submit'
                fullWidth
                variant='contained'
                disabled={submitting}
                sx={{
                    mt: 3,
                    minHeight: '54px',
                    borderRadius: '16px',
                    textTransform: 'none',
                    fontSize: '0.98rem',
                    fontWeight: 500,
                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                    boxShadow: '0 20px 40px rgba(79,70,229,0.28)',
                    '&:hover': {
                        boxShadow: '0 24px 46px rgba(79,70,229,0.34)',
                    },
                }}
            >
                {submitting ? 'Saving...' : isUpdate ? 'Update Product' : 'Create Product'}
            </Button>
        );
    }

    return (
        <Button
            type='button'
            fullWidth
            variant='contained'
            onClick={nextStep}
            disabled={submitting}
            sx={{
                mt: 3,
                minHeight: '54px',
                borderRadius: '16px',
                textTransform: 'none',
                fontSize: '0.98rem',
                fontWeight: 500,
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                boxShadow: '0 20px 40px rgba(79,70,229,0.28)',
                '&:hover': {
                    boxShadow: '0 24px 46px rgba(79,70,229,0.34)',
                },
            }}
        >
            Continue
        </Button>
    );
};

export default RenderBtn;