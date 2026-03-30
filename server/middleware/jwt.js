import jwt from 'jsonwebtoken';
import { UserErrorLogger } from './winston.js';

export const checkJWT = async (req, res, next) => {
    const token = req.cookies.session_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ success: false, message: 'No token provided' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        // Log the security event
        UserErrorLogger.error(`Invalid token attempt: ${error.message}`);
        return res.status(401).json({ success: false, message: 'Invalid or expired token' });
    }
};