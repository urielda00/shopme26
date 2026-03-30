import mongoose from 'mongoose';

const ResetTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, //reference the User model
            ref: 'User',
            required: [true, 'User ID is required'],
            unique: true,
        },
        token: { 
            type: String, 
            required: [true, 'Token is required'] 
        },
        expiresAt: { // Renamed to camelCase
            type: Date, 
            default: () => new Date(Date.now() + 15 * 60 * 1000), // Default to 15 minutes
            index: { expires: 0 } // TTL index: document will be deleted at this exact time
        },
    },
    { timestamps: true }
);

const ResetToken = mongoose.models.ResetToken || mongoose.model('ResetToken', ResetTokenSchema);
export default ResetToken;