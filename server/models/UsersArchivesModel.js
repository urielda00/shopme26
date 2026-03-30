import mongoose from 'mongoose';

const UsersArchivesSchema = new mongoose.Schema(
	{
		// Keeping the original ID as a string to reference the deleted user
		_id: { type: String, required: true }, 
		firstName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		lastName: {
			type: String,
			required: true,
			minlength: 2,
			maxlength: 50,
		},
		userName: {
			type: String,
			required: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			lowercase: true,
			maxlength: 50,
		},
		phoneNumber: {
			type: String, // Consistent with UserModel
			required: true,
		},
		invoices: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Invoice', // Reference to the Invoice model
			},
		],
	},
	{ timestamps: true }
);

const UsersArchives = mongoose.model('UsersArchives', UsersArchivesSchema);
export default UsersArchives;