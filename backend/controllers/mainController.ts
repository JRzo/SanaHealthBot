import { Request, Response } from 'express';
import mongoose from 'mongoose'

import { UserResponse } from '../models/userResponsesModel.ts';

export const getIndex = async (req: Request, res:Response) =>{
    res.redirect('/')
}

export const getResponses  = async (req: Request, res: Response) => {
    let allResponses = await UserResponse.find();
    res.status(201).json({
        message: allResponses
    })

    console.log('Done');
}

export const chatResponse = async(req: Request, res: Response) =>{
    console.log("We are chatting");
    console.log(req.body); // Log the request body first

    const {response, data} = req.body;
    if(!response){
        return res.status(400).json({message: "Missing response from the user"});
    }

    try{
        // Need to export the responses   
        const newResponse = new UserResponse({
            response: response
        })

        await newResponse.save();
        return res.status(201).json({
            message: "Response saved successfully",
            data: newResponse
        })
        
    }
    catch(err){
        console.error("Error saving user response:", err);
        // Send a 500 Internal Server Error status for a database error.
        return res.status(500).json({
            message: "Failed to save response",
            error: err
        });
    }

    res.send({ message: "Received your response successfully!" });
}