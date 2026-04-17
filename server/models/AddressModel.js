import mongoose from 'mongoose';

/**
 * Address Schema
 * Manages user shipping and billing addresses.
 * Stores both structured data for precise querying/validation and optional plain text formats.
 */
const AddressSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
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
			type: [String], 
		},
	},
	{ timestamps: true }
);

const Address = mongoose.models.Address || mongoose.model('Address', AddressSchema);
export default Address;