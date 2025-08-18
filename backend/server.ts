import express from 'express';
import bodyParser from 'body-parser';
import express_rate_limit from 'express-rate-limit';
import cors from 'cors'; // <-- Import cors
import { connectDB } from "../backend/config/database.ts";
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import mainRoute from './routes/mainRoute.ts';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, './config/.env') });

const app = express();
app.use(bodyParser.json());

// Use CORS middleware to allow cross-origin requests
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
}));


const limiter = express_rate_limit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    standardHeaders: true,
    legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use('/', mainRoute);

// --- Server Startup ---
const startServer = async () => {
    try {
        await connectDB();
        app.listen(process.env.PORT, () => {
            console.log(`Server is running and listening on port ${process.env.PORT}`);
        });
    } catch (err) {
        console.error("Failed to start server due to database connection error:", err);
        process.exit(1);
    }
};

startServer();