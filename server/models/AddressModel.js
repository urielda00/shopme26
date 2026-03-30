import mongoose from 'mongoose';

const AddressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		// Structured address info for better querying and validation
		fullAddressInfo: [
			{
				city: { type: String, required: true },
				street: { type: String, required: true },
				houseNumber: { type: String, required: true },
				zipCode: { type: String },
				isDefault: { type: Boolean, default: false }
			}
		],
		addressList: {
			type: [String], // Simple text representations if needed
		},
	},
	{ timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);
export default Address;