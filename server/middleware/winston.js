import winston from 'winston';
const { transports, format, createLogger } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

// Custom format for clean and readable logs
const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

// Helper function to create loggers without repeating code
const createScopedLogger = (folder) => {
    return createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }), // Capture stack trace if available
            customFormat
        ),
        transports: [
            // Error logs
            new transports.File({
                filename: 'errors.log',
                dirname: `logs/${folder}`,
                level: 'error',
            }),
            // Info logs
            new transports.File({
                filename: 'info.log',
                dirname: `logs/${folder}`,
                level: 'info',
            }),
            // Also log to console in development
            new transports.Console({
                format: combine(colorize(), customFormat)
            })
        ],
    });
};

// Exporting the exact same names so your existing code won't break
export const UserInfoLogger = createScopedLogger('user');
export const UserErrorLogger = UserInfoLogger; // Same logger handles both based on level

export const ProductInfoLogger = createScopedLogger('products');
export const ProductErrorLogger = ProductInfoLogger;

export const OrderInfoLogger = createScopedLogger('order');
export const OrderErrorLogger = OrderInfoLogger;

export const ResetPassInfoLogger = createScopedLogger('resetPass');
export const ResetPassErrorLogger = ResetPassInfoLogger;

export const CartInfoLogger = createScopedLogger('cart');
export const CartErrorLogger = CartInfoLogger;