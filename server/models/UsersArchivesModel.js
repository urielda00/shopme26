import mongoose from 'mongoose';

/**
 * Users Archives Schema
 * Preserves critical data of deleted accounts for historical and legal purposes.
 * Stores the original MongoDB ObjectId as a string to prevent auto-generation of a new ID, maintaining referential integrity with past records.
 */
const UsersArchivesSchema = new mongoose.Schema(
	{
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
			type: String, 
			required: true,
		},
		invoices: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Invoice', 
			},
		],
	},
	{ timestamps: true }
);

const UsersArchives = mongoose.model('UsersArchives', UsersArchivesSchema);
export default UsersArchives;