import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

// 1. Load environment variables FIRST
dotenv.config();

// Routers imports
import cartRouter from './routes/cartRouter.js';
import orderRouter from './routes/orderRouter.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRouter.js';
import resetPassRouter from './routes/resetPassRouter.js';
import adminRouter from './routes/adminRouter.js'; 

// Error handler import
import { errorHandler } from './middleware/errorHandler.js';

const app = express();
const port = process.env.PORT || 5000;
app.set('trust proxy', 1);

// 2. Security and Middlewares
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(morgan('common'));

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
    credentials: true
}));

app.use(express.json({ limit: '10mb' }));
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
app.use(errorHandler);

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