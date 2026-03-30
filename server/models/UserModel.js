import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
	{
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
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			lowercase: true,
			maxlength: 50,
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
		orders: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'Order', // Proper relationship linking
			},
		],
		avatar: {
			type: String,
			default: '',
		},
	},
	{ timestamps: true }
);

const User = mongoose.model('User', UserSchema);
export default User;