/**
 * Centralized pagination builder to ensure consistency across controllers.
 * Supports both 'limit' and 'per_page' query parameters.
 */
export const buildPagination = (query) => {
    const page = Math.max(Number(query.page) || 1, 1);
    const limit = Math.min(Math.max(Number(query.limit || query.per_page) || 10, 1), 50);
    const skip = (page - 1) * limit;

    return { page, limit, skip };
};

/**
 * Standardized paged response formatter.
 */
export const buildPagedResponse = ({ items, total, page, limit }) => ({
    success: true,
    items,
    pagination: {
        total,
        page,
        limit,
        totalPages: Math.max(Math.ceil(total / limit), 1),
        hasNextPage: page * limit < total,
    },
});

/**
 * Helper to calculate item total in cents to prevent JS floating point precision issues.
 */
export const calculateItemTotalInCents = (price, quantity) => {
    return Math.round((price || 0) * 100) * quantity;
};