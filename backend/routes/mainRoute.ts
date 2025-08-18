import express from "express";

import {getIndex} from '../controllers/mainController.ts';
import { chatResponse } from "../controllers/mainController.ts";
const router = express.Router();

// Export the router directly instead of a function that returns it
router.get('/', getIndex);
// To handle POST requests from the frontend
router.post("/api/chat", chatResponse);

// To handle GET requests, for example, to retrieve messages
// router.get("/api/chat", getMessages);

// Export the configured router instance
export default router;