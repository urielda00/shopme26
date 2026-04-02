import { FC } from "react";
import * as Mui from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import UpdateIcon from "@mui/icons-material/Update";
import ArrowBackIosNewRoundedIcon from "@mui/icons-material/ArrowBackIosNewRounded";
import CheckCircleOutlineRoundedIcon from "@mui/icons-material/CheckCircleOutlineRounded";

import Images from "./Images";
import RenderBtn from "./RenderBtn";
import ErrorMessages from "./ErrorMessages";
import * as validate from "../../validate";
import useCreateUpdate from "../../hooks/useCreateUpdate";

interface UpdateCreateProps {
	isUpdate: boolean;
	isCreate: boolean;
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
	} = useCreateUpdate({ isUpdate });

	const isSuccessStep = step === 5;

	return (
		<Mui.Container
			maxWidth="md"
			component="main"
			sx={{
				pt: "112px",
				pb: 8,
			}}
		>
			<Mui.Box
				sx={{
					mx: "auto",
					width: "100%",
					maxWidth: 760,
					p: { xs: 2.2, sm: 3.5 },
					borderRadius: "32px",
					background: "rgba(255,255,255,0.74)",
					backdropFilter: "blur(18px) saturate(140%)",
					border: "1px solid rgba(255,255,255,0.62)",
					boxShadow: "0 30px 80px rgba(15,23,42,0.10)",
				}}
			>
				<Mui.Box
					sx={{
						display: "flex",
						alignItems: "center",
						justifyContent: "space-between",
						gap: 2,
						mb: 3,
					}}
				>
					<Mui.Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
						<Mui.Avatar
							sx={{
								width: 52,
								height: 52,
								background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
								boxShadow: "0 16px 34px rgba(79,70,229,0.22)",
							}}
						>
							{isCreate ? <AddIcon /> : <UpdateIcon />}
						</Mui.Avatar>

						<Mui.Box>
							<Mui.Typography
								variant="overline"
								sx={{
									display: "block",
									color: "rgba(17,24,39,0.56)",
									letterSpacing: "0.24rem",
									lineHeight: 1.2,
								}}
							>
								ADMIN PRODUCT FLOW
							</Mui.Typography>

							<Mui.Typography
								component="h1"
								variant="h4"
								sx={{
									color: "#111827",
									fontWeight: 300,
									letterSpacing: "-0.03em",
								}}
							>
								{isCreate ? "Create Product" : "Update Product"}
							</Mui.Typography>
						</Mui.Box>
					</Mui.Box>

					{!isSuccessStep && step > 1 ? (
						<Mui.IconButton
							size="small"
							onClick={prevStep}
							sx={{
								border: "1px solid rgba(148,163,184,0.22)",
								background: "rgba(255,255,255,0.70)",
							}}
						>
							<ArrowBackIosNewRoundedIcon fontSize="small" />
						</Mui.IconButton>
					) : null}
				</Mui.Box>

				{!isSuccessStep ? (
					<Mui.Box sx={{ mb: 3 }}>
						<Mui.Box
							sx={{
								display: "flex",
								alignItems: "center",
								justifyContent: "space-between",
								mb: 1,
							}}
						>
							<Mui.Typography sx={{ color: "rgba(17,24,39,0.72)", fontSize: "0.92rem" }}>
								Step {step} of 4
							</Mui.Typography>
							<Mui.Typography sx={{ color: "rgba(17,24,39,0.48)", fontSize: "0.84rem" }}>
								{step === 1 && "Basic information"}
								{step === 2 && "Inventory and pricing"}
								{step === 3 && "Classification"}
								{step === 4 && "Media upload"}
							</Mui.Typography>
						</Mui.Box>

						<Mui.LinearProgress
							variant="determinate"
							value={(step / 4) * 100}
							sx={{
								height: 10,
								borderRadius: 999,
								backgroundColor: "rgba(99,102,241,0.10)",
								"& .MuiLinearProgress-bar": {
									borderRadius: 999,
									background: "linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)",
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
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
							textAlign: "center",
						}}
					>
						<CheckCircleOutlineRoundedIcon sx={{ fontSize: 76, color: "#16a34a", mb: 2 }} />
						<Mui.Typography variant="h5" sx={{ mb: 1, color: "#111827", fontWeight: 400 }}>
							{isCreate ? "Product created successfully" : "Product updated successfully"}
						</Mui.Typography>
						<Mui.Typography sx={{ color: "rgba(17,24,39,0.64)", maxWidth: 460 }}>
							The product has been saved successfully. You can now go back to the dashboard or
							continue managing inventory.
						</Mui.Typography>
					</Mui.Box>
				) : (
					<Mui.Box component="form" noValidate onSubmit={handleSubmit(onSubmit)}>
						{step === 1 && (
							<Mui.Grid container spacing={2}>
								{isUpdate ? (
									<Mui.Grid item xs={12}>
										<Mui.TextField
											fullWidth
											id="productID"
											label="Product ID"
											{...register("productID", validate.validateID)}
											error={Boolean(errors.productID)}
											helperText={errors.productID?.message}
											InputProps={{
												endAdornment: isValidating && (
													<Mui.InputAdornment position="end">
														<Mui.CircularProgress size={20} />
													</Mui.InputAdornment>
												),
											}}
										/>
									</Mui.Grid>
								) : null}

								{/* Product Name */}
								<Mui.Grid item xs={12}>
									<Mui.TextField
										fullWidth
										id="productName"
										label="Product Name"
										{...register("productName", {
											...validate.validateProductNameObj,
											required: isCreate ? "Product name is required" : false,
										})}
										error={Boolean(errors.productName)}
										helperText={errors.productName?.message}
									/>
								</Mui.Grid>

								{/* Short Description */}
								<Mui.Grid item xs={12}>
									<Mui.TextField
										fullWidth
										id="shortDescription"
										label="Short Description"
										{...register("shortDescription", {
											...validate.validateShortObj,
											required: isCreate ? "Short description is required" : false,
										})}
										error={Boolean(errors.shortDescription)}
										helperText={errors.shortDescription?.message}
									/>
								</Mui.Grid>

								{/* Long Description */}
								<Mui.Grid item xs={12}>
									<Mui.TextField
										fullWidth
										id="longDescription"
										label="Long Description"
										multiline
										minRows={4}
										{...register("longDescription", {
											...validate.validateLongObj,
											required: isCreate ? "Long description is required" : false,
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
										{...register("quantity", {
											valueAsNumber: true,
											required: isCreate ? "Quantity is required" : false,
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
										{...register("releaseYear", {
											valueAsNumber: true,
											required: isCreate ? "Release year is required" : false,
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
										{...register("price", {
											valueAsNumber: true,
											required: isCreate ? "Price is required" : false,
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
										{...register("company", {
											required: isCreate ? "Company is required" : false,
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
										{...register("os", {
											required: isCreate ? "Operating system is required" : false,
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
										{...register("brand", {
											required: isCreate ? "Brand is required" : false,
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
										{...register("category", {
											required: isCreate ? "Category is required" : false,
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
