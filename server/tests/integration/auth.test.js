import { jest } from '@jest/globals';
import request from 'supertest';
import express from 'express';
import userRouter from '../../routes/userRouter.js';
import User from '../../models/UserModel.js';
import { errorHandler } from '../../middleware/errorHandler.js';
import { connectDBForTesting, disconnectDBForTesting, clearDBForTesting } from '../setup/db.js';

// Setup an isolated Express app for testing
const app = express();
app.use(express.json());
app.use('/api/auth', userRouter);
app.use(errorHandler); // Attach global error handler

// Mock Winston loggers to prevent cluttering the test console output
jest.mock('../../middleware/winston.js', () => ({
    UserInfoLogger: { info: jest.fn(), error: jest.fn() },
    UserErrorLogger: { info: jest.fn(), error: jest.fn() }
}));

describe('Auth API Integration Tests', () => {
    
    // Lifecycle hooks for the mock database
    beforeAll(async () => await connectDBForTesting());
    afterEach(async () => await clearDBForTesting());
    afterAll(async () => await disconnectDBForTesting());

    describe('POST /api/auth/register', () => {
        
        const validUserPayload = {
            firstName: 'John',
            lastName: 'Doe',
            userName: 'johndoe123',
            email: 'john@example.com',
            password: 'password123',
            verifyPass: 'password123', // required by your express-validator
            phoneNumber: '0501234567'
        };

        it('should register a new user successfully and return 201', async () => {
            const response = await request(app)
                .post('/api/auth/register')
                .send(validUserPayload);

            // Assert API Response
            expect(response.status).toBe(201);
            expect(response.body.success).toBe(true);
            expect(response.body.message).toBe('User created successfully');

            // Assert Database State
            const userInDb = await User.findOne({ email: validUserPayload.email });
            expect(userInDb).toBeTruthy();
            expect(userInDb.userName).toBe(validUserPayload.userName);
            // Ensure password was hashed and not saved as plain text
            expect(userInDb.password).not.toBe(validUserPayload.password); 
        });

        it('should return 409 if email already exists', async () => {
            // Pre-populate DB with a user
            await request(app).post('/api/auth/register').send(validUserPayload);

            // Try to register again with the same payload
            const response = await request(app)
                .post('/api/auth/register')
                .send(validUserPayload);

            expect(response.status).toBe(409);
            expect(response.body.success).toBe(false);
            expect(response.body.message).toMatch(/already exists/i);
        });

        it('should return 422 if validation fails (e.g., mismatched passwords)', async () => {
            const invalidPayload = {
                ...validUserPayload,
                verifyPass: 'wrongpassword' // Mismatch
            };

            const response = await request(app)
                .post('/api/auth/register')
                .send(invalidPayload);

            expect(response.status).toBe(422);
            expect(response.body.success).toBe(false);
            expect(response.body.errors).toContain('Passwords do not match');
        });
    });
});