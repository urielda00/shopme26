import { Box, Typography } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import ProductGallery from "../components/product/ProductGallery";
import ProductInfo from "../components/product/ProductInfo";
import RelatedProducts from "../components/product/RelatedProducts";
import ProductPageSkeleton from "../components/product/ProductPageSkeleton";
import { useProduct } from "../services/products/useProduct";

const ProductPage = () => {
	const { productId } = useParams();
	const { data: product, isLoading, isError, error } = useProduct(productId);

	const normalizedImages = useMemo(() => {
		if (!product?.images?.length) return [];
		return product.images.filter(Boolean);
	}, [product]);

	const [selectedImage, setSelectedImage] = useState("");

	useEffect(() => {
		if (normalizedImages.length) {
			setSelectedImage(normalizedImages[0]);
		}
	}, [normalizedImages]);

	if (isLoading) {
		return <ProductPageSkeleton />;
	}

	if (isError || !product) {
		return (
			<Box
				sx={{
					width: "100%",
					maxWidth: 1180,
					mx: "auto",
					px: { xs: 2, sm: 3 },
					pt: { xs: "104px", md: "118px" },
					pb: { xs: 4, md: 6 },
				}}
			>
				<Typography variant="h5" sx={{ fontWeight: 800, mb: 1, color: "#111827" }}>
					Product not found
				</Typography>
				<Typography sx={{ color: "#6b7280" }}>
					{(error as any)?.message || "Unable to load this product right now."}
				</Typography>
			</Box>
		);
	}

	return (
		<Box
			sx={{
				width: "100%",
				maxWidth: 1180,
				mx: "auto",
				px: { xs: 2, sm: 3, md: 4 },
				pt: { xs: "104px", md: "118px" },
				pb: { xs: 5, md: 7 },
			}}
		>
			<Box
				sx={{
					display: "grid",
					gridTemplateColumns: {
						xs: "1fr",
						lg: "minmax(0, 0.95fr) minmax(300px, 360px)",
					},
					gap: { xs: 3, md: 3.5, lg: 4 },
					alignItems: "start",
				}}
			>
				<ProductGallery
					images={normalizedImages}
					selectedImage={selectedImage || normalizedImages[0]}
					onSelectImage={setSelectedImage}
					productName={product.productName}
				/>

				<ProductInfo product={product} />
			</Box>

			<RelatedProducts category={product.category} currentProductId={product._id} />
		</Box>
	);
};

export default ProductPage;