import express from 'express';
import bodyParser from 'body-parser';
import express_rate_limit from 'express-rate-limit';
import { connectDB } from "../backend/config/database.ts";
import mongoose from 'mongoose';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Replicate __dirname and __filename for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables with an explicit path to the .env file.
// This is the most reliable method for Node.js ES Modules.
dotenv.config({ path: path.resolve(__dirname, './config/.env') });

const app = express();
app.use(bodyParser.json());

const limiter = express_rate_limit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);

// --- Server Startup ---
const startServer = async () => {
  try {
    // Connect to the database first to ensure it's ready.
    await connectDB();

    // Only start listening for requests after the database is connected.
    app.listen(process.env.PORT, () => {
      console.log(`Server is running and listening on port ${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to start server due to database connection error:", err);
    process.exit(1);
  }
};

// Call the startup function to run the application.
startServer();
