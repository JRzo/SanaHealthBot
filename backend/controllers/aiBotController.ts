import { Request, Response } from 'express';
import mongoose from 'mongoose'
import openAI from 'openai'
export const postAIChatBot = async (req: Request, res: Response) =>{
    let values = req.body;
    console.log(values + "Chat");
    try{
        const openai = new openAI({
            apiKey: process.env.API_KEY
        })

        const completion = await openai.chat.completions.create({
            model: "gpt-4",
            messages: [{
                role: "assistant",
                content: values.response + ". What should I do?"
            }]
        })

        let response = completion.choices;
        console.log(response);
    }
    catch(err){
        console.log(err);
    }
}