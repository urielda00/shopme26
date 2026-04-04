/**
 * Global Error Handling Middleware
 * Catches all errors passed via next(error) and formats a standard JSON response.
 */
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message,
        // Hide stack trace in production for security
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};