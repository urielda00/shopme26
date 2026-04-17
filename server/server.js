import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// Initialize environment variables before any other module imports to ensure availability
dotenv.config();

import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import resetPassRouter from './routes/resetPassRouter.js';
import adminRouter from './routes/adminRouter.js'; 

import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;

// Trust proxy required for secure cookie configuration when running behind reverse proxies (e.g., Nginx, render)
app.set('trust proxy', 1);

// Apply standard security headers
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));

// HTTP request logging for monitoring
app.use(morgan('common'));

// Dynamic CORS configuration to support multiple environments
const allowedOrigins = process.env.CLIENT_URL 
    ? process.env.CLIENT_URL.split(',').map(origin => origin.trim().replace(/\/+$/, '')) 
    : [];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    // Allow cookies to be sent across origins
    credentials: true 
}));

// Body parsers with payload limits to prevent DOS attacks via large payloads
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// Serve uploaded assets statically
app.use('/uploads', express.static('uploads'));

// Mount application routes
app.use('/api/auth', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/resetPass', resetPassRouter);
app.use('/api/cart', cartRouter);
app.use('/api/admin', adminRouter);

// Centralized error handling pipeline
app.use(errorHandler);

// Database initialization and server startup
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
        // Fail fast if DB connection fails
        process.exit(1); 
    }
};

// Catch asynchronous exceptions outside of express routes to prevent silent crashes
process.on('unhandledRejection', (err) => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.error(err);
    process.exit(1);
});

connectDB();