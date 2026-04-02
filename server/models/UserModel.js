import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        lastName: {
            type: String,
            required: true,
            minlength: 2,
            maxlength: 50,
            trim: true,
        },
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            maxlength: 50,
            trim: true,
        },
        password: {
            type: String,
            required: true,
            minlength: 5,
        },
        phoneNumber: {
            type: String,
            required: true,
        },
        avatar: {
            type: String,
            default: '',
        },
        isAdmin: {
            type: Boolean,
            default: false,
            index: true,
        },
        orders: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Order',
            },
        ],
    },
    { timestamps: true }
);

const User = mongoose.models.User || mongoose.model('User', UserSchema);
export default User;