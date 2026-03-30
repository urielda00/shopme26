import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import fileupload from 'express-fileupload';

// 1. Load environment variables FIRST
dotenv.config();

// Routers imports
import cartRouter from './routes/cart.js';
import orderRouter from './routes/order.js';
import productRouter from './routes/products.js';
import userAuthRouter from './routes/userAuth.js';
import resetPassRouter from './routes/resetPass.js';

const app = express();
const port = process.env.PORT || 5000;

// 2. Security and Middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));
app.use(cors());
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ limit: '30mb', extended: true }));
app.use(cookieParser());
app.use(fileupload());

// 3. Static Files
app.use('/uploads', express.static('uploads'));

// 4. Routes
app.use('/auth', userAuthRouter);
app.use('/product', productRouter);
app.use('/order', orderRouter);
app.use('/resetPass', resetPassRouter);
app.use('/cart', cartRouter);

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    // In production, don't expose the stack trace to the client
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// 6. Database Connection logic using MONGO_URI
const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGO_URI;

        if (!mongoURI) {
            throw new Error('MONGO_URI is not defined in .env file');
        }
        
        await mongoose.connect(mongoURI);
        console.log('Successfully connected to MongoDB database');
        
        app.listen(port, () => {
            console.log(`Server is running on port: ${port}`);
        });
    } catch (error) {
        console.error(`Database Connection Error: ${error.message}`);
        // Exit process with failure if DB connection fails
        process.exit(1);
    }
};

// 7. Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.error(err);
    process.exit(1);
});

connectDB();