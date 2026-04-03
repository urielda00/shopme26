import { FC, useEffect, useMemo, useState } from 'react';
import * as Mui from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import UpdateIcon from '@mui/icons-material/Update';
import DeleteOutlineRoundedIcon from '@mui/icons-material/DeleteOutlineRounded';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import ArrowBackIosNewRoundedIcon from '@mui/icons-material/ArrowBackIosNewRounded';
import CheckCircleOutlineRoundedIcon from '@mui/icons-material/CheckCircleOutlineRounded';

import Images from './Images';
import RenderBtn from './RenderBtn';
import ErrorMessages from './ErrorMessages';
import * as validate from '../../validate';
import useCreateUpdate from '../../hooks/useCreateUpdate';
import {
    deleteProductAPI,
    getProductByIdAPI,
    searchProductsAPI,
} from '../../services/adminService';

interface UpdateCreateProps {
    isUpdate: boolean;
    isCreate: boolean;
}

interface ProductSearchItem {
    _id: string;
    productName: string;
    brand?: string;
    category?: string;
    price?: number;
    image?: string;
    images?: string[];
}

const UpdateCreate: FC<UpdateCreateProps> = ({ isUpdate, isCreate }) => {
    const {
    step,
    errors,
    isValid,
    isDirty,
    nextStep,
    prevStep,
    register,
    onSubmit,
    changeState,
    handleSubmit,
    image1Length,
    image2Length,
    image3Length,
    image4Length,
    submitting,
    submitError,
    isValidating,
    reset,
    setValue,
    clearLocalImages,
    setStep,
    watch,
} = useCreateUpdate({ isUpdate });

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState<ProductSearchItem[]>([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [searchError, setSearchError] = useState('');
    const [selectedProduct, setSelectedProduct] = useState<ProductSearchItem | null>(null);
    const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

    const isSuccessStep = step === 5;

    useEffect(() => {
        if (!isUpdate) return;

        const trimmed = searchTerm.trim();

        if (trimmed.length < 2) {
            setSearchResults([]);
            setSearchError('');
            return;
        }

        const timer = setTimeout(async () => {
            try {
                setSearchLoading(true);
                setSearchError('');

                const { data } = await searchProductsAPI(trimmed);
                setSearchResults(Array.isArray(data?.items) ? data.items : []);
            } catch (error: any) {
                setSearchResults([]);
                setSearchError(
                    error?.response?.data?.message || 'Failed to search products'
                );
            } finally {
                setSearchLoading(false);
            }
        }, 350);

        return () => clearTimeout(timer);
    }, [searchTerm, isUpdate]);

    const selectedProductLabel = useMemo(() => {
        if (!selectedProduct) return '';
        const brand = selectedProduct.brand ? ` - ${selectedProduct.brand}` : '';
        return `${selectedProduct.productName}${brand}`;
    }, [selectedProduct]);

    const handleSelectProduct = async (productId: string) => {
        try {
            setActionLoadingId(productId);
            setSearchError('');

            const { data } = await getProductByIdAPI(productId);
            const product = data?.data;

            if (!product) {
                throw new Error('Product not found');
            }

            setSelectedProduct(product);

            reset({
                productID: product._id,
                productName: product.productName || '',
                shortDescription: product.shortDescription || '',
                longDescription: product.longDescription || '',
                quantity: product.quantity ?? undefined,
                releaseYear: product.releaseYear ?? undefined,
                price: product.price ?? undefined,
                company: product.company || '',
                os: product.os || '',
                brand: product.brand || '',
                category: product.category || '',
            });

            setValue('productID', product._id, { shouldDirty: false });
            clearLocalImages();
            setStep(1);
        } catch (error: any) {
            setSearchError(
                error?.response?.data?.message || error?.message || 'Failed to load product'
            );
        } finally {
            setActionLoadingId(null);
        }
    };

    const handleDeleteProduct = async (product: ProductSearchItem) => {
        const confirmed = window.confirm(
            `Delete "${product.productName}"? This action cannot be undone.`
        );

        if (!confirmed) return;

        try {
            setActionLoadingId(product._id);
            setSearchError('');

            await deleteProductAPI(product._id);

            setSearchResults((prev) => prev.filter((item) => item._id !== product._id));

            if (selectedProduct?._id === product._id) {
                setSelectedProduct(null);
                reset({
                    productID: '',
                    productName: '',
                    shortDescription: '',
                    longDescription: '',
                    quantity: undefined,
                    releaseYear: undefined,
                    price: undefined,
                    company: '',
                    os: '',
                    brand: '',
                    category: '',
                });
                clearLocalImages();
                setStep(1);
            }
        } catch (error: any) {
            setSearchError(
                error?.response?.data?.message || error?.message || 'Failed to delete product'
            );
        } finally {
            setActionLoadingId(null);
        }
    };

    return (
        <Mui.Container
            maxWidth="md"
            component="main"
            sx={{
                pt: '112px',
                pb: 8,
            }}
        >
            <Mui.Box
                sx={{
                    mx: 'auto',
                    width: '100%',
                    maxWidth: 820,
                    p: { xs: 2.2, sm: 3.5 },
                    borderRadius: '32px',
                    background: 'rgba(255,255,255,0.74)',
                    backdropFilter: 'blur(18px) saturate(140%)',
                    border: '1px solid rgba(255,255,255,0.62)',
                    boxShadow: '0 30px 80px rgba(15,23,42,0.10)',
                }}
            >
                <Mui.Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: 2,
                        mb: 3,
                    }}
                >
                    <Mui.Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Mui.Avatar
                            sx={{
                                width: 52,
                                height: 52,
                                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                boxShadow: '0 16px 34px rgba(79,70,229,0.22)',
                            }}
                        >
                            {isCreate ? <AddIcon /> : <UpdateIcon />}
                        </Mui.Avatar>

                        <Mui.Box>
                            <Mui.Typography
                                variant="overline"
                                sx={{
                                    display: 'block',
                                    color: 'rgba(17,24,39,0.56)',
                                    letterSpacing: '0.24rem',
                                    lineHeight: 1.2,
                                }}
                            >
                                ADMIN PRODUCT FLOW
                            </Mui.Typography>

                            <Mui.Typography
                                component="h1"
                                variant="h4"
                                sx={{
                                    color: '#111827',
                                    fontWeight: 300,
                                    letterSpacing: '-0.03em',
                                }}
                            >
                                {isCreate ? 'Create Product' : 'Update Product'}
                            </Mui.Typography>
                        </Mui.Box>
                    </Mui.Box>

                    {!isSuccessStep && step > 1 ? (
                        <Mui.IconButton
                            size="small"
                            onClick={prevStep}
                            sx={{
                                border: '1px solid rgba(148,163,184,0.22)',
                                background: 'rgba(255,255,255,0.70)',
                            }}
                        >
                            <ArrowBackIosNewRoundedIcon fontSize="small" />
                        </Mui.IconButton>
                    ) : null}
                </Mui.Box>

                {isUpdate && !isSuccessStep ? (
                    <Mui.Box
                        sx={{
                            mb: 3,
                            p: 2.2,
                            borderRadius: '24px',
                            border: '1px solid rgba(148,163,184,0.18)',
                            background:
                                'radial-gradient(circle at top right, rgba(99,102,241,0.08), transparent 35%), rgba(255,255,255,0.72)',
                        }}
                    >
                        <Mui.Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                            <SearchRoundedIcon sx={{ color: '#4f46e5' }} />
                            <Mui.Typography sx={{ fontWeight: 500, color: '#111827' }}>
                                Search product to edit or delete
                            </Mui.Typography>
                        </Mui.Box>

                        <Mui.TextField
                            fullWidth
                            placeholder="Search by product name, brand, short description, or category"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{
                                endAdornment: searchLoading ? (
                                    <Mui.InputAdornment position="end">
                                        <Mui.CircularProgress size={20} />
                                    </Mui.InputAdornment>
                                ) : undefined,
                            }}
                        />

                        {selectedProduct ? (
                            <Mui.Box
                                sx={{
                                    mt: 1.75,
                                    px: 1.5,
                                    py: 1.2,
                                    borderRadius: '16px',
                                    background: 'rgba(79,70,229,0.06)',
                                    border: '1px solid rgba(79,70,229,0.14)',
                                }}
                            >
                                <Mui.Typography sx={{ fontSize: '0.9rem', color: '#4338ca' }}>
                                    Selected product
                                </Mui.Typography>
                                <Mui.Typography sx={{ fontWeight: 600, color: '#111827' }}>
                                    {selectedProductLabel}
                                </Mui.Typography>
                            </Mui.Box>
                        ) : null}

                        {searchError ? (
                            <Mui.Alert severity="error" sx={{ mt: 2, borderRadius: '16px' }}>
                                {searchError}
                            </Mui.Alert>
                        ) : null}

                        {searchResults.length > 0 ? (
                            <Mui.Stack spacing={1.5} sx={{ mt: 2 }}>
                                {searchResults.map((product) => {
                                    const previewImage =
                                        product.image ||
                                        (Array.isArray(product.images) ? product.images[0] : '');

                                    const busy = actionLoadingId === product._id;

                                    return (
                                        <Mui.Box
                                            key={product._id}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                gap: 2,
                                                p: 1.5,
                                                borderRadius: '18px',
                                                border: '1px solid rgba(148,163,184,0.18)',
                                                background: 'rgba(255,255,255,0.82)',
                                            }}
                                        >
                                            <Mui.Box
                                                sx={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: 1.5,
                                                    minWidth: 0,
                                                    flex: 1,
                                                }}
                                            >
                                                <Mui.Avatar
                                                    src={previewImage || undefined}
                                                    variant="rounded"
                                                    sx={{
                                                        width: 60,
                                                        height: 60,
                                                        borderRadius: '14px',
                                                        bgcolor: 'rgba(99,102,241,0.08)',
                                                    }}
                                                >
                                                    {!previewImage ? product.productName?.[0] : null}
                                                </Mui.Avatar>

                                                <Mui.Box sx={{ minWidth: 0 }}>
                                                    <Mui.Typography
                                                        sx={{
                                                            fontWeight: 600,
                                                            color: '#111827',
                                                            whiteSpace: 'nowrap',
                                                            overflow: 'hidden',
                                                            textOverflow: 'ellipsis',
                                                        }}
                                                    >
                                                        {product.productName}
                                                    </Mui.Typography>

                                                    <Mui.Typography
                                                        sx={{
                                                            fontSize: '0.86rem',
                                                            color: 'rgba(17,24,39,0.60)',
                                                        }}
                                                    >
                                                        {[product.brand, product.category]
                                                            .filter(Boolean)
                                                            .join(' • ')}
                                                    </Mui.Typography>

                                                    {typeof product.price === 'number' ? (
                                                        <Mui.Typography
                                                            sx={{
                                                                fontSize: '0.86rem',
                                                                color: '#4f46e5',
                                                                mt: 0.4,
                                                            }}
                                                        >
                                                            ${product.price}
                                                        </Mui.Typography>
                                                    ) : null}
                                                </Mui.Box>
                                            </Mui.Box>

                                            <Mui.Stack direction="row" spacing={1}>
                                                <Mui.Button
                                                    variant="outlined"
                                                    startIcon={
                                                        busy ? undefined : <EditOutlinedIcon />
                                                    }
                                                    onClick={() =>
                                                        handleSelectProduct(product._id)
                                                    }
                                                    disabled={busy}
                                                    sx={{
                                                        borderRadius: '14px',
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    {busy ? 'Loading...' : 'Edit'}
                                                </Mui.Button>

                                                <Mui.Button
                                                    color="error"
                                                    variant="outlined"
                                                    startIcon={
                                                        busy ? undefined : (
                                                            <DeleteOutlineRoundedIcon />
                                                        )
                                                    }
                                                    onClick={() => handleDeleteProduct(product)}
                                                    disabled={busy}
                                                    sx={{
                                                        borderRadius: '14px',
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Delete
                                                </Mui.Button>
                                            </Mui.Stack>
                                        </Mui.Box>
                                    );
                                })}
                            </Mui.Stack>
                        ) : null}
                    </Mui.Box>
                ) : null}

                {!isSuccessStep ? (
                    <Mui.Box sx={{ mb: 3 }}>
                        <Mui.Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                mb: 1,
                            }}
                        >
                            <Mui.Typography sx={{ color: 'rgba(17,24,39,0.72)', fontSize: '0.92rem' }}>
                                Step {step} of 4
                            </Mui.Typography>
                            <Mui.Typography sx={{ color: 'rgba(17,24,39,0.48)', fontSize: '0.84rem' }}>
                                {step === 1 && 'Basic information'}
                                {step === 2 && 'Inventory and pricing'}
                                {step === 3 && 'Classification'}
                                {step === 4 && 'Media upload'}
                            </Mui.Typography>
                        </Mui.Box>

                        <Mui.LinearProgress
                            variant="determinate"
                            value={(step / 4) * 100}
                            sx={{
                                height: 10,
                                borderRadius: 999,
                                backgroundColor: 'rgba(99,102,241,0.10)',
                                '& .MuiLinearProgress-bar': {
                                    borderRadius: 999,
                                    background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                },
                            }}
                        />
                    </Mui.Box>
                ) : null}

                <ErrorMessages error={submitError} />

                {isSuccessStep ? (
                    <Mui.Box
                        sx={{
                            py: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            textAlign: 'center',
                        }}
                    >
                        <CheckCircleOutlineRoundedIcon sx={{ fontSize: 76, color: '#16a34a', mb: 2 }} />
                        <Mui.Typography variant="h5" sx={{ mb: 1, color: '#111827', fontWeight: 400 }}>
                            {isCreate ? 'Product created successfully' : 'Product updated successfully'}
                        </Mui.Typography>
                        <Mui.Typography sx={{ color: 'rgba(17,24,39,0.64)', maxWidth: 460 }}>
                            The product has been saved successfully. You can now go back to the dashboard or
                            continue managing inventory.
                        </Mui.Typography>
                    </Mui.Box>
                ) : (
                    <Mui.Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" {...register('productID')} />

                        {step === 1 && (
                            <Mui.Grid container spacing={2}>
                                <Mui.Grid item xs={12}>
                                    <Mui.TextField
                                        fullWidth
                                        id="productName"
                                        label="Product Name"
                                        {...register('productName', {
                                            ...validate.validateProductNameObj,
                                            required: isCreate ? 'Product name is required' : false,
                                        })}
                                        error={Boolean(errors.productName)}
                                        helperText={errors.productName?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12}>
                                    <Mui.TextField
                                        fullWidth
                                        id="shortDescription"
                                        label="Short Description"
                                        {...register('shortDescription', {
                                            ...validate.validateShortObj,
                                            required: isCreate ? 'Short description is required' : false,
                                        })}
                                        error={Boolean(errors.shortDescription)}
                                        helperText={errors.shortDescription?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12}>
                                    <Mui.TextField
                                        fullWidth
                                        id="longDescription"
                                        label="Long Description"
                                        multiline
                                        minRows={4}
                                        {...register('longDescription', {
                                            ...validate.validateLongObj,
                                            required: isCreate ? 'Long description is required' : false,
                                        })}
                                        error={Boolean(errors.longDescription)}
                                        helperText={errors.longDescription?.message}
                                    />
                                </Mui.Grid>
                            </Mui.Grid>
                        )}

                        {step === 2 && (
                            <Mui.Grid container spacing={2}>
                                <Mui.Grid item xs={12} sm={4}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Quantity"
                                        type="number"
                                        {...register('quantity', {
                                            valueAsNumber: true,
                                            required: isCreate ? 'Quantity is required' : false,
                                        })}
                                        error={Boolean(errors.quantity)}
                                        helperText={errors.quantity?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12} sm={4}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Release Year"
                                        type="number"
                                        {...register('releaseYear', {
                                            valueAsNumber: true,
                                            required: isCreate ? 'Release year is required' : false,
                                        })}
                                        error={Boolean(errors.releaseYear)}
                                        helperText={errors.releaseYear?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12} sm={4}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Price"
                                        type="number"
                                        InputProps={validate.priceInputProps}
                                        {...register('price', {
                                            valueAsNumber: true,
                                            required: isCreate ? 'Price is required' : false,
                                        })}
                                        error={Boolean(errors.price)}
                                        helperText={errors.price?.message}
                                    />
                                </Mui.Grid>
                            </Mui.Grid>
                        )}

                        {step === 3 && (
                            <Mui.Grid container spacing={2}>
                                <Mui.Grid item xs={12} sm={6}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Company"
                                        id="company"
                                        type="text"
                                        {...register('company', {
                                            required: isCreate ? 'Company is required' : false,
                                            ...validate.companyObj,
                                        })}
                                        error={Boolean(errors.company)}
                                        helperText={errors.company?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12} sm={6}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Operating System"
                                        id="os"
                                        type="text"
                                        {...register('os', {
                                            required: isCreate ? 'Operating system is required' : false,
                                            ...validate.osObj,
                                        })}
                                        error={Boolean(errors.os)}
                                        helperText={errors.os?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12} sm={6}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Brand"
                                        id="brand"
                                        type="text"
                                        {...register('brand', {
                                            required: isCreate ? 'Brand is required' : false,
                                            ...validate.brandObj,
                                        })}
                                        error={Boolean(errors.brand)}
                                        helperText={errors.brand?.message}
                                    />
                                </Mui.Grid>

                                <Mui.Grid item xs={12} sm={6}>
                                    <Mui.TextField
                                        fullWidth
                                        label="Category"
                                        id="category"
                                        type="text"
                                        {...register('category', {
                                            required: isCreate ? 'Category is required' : false,
                                            ...validate.categoryObj,
                                        })}
                                        error={Boolean(errors.category)}
                                        helperText={errors.category?.message}
                                    />
                                </Mui.Grid>
                            </Mui.Grid>
                        )}

                        {step === 4 && (
                            <Mui.Grid container spacing={2}>
                                <Images
                                    id="image1"
                                    register={register}
                                    image="image1"
                                    buttonId="uploadBtn1"
                                    imageLength={image1Length}
                                    changeState={changeState}
                                    imageNumber={1}
                                    errorsPerImage={errors.image1}
                                    isCreate={isCreate}
                                />

                                <Images
                                    id="image2"
                                    register={register}
                                    image="image2"
                                    buttonId="uploadBtn2"
                                    imageLength={image2Length}
                                    changeState={changeState}
                                    imageNumber={2}
                                    errorsPerImage={errors.image2}
                                    isCreate={isCreate}
                                />

                                <Images
                                    id="image3"
                                    register={register}
                                    image="image3"
                                    buttonId="uploadBtn3"
                                    imageLength={image3Length}
                                    changeState={changeState}
                                    imageNumber={3}
                                    errorsPerImage={errors.image3}
                                    isCreate={isCreate}
                                />

                                <Images
                                    id="image4"
                                    register={register}
                                    image="image4"
                                    buttonId="uploadBtn4"
                                    imageLength={image4Length}
                                    changeState={changeState}
                                    imageNumber={4}
                                    errorsPerImage={errors.image4}
                                    isCreate={isCreate}
                                />
                            </Mui.Grid>
                        )}

                        <RenderBtn
                            step={step}
                            nextStep={nextStep}
                            isValid={isValid}
                            isDirty={isDirty}
                            submitting={submitting}
                            isUpdate={isUpdate}
                        />
                    </Mui.Box>
                )}
            </Mui.Box>
        </Mui.Container>
    );
};

export default UpdateCreate;