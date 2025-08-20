import mongoose from 'mongoose';
import dotenv from 'dotenv';


export const connectDB = async () => {
    dotenv.config();
    try {
        const uri: string = process.env.DB_STRING as string;
        console.log(process.env.DB_STRING)

        if (!uri) {
            throw new Error('DB_STRING is not defined in environment variables.');
        }

        // Corrected line: Use mongoose.connect() to establish the default connection
        await mongoose.connect(uri);
        console.log('MongoDB connected successfully!');
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1); // Exit process with failure
    }
};