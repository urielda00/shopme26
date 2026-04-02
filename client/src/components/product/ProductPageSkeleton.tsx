import { Box, Skeleton } from "@mui/material";

const ProductPageSkeleton = () => {
	return (
		<Box
			sx={{
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
				<Skeleton variant="rounded" height={420} sx={{ borderRadius: 4 }} />
				<Skeleton variant="rounded" height={420} sx={{ borderRadius: 4 }} />
			</Box>

			<Box sx={{ mt: 5, display: "flex", gap: 1.5, overflow: "hidden" }}>
				{[1, 2, 3, 4].map((item) => (
					<Skeleton
						key={item}
						variant="rounded"
						width={210}
						height={240}
						sx={{ borderRadius: 3, flex: "0 0 auto" }}
					/>
				))}
			</Box>
		</Box>
	);
};

export default ProductPageSkeleton;