/**
 * Global Error Handling Middleware.
 * Intercepts all errors passed through next() and standardizes the API error response format.
 * Ensures sensitive stack traces are not leaked in production environments.
 */
export const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    
    res.status(statusCode).json({
        success: false,
        message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
};