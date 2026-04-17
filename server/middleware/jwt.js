import jwt from 'jsonwebtoken';
import { UserErrorLogger } from './winston.js';

/**
 * Middleware to verify JWT authentication.
 * Extracts the token from cookies or authorization headers, validates its signature,
 * and attaches the decoded user context to the request object for downstream use.
 */
export const checkJWT = async (req, res, next) => {
    const token = req.cookies.session_token || req.headers.authorization?.split(' ')[1];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: 'No token provided',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_ACCESS_KEY);

        req.user = {
            id: decoded.id,
            userName: decoded.userName,
            isAdmin: decoded.isAdmin,
        };

        next();
    } catch (error) {
        UserErrorLogger.error(`Invalid token attempt: ${error.message}`);

        return res.status(401).json({
            success: false,
            message: 'Invalid or expired token',
        });
    }
};