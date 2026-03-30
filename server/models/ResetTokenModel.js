import mongoose from 'mongoose';

const ResetTokenSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: 'User',
			required: true,
			unique: true,
		},
		token: { 
			type: String, 
			required: true 
		},
		// TTL Index: Automatically deletes the document after 2 minutes
		expire_at: { 
			type: Date, 
			default: Date.now, 
			expires: 120 // 120 seconds = 2 minutes
		},
	},
	{ timestamps: true }
);

const ResetToken = mongoose.model('ResetToken', ResetTokenSchema);
export default ResetToken;