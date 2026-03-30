export const logError = (error: unknown, context: string): void => {
    // Only log errors when running locally, not in production
    if (import.meta.env.MODE === 'development') {
        const messagePrefix = `[Error in ${context}]: `;
        
        if (error instanceof Error) {
            console.error(messagePrefix, error.message);
        } else {
            console.error(messagePrefix, error);
        }
    }
};