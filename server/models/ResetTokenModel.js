import mongoose from 'mongoose';

/**
 * Reset Token Schema
 * Temporarily stores secure tokens for password recovery.
 * Implements a TTL (Time-To-Live) index to automatically remove the document from the database once the expiration time is reached.
 */
const ResetTokenSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: [true, 'User ID is required'],
            unique: true,
        },
        token: { 
            type: String, 
            required: [true, 'Token is required'] 
        },
        expiresAt: { 
            type: Date, 
            default: () => new Date(Date.now() + 15 * 60 * 1000), 
            index: { expires: 0 } 
        },
    },
    { timestamps: true }
);

const ResetToken = mongoose.models.ResetToken || mongoose.model('ResetToken', ResetTokenSchema);
export default ResetToken;