import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/UserModel.js';
import Cart from '../models/CartModel.js';
import UsersArchives from '../models/UsersArchivesModel.js';
import { UserErrorLogger, UserInfoLogger } from '../middleware/winston.js';

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { firstName, lastName, userName, email, password, phoneNumber, avatar } = req.body;

        // Optimized: Single DB call to check both email and username
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            return res.status(409).json({ message: 'User with this email or username already exists' });
        }

        // Hashing password
        const salt = await bcrypt.genSalt(10);
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email,
            avatar,
            lastName,
            userName,
            firstName,
            phoneNumber,
            password: passwordHash,
        });

        await newUser.save();

        UserInfoLogger.info(`User created: ${userName}`);
        res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        next(error); // Pass to global error handler
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { userName, password } = req.body;

        // Find user and check if they exist
        const user = await User.findOne({ userName });
        if (!user) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare password (Async version is better for performance)
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Fetch cart details if exists
        const userCart = await Cart.findOne({ userId: user._id });
        
        // JWT Generation
        const token = jwt.sign({ id: user._id }, process.env.JWT_ACCESS_KEY, { expiresIn: '1h' });

        // Set Cookie and respond
        res.cookie('session_token', token, {
            httpOnly: true, // Security: Prevents XSS access to cookie
            secure: process.env.NODE_ENV === 'production',
            maxAge: 3600000 // 1 hour
        });

        UserInfoLogger.info(`User logged in: ${userName}`);
        
        res.status(200).json({
            user_id: user._id,
            userName: user.userName,
            isAdmin: user.isAdmin || false, // Assuming isAdmin is in the model
            cart: userCart ? userCart.products : [],
            totalPrice: userCart ? userCart.totalPrice : 0,
            totalQuantity: userCart ? userCart.totalItemsInCart : 0,
            message: 'Login successful'
        });
    } catch (error) {
        next(error);
    }
};

// UPDATE USER INFO
export const updateUserInfo = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true }).select('-password');
        
        if (!updatedUser) return res.status(404).json({ message: 'User not found' });

        UserInfoLogger.info(`User info updated: ${id}`);
        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
};

// UPDATE PASSWORD
export const updateUserPass = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password, insertPrePassword } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(insertPrePassword, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Incorrect current password' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);
        await user.save();

        UserInfoLogger.info(`Password updated for user: ${id}`);
        res.status(200).json({ message: 'Password updated successfully' });
    } catch (error) {
        next(error);
    }
};

// DELETE USER
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { password } = req.body;

        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: 'Unauthorized: Wrong password' });

        // Archive before deletion
        const archivedUser = new UsersArchives({
            _id: user._id,
            email: user.email,
            lastName: user.lastName,
            userName: user.userName,
            firstName: user.firstName,
            phoneNumber: user.phoneNumber,
        });

        await archivedUser.save();
        await User.findByIdAndDelete(id);

        UserInfoLogger.info(`User deleted and archived: ${id}`);
        res.clearCookie('session_token').status(200).json({ message: 'User deleted and archived successfully' });
    } catch (error) {
        next(error);
    }
};

// Quick check if email or username is taken
export const checkIfExist = async (req, res, next) => {
    try {
        const { data } = req.params;
        const user = await User.findOne({ $or: [{ email: data }, { userName: data }] });
        res.status(200).json({ exists: !!user });
    } catch (error) {
        next(error);
    }
};