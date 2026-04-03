import { Box, Button, Chip, Rating, Stack, Typography } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import ArrowOutwardRoundedIcon from "@mui/icons-material/ArrowOutwardRounded";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { addToCartThunk } from "../../features/cartSlice";
import { IProduct } from "../../interfaces/product.interface";
import { ICartItem } from "../../interfaces/cart.interface";
import { getImageUrl } from "../../utils/getImageUrl";

interface ProductListItemProps {
	product: IProduct;
}

const ProductListItem = ({ product }: ProductListItemProps) => {
	const dispatch = useAppDispatch();
	const [imageFailed, setImageFailed] = useState(false);

	const rawImage = product.images?.[0];

	// Direct pass of the DB string to getImageUrl
	const imageSrc = rawImage && !imageFailed ? getImageUrl(rawImage) : "";

	const cartItem: ICartItem = {
		_id: product._id,
		productName: product.productName,
		price: product.price,
		quantity: product.quantity,
		itemQuantity: 1,
		image: product.images?.[0],
		category: product.category,
	};

	const handleAddToCart = () => {
		void dispatch(addToCartThunk(cartItem));
	};

	return (
		<Box
			sx={{
				position: "relative",
				p: { xs: 1.6, sm: 2.1, md: 2.4 },
				borderRadius: 4,
				border: "1px solid rgba(255,255,255,0.16)",
				background: "linear-gradient(180deg, rgba(255,255,255,0.10), rgba(255,255,255,0.045))",
				backdropFilter: "blur(18px)",
				boxShadow: "0 10px 30px rgba(15,23,42,0.10), inset 0 1px 0 rgba(255,255,255,0.10)",
				transition: "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
				"&:hover": {
					transform: "translateY(-3px)",
					boxShadow: "0 18px 40px rgba(15,23,42,0.16), inset 0 1px 0 rgba(255,255,255,0.14)",
					borderColor: "rgba(255,255,255,0.24)",
				},
			}}
		>
			<Stack
				direction={{ xs: "column", md: "row" }}
				spacing={{ xs: 2, md: 2.4 }}
				alignItems={{ xs: "stretch", md: "center" }}
			>
				<Box
					component={Link}
					to={`/product/${product._id}?category=${product.category}`}
					sx={{
						position: "relative",
						width: { xs: "100%", md: 190 },
						minWidth: { md: 190 },
						height: { xs: 220, sm: 240, md: 160 },
						borderRadius: 3,
						overflow: "hidden",
						display: "block",
						background: "linear-gradient(180deg, rgba(255,255,255,0.11), rgba(255,255,255,0.04))",
						border: "1px solid rgba(255,255,255,0.12)",
						boxShadow: "inset 0 1px 0 rgba(255,255,255,0.10)",
						textDecoration: "none",
						"&::after": {
							content: '""',
							position: "absolute",
							inset: 0,
							background:
								"linear-gradient(180deg, rgba(10,15,25,0.00) 35%, rgba(10,15,25,0.22) 100%)",
							opacity: 0,
							transition: "opacity 180ms ease",
							pointerEvents: "none",
						},
						"&:hover::after": {
							opacity: 1,
						},
						"&:hover img": {
							transform: "scale(1.04)",
						},
						"&:hover .image-hover-label": {
							opacity: 1,
							transform: "translateY(0)",
						},
					}}
				>
					{imageSrc ? (
						<Box
							component="img"
							loading="lazy"
							src={imageSrc}
							alt={product.productName}
							onError={() => setImageFailed(true)}
							sx={{
								width: "100%",
								height: "100%",
								objectFit: "contain",
								p: 1.5,
								display: "block",
								transition: "transform 220ms ease",
							}}
						/>
					) : (
						<Box
							sx={{
								width: "100%",
								height: "100%",
								display: "grid",
								placeItems: "center",
								opacity: 0.55,
							}}
						>
							<Typography variant="body2">No image</Typography>
						</Box>
					)}

					<Box
						className="image-hover-label"
						sx={{
							position: "absolute",
							left: 12,
							bottom: 12,
							px: 1.1,
							py: 0.7,
							borderRadius: 999,
							background: "rgba(10,15,25,0.58)",
							color: "white",
							display: "flex",
							alignItems: "center",
							gap: 0.7,
							fontSize: 13,
							fontWeight: 600,
							opacity: 0,
							transform: "translateY(6px)",
							transition: "all 180ms ease",
							backdropFilter: "blur(10px)",
						}}
					>
						<VisibilityOutlinedIcon sx={{ fontSize: 16 }} />
						View product
					</Box>
				</Box>

				<Box sx={{ flex: 1, minWidth: 0 }}>
					<Stack
						direction="row"
						justifyContent="space-between"
						alignItems="flex-start"
						spacing={2}
						sx={{ mb: 1 }}
					>
						<Box sx={{ minWidth: 0 }}>
							<Typography
								variant="h5"
								sx={{
									fontWeight: 750,
									lineHeight: 1.15,
									mb: 0.6,
									fontSize: { xs: "1.3rem", md: "1.55rem" },
								}}
							>
								{product.productName}
							</Typography>

							{product.shortDescription ? (
								<Typography
									variant="body1"
									sx={{
										opacity: 0.78,
										maxWidth: 720,
									}}
								>
									{product.shortDescription}
								</Typography>
							) : null}
						</Box>

						<Typography
							variant="h5"
							sx={{
								fontWeight: 800,
								whiteSpace: "nowrap",
								alignSelf: { xs: "flex-start", md: "center" },
							}}
						>
							${product.price}
						</Typography>
					</Stack>

					<Stack direction="row" spacing={1} useFlexGap flexWrap="wrap" sx={{ mb: 1.4 }}>
						<Chip
							label={product.category}
							size="small"
							sx={{
								borderRadius: 999,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.12)",
							}}
						/>
						<Chip
							label={product.brand}
							size="small"
							sx={{
								borderRadius: 999,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.12)",
							}}
						/>
						<Chip
							label={product.os}
							size="small"
							sx={{
								borderRadius: 999,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.12)",
							}}
						/>
						<Chip
							label={String(product.releaseYear)}
							size="small"
							sx={{
								borderRadius: 999,
								background: "rgba(255,255,255,0.08)",
								border: "1px solid rgba(255,255,255,0.12)",
							}}
						/>
					</Stack>

					<Rating value={4.5} precision={0.5} readOnly sx={{ mb: 1.8 }} />

					<Stack
						direction={{ xs: "column", sm: "row" }}
						spacing={1.2}
						justifyContent="space-between"
						alignItems={{ xs: "stretch", sm: "center" }}
					>
						<Typography
							variant="body2"
							sx={{
								opacity: 0.68,
								fontWeight: 500,
							}}
						>
							{product.quantity > 0 ? `${product.quantity} in stock` : "Out of stock"}
						</Typography>

						<Stack direction="row" spacing={1.1}>
							<Button
								variant="contained"
								onClick={handleAddToCart}
								startIcon={<ShoppingBagOutlinedIcon />}
								sx={{
									borderRadius: 999,
									px: 2.1,
									py: 1,
									fontWeight: 700,
									textTransform: "none",
									background: "linear-gradient(135deg, rgba(32,41,58,0.95), rgba(73,87,122,0.92))",
									boxShadow: "0 10px 24px rgba(27,39,66,0.22)",
									"&:hover": {
										background:
											"linear-gradient(135deg, rgba(25,33,48,0.98), rgba(62,76,110,0.98))",
										boxShadow: "0 14px 30px rgba(27,39,66,0.28)",
									},
								}}
							>
								Add to Cart
							</Button>

							<Button
								component={Link}
								to={`/product/${product._id}?category=${product.category}`}
								variant="outlined"
								endIcon={<ArrowOutwardRoundedIcon />}
								sx={{
									borderRadius: 999,
									px: 2,
									py: 1,
									fontWeight: 700,
									textTransform: "none",
									borderColor: "rgba(255,255,255,0.18)",
									background: "rgba(255,255,255,0.04)",
									"&:hover": {
										borderColor: "rgba(255,255,255,0.28)",
										background: "rgba(255,255,255,0.08)",
									},
								}}
							>
								More Info
							</Button>
						</Stack>
					</Stack>
				</Box>
			</Stack>
		</Box>
	);
};

export default ProductListItem;