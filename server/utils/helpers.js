/**
 * Centralized pagination builder.
 * Standardizes query parameters and calculates database skip/limit.
 */
export const buildPagination = (query) => {
    // Ensure page is a minimum of 1
    const page = Math.max(Number(query.page) || 1, 1);
    
    // Cap limit between 1 and 50 to prevent excessive DB queries
    const limit = Math.min(Math.max(Number(query.limit || query.per_page) || 10, 1), 50);
    
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

/**
 * Standardized paged response formatter for API consistency.
 */
export const buildPagedResponse = ({ items, total, page, limit }) => ({
    success: true,
    items,
    pagination: {
        total,
        page,
        limit,
        // Calculate total pages based on item count
        totalPages: Math.max(Math.ceil(total / limit), 1),
        hasNextPage: page * limit < total,
    },
});

/**
 * Calculates item total in cents.
 * Used to prevent JavaScript floating-point precision issues with currency.
 */
export const calculateItemTotalInCents = (price, quantity) => {
    return Math.round((price || 0) * 100) * quantity;
};