import winston from 'winston';
const { transports, format, createLogger } = winston;
const { combine, timestamp, printf, colorize, errors } = format;

/**
 * Defines a standardized log format including timestamps, log levels, and stack traces.
 */
const customFormat = printf(({ level, message, timestamp, stack }) => {
    return `${timestamp} [${level}]: ${stack || message}`;
});

/**
 * Factory function to generate module-specific loggers.
 * Routes errors and info logs to dedicated files within scoped directories, 
 * while continuing to output to the console for local development.
 */
const createScopedLogger = (folder) => {
    return createLogger({
        format: combine(
            timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
            errors({ stack: true }), 
            customFormat
        ),
        transports: [
            new transports.File({
                filename: 'errors.log',
                dirname: `logs/${folder}`,
                level: 'error',
            }),
            new transports.File({
                filename: 'info.log',
                dirname: `logs/${folder}`,
                level: 'info',
            }),
            new transports.Console({
                format: combine(colorize(), customFormat)
            })
        ],
    });
};

export const UserInfoLogger = createScopedLogger('user');
export const UserErrorLogger = UserInfoLogger; 

export const ProductInfoLogger = createScopedLogger('products');
export const ProductErrorLogger = ProductInfoLogger;

export const OrderInfoLogger = createScopedLogger('order');
export const OrderErrorLogger = OrderInfoLogger;

export const ResetPassInfoLogger = createScopedLogger('resetPass');
export const ResetPassErrorLogger = ResetPassInfoLogger;

export const CartInfoLogger = createScopedLogger('cart');
export const CartErrorLogger = CartInfoLogger;