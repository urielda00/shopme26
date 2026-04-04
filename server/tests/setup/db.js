import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer;

/**
 * Connect to the in-memory database.
 * Run this before all tests.
 */
export const connectDBForTesting = async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();
    
    await mongoose.connect(uri);
};

/**
 * Drop database, close the connection and stop mongod.
 * Run this after all tests are finished.
 */
export const disconnectDBForTesting = async () => {
    if (mongoose.connection.readyState !== 0) {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    }
    if (mongoServer) {
        await mongoServer.stop();
    }
};

/**
 * Remove all documents from all collections.
 * Run this after each individual test to ensure test isolation.
 */
export const clearDBForTesting = async () => {
    const collections = mongoose.connection.collections;
    
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany();
    }
};