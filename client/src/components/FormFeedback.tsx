import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Stack from '@mui/material/Stack';

interface FormFeedbackProps {
    error?: string | string[] | null;
    success?: string | null;
    sx?: object;
}

const baseAlertSx = {
    width: '100%',
    borderRadius: '16px',
    alignItems: 'center',
    boxShadow: '0 18px 40px rgba(15,23,42,0.08)',
};

const FormFeedback = ({ error, success, sx }: FormFeedbackProps) => {
    const errorList = Array.isArray(error)
        ? error.filter(Boolean)
        : error
            ? [error]
            : [];

    const hasError = errorList.length > 0;
    const hasSuccess = Boolean(success);

    if (!hasError && !hasSuccess) return null;

    return (
        <Collapse in={hasError || hasSuccess}>
            <Stack spacing={1.25} sx={{ width: '100%', mb: 2, ...sx }}>
                {hasError
                    ? errorList.map((item, index) => (
                          <Alert
                              key={`${item}-${index}`}
                              severity='error'
                              sx={{
                                  ...baseAlertSx,
                                  background: 'rgba(255, 239, 239, 0.88)',
                                  border: '1px solid rgba(244, 67, 54, 0.14)',
                              }}
                          >
                              {item}
                          </Alert>
                      ))
                    : null}

                {hasSuccess ? (
                    <Alert
                        severity='success'
                        sx={{
                            ...baseAlertSx,
                            background: 'rgba(237, 247, 237, 0.90)',
                            border: '1px solid rgba(76, 175, 80, 0.12)',
                        }}
                    >
                        {success}
                    </Alert>
                ) : null}
            </Stack>
        </Collapse>
    );
};

export default FormFeedback;