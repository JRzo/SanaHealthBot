import express from "express";

import {getIndex} from '../controllers/mainController.ts';
import { chatResponse } from "../controllers/mainController.ts";
import { getResponses } from "../controllers/mainController.ts";
import { postAIChatBot } from "../controllers/aiBotController.ts";
const router = express.Router();

// Export the router directly instead of a function that returns it
router.get('/', getIndex);

// Corrected line: Remove "/api"
router.post("/chat", chatResponse);
router.get("/chat", getResponses );
router.post("/chatBot", postAIChatBot);

// Export the configured router instance
export default router;