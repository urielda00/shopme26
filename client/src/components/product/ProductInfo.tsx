import { Box, Button, Chip, Divider, Rating, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { addToCartThunk } from "../../features/cartSlice";
import { useAppDispatch } from "../../app/hooks";
import { IProduct } from "../../interfaces/product.interface";

interface ProductInfoProps {
	product: IProduct;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
	const dispatch = useAppDispatch();

	const handleAddToCart = () => {
    dispatch(
        addToCartThunk({
            _id: product._id,
            productName: product.productName,
            price: product.price,
            quantity: product.quantity,
            itemQuantity: 1,
            image: product.images?.[0],
            category: product.category,
        })
    );
};

	const inStock = product.quantity > 0;

	return (
		<Box
			sx={{
				p: { xs: 1.75, md: 2 },
				borderRadius: 4,
				backgroundColor: "#ffffff",
				border: "1px solid #e5e7eb",
				boxShadow: "0 14px 32px rgba(15,23,42,0.06)",
				position: { lg: "sticky" },
				top: { lg: 100 },
				maxWidth: 360,
				width: "100%",
				justifySelf: "end",
			}}
		>
			<Stack spacing={1.75}>
				<Chip
					label={product.category}
					size="small"
					sx={{
						width: "fit-content",
						borderRadius: "999px",
						bgcolor: "#f3f4f6",
						color: "#111827",
						fontWeight: 700,
						textTransform: "capitalize",
					}}
				/>

				<Box>
					<Typography
						variant="h4"
						sx={{
							fontWeight: 800,
							letterSpacing: "-0.03em",
							fontSize: { xs: "1.35rem", md: "1.7rem" },
							color: "#111827",
							lineHeight: 1.12,
							mb: 0.75,
						}}
					>
						{product.productName}
					</Typography>

					<Stack direction="row" spacing={0.75} alignItems="center" flexWrap="wrap" useFlexGap>
						<Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.92rem" }}>
							4.5
						</Typography>
						<Rating value={4.5} precision={0.5} readOnly size="small" />
						<Typography sx={{ color: "#6b7280", fontSize: "0.84rem" }}>
							Trusted by shoppers
						</Typography>
					</Stack>
				</Box>

				<Divider />

				<Box>
					<Typography
						sx={{
							fontSize: { xs: "1.6rem", md: "1.85rem" },
							fontWeight: 900,
							letterSpacing: "-0.04em",
							color: "#111827",
							lineHeight: 1,
						}}
					>
						${product.price}
					</Typography>

					<Typography
						sx={{
							mt: 0.5,
							color: inStock ? "#166534" : "#991b1b",
							fontWeight: 700,
							fontSize: "0.9rem",
						}}
					>
						{inStock ? `In stock - ${product.quantity} available` : "Currently out of stock"}
					</Typography>
				</Box>

				<Typography
					sx={{
						color: "#4b5563",
						fontSize: { xs: "0.9rem", md: "0.94rem" },
						lineHeight: 1.6,
					}}
				>
					{product.longDescription ||
						product.shortDescription ||
						"Premium product details coming soon."}
				</Typography>

				<Stack direction="row" spacing={0.75} flexWrap="wrap" useFlexGap>
					<Chip size="small" label={`Brand: ${product.brand}`} variant="outlined" />
					<Chip size="small" label={`OS: ${product.os}`} variant="outlined" />
					<Chip size="small" label={`Year: ${product.releaseYear}`} variant="outlined" />
				</Stack>

				<Box
					sx={{
						p: 1.5,
						borderRadius: 3,
						border: "1px solid #e5e7eb",
						backgroundColor: "#f9fafb",
					}}
				>
					<Stack spacing={0.75}>
						<Typography sx={{ fontWeight: 700, color: "#111827", fontSize: "0.95rem" }}>
							Delivery
						</Typography>
						<Typography sx={{ color: "#4b5563", fontSize: "0.88rem" }}>
							Fast checkout experience with a clean product-first layout.
						</Typography>
					</Stack>
				</Box>

				<Stack spacing={1.25}>
					<Button
						fullWidth
						variant="contained"
						onClick={handleAddToCart}
						disabled={!inStock}
						sx={{
							minHeight: 48,
							px: 2.5,
							borderRadius: 3,
							textTransform: "none",
							fontSize: "0.96rem",
							fontWeight: 800,
							background: "linear-gradient(135deg, #111827 0%, #374151 100%)",
							boxShadow: "0 12px 28px rgba(17,24,39,0.20)",
							"&:hover": {
								background: "linear-gradient(135deg, #0f172a 0%, #1f2937 100%)",
								transform: "translateY(-1px)",
								boxShadow: "0 15px 32px rgba(17,24,39,0.24)",
							},
						}}
					>
						Add to cart
					</Button>

					<Button
						fullWidth
						component={Link}
						to="/cart"
						variant="outlined"
						sx={{
							minHeight: 46,
							px: 2.5,
							borderRadius: 3,
							textTransform: "none",
							fontSize: "0.95rem",
							fontWeight: 800,
							borderColor: "#d1d5db",
							color: "#111827",
							backgroundColor: "#ffffff",
							"&:hover": {
								borderColor: "#9ca3af",
								backgroundColor: "#f9fafb",
							},
						}}
					>
						View cart
					</Button>
				</Stack>
			</Stack>
		</Box>
	);
};

export default ProductInfo;