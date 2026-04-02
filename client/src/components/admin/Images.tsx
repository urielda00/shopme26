import { Button, Grid, TextField, Typography, Box } from '@mui/material';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';

const acceptedFormats = ['image/jpeg', 'image/png', 'image/jpg'];

interface ImagesProps {
    id: string;
    image: string;
    imageNumber: number;
    buttonId: string;
    imageLength?: number;
    isCreate: boolean;
    register: any;
    changeState: (file: File, imageKey: string) => void;
    errorsPerImage?: {
        message?: string;
    };
}

const Images = ({
    id,
    image,
    imageNumber,
    buttonId,
    imageLength,
    isCreate,
    register,
    changeState,
    errorsPerImage,
}: ImagesProps) => {
    return (
        <Grid item xs={12}>
            <Box
                sx={{
                    p: 2,
                    borderRadius: '20px',
                    border: '1px solid rgba(148,163,184,0.22)',
                    background: 'rgba(255,255,255,0.74)',
                    backdropFilter: 'blur(14px)',
                }}
            >
                <TextField
                    fullWidth
                    sx={{ display: 'none' }}
                    id={id}
                    type='file'
                    inputProps={{ accept: '.jpg,.jpeg,.png' }}
                    {...register(image, {
                        required: isCreate ? `Image ${imageNumber} is required` : false,
                        validate: {
                            lessThan5MB: (fileList: FileList) =>
                                !fileList?.[0] ||
                                fileList[0].size < 1024 * 1024 * 5 ||
                                'Each image must be under 5MB',
                            acceptedFormats: (fileList: FileList) =>
                                !fileList?.[0] ||
                                acceptedFormats.includes(fileList[0].type) ||
                                'Only PNG, JPG, and JPEG are allowed',
                        },
                        onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                            const file = event.target.files?.[0];
                            if (file) {
                                changeState(file, image);
                            }
                        },
                    })}
                    error={Boolean(errorsPerImage?.message)}
                    helperText={errorsPerImage?.message}
                />

                <Button
                    type='button'
                    id={buttonId}
                    fullWidth
                    onClick={() => document.getElementById(id)?.click()}
                    sx={{
                        minHeight: '58px',
                        borderRadius: '16px',
                        justifyContent: 'space-between',
                        px: 2,
                        color: '#111827',
                        border: '1px dashed rgba(79,70,229,0.36)',
                        background: 'rgba(99,102,241,0.06)',
                        '&:hover': {
                            background: 'rgba(99,102,241,0.10)',
                            borderColor: 'rgba(79,70,229,0.50)',
                        },
                    }}
                >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
                        {imageLength && !errorsPerImage?.message ? (
                            <CheckCircleOutlineOutlinedIcon sx={{ color: '#16a34a' }} />
                        ) : (
                            <AddPhotoAlternateOutlinedIcon sx={{ color: '#4f46e5' }} />
                        )}

                        <Typography sx={{ fontSize: '0.95rem', fontWeight: 400 }}>
                            Upload Image {imageNumber}
                        </Typography>
                    </Box>

                    <Typography sx={{ fontSize: '0.8rem', color: 'rgba(17,24,39,0.56)' }}>
                        JPG / PNG
                    </Typography>
                </Button>

                {errorsPerImage?.message ? (
                    <Typography
                        sx={{
                            mt: 1.25,
                            fontSize: '0.82rem',
                            color: '#dc2626',
                        }}
                    >
                        {errorsPerImage.message}
                    </Typography>
                ) : null}
            </Box>
        </Grid>
    );
};

export default Images;