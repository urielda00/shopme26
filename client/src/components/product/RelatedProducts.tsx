import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useRelatedProducts } from "../../services/products/useProduct";
import { IProduct } from "../../interfaces/product.interface";
import { getImageUrl } from "../../utils/getImageUrl";
import type { SyntheticEvent } from "react";

interface RelatedProductsProps {
	category: string;
	currentProductId: string;
}

const RelatedProducts = ({ category, currentProductId }: RelatedProductsProps) => {
	const { data: relatedProducts = [], isLoading } = useRelatedProducts(category, currentProductId);

	if (isLoading || !relatedProducts.length) return null;

	return (
		<Box sx={{ mt: { xs: 4.5, md: 6 } }}>
			<Typography
				variant="h5"
				sx={{
					mb: 2,
					fontWeight: 800,
					letterSpacing: "-0.03em",
					color: "#111827",
					fontSize: { xs: "1.2rem", md: "1.45rem" },
				}}
			>
				Related products
			</Typography>

			<Box
				sx={{
					display: "flex",
					gap: 1.5,
					overflowX: "auto",
					pb: 1,
					scrollBehavior: "smooth",
					scrollbarWidth: "thin",
				}}
			>
				{relatedProducts.slice(0, 4).map((item: IProduct) => (
					<Box
						key={item._id}
						component={Link}
						to={`/product/${item._id}`}
						sx={{
							minWidth: { xs: 180, sm: 190, md: 210 },
							maxWidth: 210,
							flex: "0 0 auto",
							textDecoration: "none",
							color: "inherit",
							p: 1.5,
							borderRadius: 3,
							backgroundColor: "#ffffff",
							border: "1px solid #e5e7eb",
							boxShadow: "0 10px 24px rgba(15,23,42,0.05)",
							transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
							"&:hover": {
								transform: "translateY(-4px)",
								boxShadow: "0 16px 30px rgba(15,23,42,0.10)",
								borderColor: "#d1d5db",
							},
						}}
					>
						<Box
							sx={{
								height: 140,
								borderRadius: 2.5,
								mb: 1.25,
								backgroundColor: "#f8fafc",
								border: "1px solid #eef2f7",
								display: "flex",
								alignItems: "center",
								justifyContent: "center",
								p: 1,
								overflow: "hidden",
							}}
						>
							<Box
								component="img"
								src={getImageUrl(item.images?.[0])}
								alt={item.productName}
								onError={(e: SyntheticEvent<HTMLImageElement>) => {
									e.currentTarget.style.display = "none";
								}}
								sx={{
									width: "100%",
									height: "100%",
									objectFit: "contain",
									display: "block",
								}}
							/>
						</Box>

						<Typography
							sx={{
								fontWeight: 800,
								mb: 0.4,
								color: "#111827",
								lineHeight: 1.3,
								minHeight: 38,
								fontSize: "0.94rem",
							}}
						>
							{item.productName}
						</Typography>

						<Typography
							sx={{
								color: "#6b7280",
								fontSize: "0.82rem",
								mb: 0.9,
								minHeight: 34,
								lineHeight: 1.4,
							}}
						>
							{item.shortDescription || item.brand}
						</Typography>

						<Typography
							sx={{
								fontWeight: 900,
								fontSize: "0.98rem",
								color: "#111827",
							}}
						>
							${item.price}
						</Typography>
					</Box>
				))}
			</Box>
		</Box>
	);
};

export default RelatedProducts;