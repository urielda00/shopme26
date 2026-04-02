import { Box } from "@mui/material";
import { getImageUrl } from "../../utils/getImageUrl";
import { useMemo, useState, type SyntheticEvent } from "react";

interface ProductGalleryProps {
	images: string[];
	selectedImage: string;
	onSelectImage: (image: string) => void;
	productName: string;
}

const ProductGallery = ({
	images,
	selectedImage,
	onSelectImage,
	productName,
}: ProductGalleryProps) => {
	const safeImages = useMemo(() => (Array.isArray(images) ? images.filter(Boolean) : []), [images]);

	const [isZoomed, setIsZoomed] = useState(false);

	return (
		<Box
			sx={{
				display: "grid",
				gridTemplateColumns: { xs: "1fr", md: "78px minmax(0, 1fr)" },
				gap: { xs: 1.75, md: 2 },
				alignItems: "start",
			}}
		>
			<Box
				sx={{
					order: { xs: 2, md: 1 },
					display: "flex",
					flexDirection: { xs: "row", md: "column" },
					gap: 1,
					overflowX: { xs: "auto", md: "visible" },
					pr: 0.5,
					pb: { xs: 0.5, md: 0 },
					scrollbarWidth: "thin",
				}}
			>
				{safeImages.map((image, index) => {
					const isActive = image === selectedImage;

					return (
						<Box
							key={`${image}-${index}`}
							component="button"
							type="button"
							onClick={() => onSelectImage(image)}
							aria-label={`Select ${productName} image ${index + 1}`}
							sx={{
								border: isActive ? "2px solid #111827" : "1px solid #d1d5db",
								p: 0,
								bgcolor: "#ffffff",
								cursor: "pointer",
								borderRadius: 2.5,
								overflow: "hidden",
								minWidth: { xs: 62, md: "auto" },
								outline: "none",
								boxShadow: isActive
									? "0 8px 22px rgba(17,24,39,0.12)"
									: "0 4px 14px rgba(15,23,42,0.05)",
								transition: "transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease",
								flex: "0 0 auto",
								"&:hover": {
									transform: "translateY(-2px)",
									boxShadow: "0 10px 24px rgba(15,23,42,0.10)",
									borderColor: "#9ca3af",
								},
							}}
						>
							<Box
								component="img"
								src={getImageUrl(image)}
								alt={`${productName} thumbnail ${index + 1}`}
								onError={(e: SyntheticEvent<HTMLImageElement>) => {
									e.currentTarget.style.display = "none";
								}}
								sx={{
									width: { xs: 62, md: 68 },
									height: { xs: 62, md: 68 },
									objectFit: "contain",
									display: "block",
									bgcolor: "#f8fafc",
									p: 0.6,
								}}
							/>
						</Box>
					);
				})}
			</Box>

			<Box
				sx={{
					order: { xs: 1, md: 2 },
					minHeight: { xs: 220, md: 340 },
					borderRadius: 4,
					p: { xs: 1.5, md: 2 },
					backgroundColor: "#ffffff",
					border: "1px solid #e5e7eb",
					boxShadow: "0 14px 32px rgba(15,23,42,0.06)",
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					overflow: "hidden",
					position: "relative",
				}}
			>
				<Box
					sx={{
						width: "100%",
						height: "100%",
						minHeight: { xs: 240, md: 360 },
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						cursor: "zoom-in",
						overflow: "hidden",
					}}
					onMouseEnter={() => setIsZoomed(true)}
					onMouseLeave={() => setIsZoomed(false)}
				>
					<Box
						component="img"
						src={getImageUrl(selectedImage)}
						alt={productName}
						onError={(e: SyntheticEvent<HTMLImageElement>) => {
							e.currentTarget.style.display = "none";
						}}
						sx={{
							width: "100%",
							maxWidth: 300,
							maxHeight: { xs: 220, md: 300 },
							objectFit: "contain",
							display: "block",
							transition: "transform 0.35s ease",
							transform: isZoomed ? "scale(1.08)" : "scale(1)",
							transformOrigin: "center center",
							userSelect: "none",
						}}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default ProductGallery;