import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// 1. Load environment variables FIRST
dotenv.config();

// Routers imports - Updated to match our new naming convention
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import resetPassRouter from './routes/resetPassRouter.js';
import adminRouter from './routes/adminRouter.js'; 

const app = express();
const port = process.env.PORT || 5000;

// 2. Security and Middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

// CORS setup for multiple origins
const allowedOrigins = process.env.CLIENT_URL ? process.env.CLIENT_URL.split(',').map(origin => origin.trim()) : [];
app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        
        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true // Required to allow cookies/sessions
}));

app.use(express.json({ limit: '10mb' })); // 10mb is usually enough for MERN
app.use(express.urlencoded({ limit: '10mb', extended: true }));
app.use(cookieParser());

// 3. Static Files
app.use('/uploads', express.static('uploads'));

// 4. Routes Integration
app.use('/api/auth', userRouter);
app.use('/api/product', productRouter);
app.use('/api/order', orderRouter);
app.use('/api/resetPass', resetPassRouter);
app.use('/api/cart', cartRouter);
 app.use('/api/admin', adminRouter);

// 5. Global Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    // In production, we hide the stack trace for security
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("--- GLOBAL ERROR CAUGHT ---");
    console.error(err.stack); // זה ידפיס בדיוק באיזו שורה הבעיה
    console.error("---------------------------");
    res.status(500).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
});

// 6. Database Connection logic
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