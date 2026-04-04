import { buildPagination, calculateItemTotalInCents } from '../../utils/helpers.js';

describe('Utility Helpers', () => {
    
    describe('buildPagination', () => {
        it('should return default values when no query params are provided', () => {
            const query = {};
            const result = buildPagination(query);
            
            expect(result.page).toBe(1);
            expect(result.limit).toBe(10);
            expect(result.skip).toBe(0);
        });

        it('should parse page and limit correctly', () => {
            const query = { page: '3', limit: '20' };
            const result = buildPagination(query);
            
            expect(result.page).toBe(3);
            expect(result.limit).toBe(20);
            expect(result.skip).toBe(40); // (3 - 1) * 20
        });

        it('should cap the limit at 50 to prevent massive database queries', () => {
            const query = { limit: '1000' };
            const result = buildPagination(query);
            
            expect(result.limit).toBe(50); // Maximum allowed
        });
    });

    describe('calculateItemTotalInCents', () => {
        it('should correctly calculate the total in cents and avoid floating point errors', () => {
            // In normal JS: 19.99 * 3 = 59.96999999999999
            const price = 19.99;
            const quantity = 3;
            
            const result = calculateItemTotalInCents(price, quantity);
            
            expect(result).toBe(5997); // 59.97 * 100 exactly
        });

        it('should handle zero or missing price safely', () => {
            expect(calculateItemTotalInCents(0, 5)).toBe(0);
            expect(calculateItemTotalInCents(null, 2)).toBe(0);
        });
    });
});