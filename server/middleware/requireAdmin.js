import User from '../models/UserModel.js';
import { UserErrorLogger } from './winston.js';

/**
 * Authorization middleware for administrative routes.
 * Verifies the authenticated user's role against the database to ensure admin privileges.
 */
export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.user?.id) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required',
            });
        }

        const user = await User.findById(req.user.id).select('isAdmin');

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'User not found',
            });
        }

        if (!user.isAdmin) {
            UserErrorLogger.error(`Forbidden admin access attempt by user ${req.user.id}`);

            return res.status(403).json({
                success: false,
                message: 'Admin access only',
            });
        }

        next();
    } catch (error) {
        next(error);
    }
};