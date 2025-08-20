import { Request, Response } from 'express';
import mongoose from 'mongoose'

import { UserResponse } from '../models/userResponsesModel.ts';

export const getIndex = async (req: Request, res:Response) =>{
    res.redirect('/')
    console.log("Insane")

}

export const get

export const chatResponse = async(req: Request, res: Response) =>{
    console.log("We are chatting");
    console.log(req.body); // Log the request body first

    const {response, data} = req.body;
    if(!response){
        return res.status(200).json({message: "Missing response from the user"});
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
        console.error(err);
    }

    res.send({ message: "Received your response successfully!" });
}