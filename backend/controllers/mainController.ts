import { Request, Response } from 'express';
import mongoose from 'mongoose';
import openAI from 'openai';
import { UserResponse } from '../models/userResponsesModel.ts';

export const getIndex = async (req: Request, res: Response) => {
    // This function can be used for a simple redirect or to serve a homepage
    res.redirect('/');
};

export const getResponses = async (req: Request, res: Response) => {
    // SECURITY FIX: The 'getResponses' endpoint should only return conversations for a specific user.
    // It's a major vulnerability to expose all conversations.
    try {
        const { userId } = req.query; // Get userId from the request query

        if (!userId) {
            return res.status(400).json({
                message: "A userId is required to retrieve responses."
            });
        }

        const allResponses = await UserResponse.find({ user: userId });
        return res.status(200).json({
            message: "Successfully retrieved all responses for the user",
            data: allResponses
        });
    } catch (err) {
        console.error("Error retrieving responses:", err);
        return res.status(500).json({
            message: "Failed to retrieve responses",
            error: err
        });
    }
};

export const chatResponse = async (req: Request, res: Response) => {
    console.log("Received a chat request.");
    const { response, userId } = req.body;

    if (!response) {
        return res.status(400).json({ message: "Missing response from the user." });
    }


    try {
        // --- 1. Retrieve the full conversation history from the database ---
        const conversationHistory = await UserResponse.find({ user: userId || 'anonymous' }).sort({ timestamp: 1 });
        
        // --- 2. Build the message array for the OpenAI API call ---
        const messages: openAI.ChatCompletionMessageParam[] = [];

        // Add a system message to instruct the bot on its behavior and tone.
        messages.push({
            role: "system",
            content: "You are a friendly, concise, and helpful health bot named Sana. Always provide short responses that are easy to understand. Never give a full diagnosis or claim to be a doctor. Always end your response with a disclaimer advising the user to consult a healthcare professional. Keep the response to no more than 3-4 sentences."
        });

        conversationHistory.forEach(item => {
            messages.push({
                role: "assistant",
                content: item.response
            });
        });

        // Add the current user message to the conversation
        messages.push({
            role: "user",
            content: response
        });
        
        // --- 3. Save the current user's message to the database ---
        const newUserResponse = new UserResponse({
            user: userId || 'anonymous',
            response: response
        });
        await newUserResponse.save();
        console.log("User response saved to database.");

        // --- 4. Call the OpenAI API with the full conversation history ---
        // CRITICAL FIX: Ensure API key is present before making the call.
        if (!(process.env.API_KEY)) {
            console.error("Error: OpenAI API key is not set. Please check your .env file and endpoints configuration.");
            return res.status(500).json({ message: "OpenAI API key is missing." });
        }
        
        const openai = new openAI({ apiKey: process.env.API_KEY });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages
        });

        // Extract the AI's response content, with a fallback
        const aiResponseContent = completion.choices[0]?.message?.content || "Sorry, I'm unable to help with that right now. Please consult a healthcare professional.";

        // --- 5. Save the AI's response to the database ---
        const newAIResponse = new UserResponse({
            user: 'Sana',
            response: aiResponseContent
        });
        await newAIResponse.save();

        // --- 6. Send the final response back to the frontend ---
        return res.status(200).json({
            message: "Response processed successfully.",
            aiResponse: aiResponseContent,
            data: { userMessage: newUserResponse, botMessage: newAIResponse }
        });
    } catch (err) {
        console.error("Error in chat response processing:", err);
        return res.status(500).json({
            message: "An unexpected error occurred while processing your request.",
            error: err
        });
    }
};
