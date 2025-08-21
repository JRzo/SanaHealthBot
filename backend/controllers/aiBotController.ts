import { Request, Response } from 'express';
import mongoose from 'mongoose'

export const postAIChatBot = async (req: Request, res: Response) =>{
    let values = req.body;
    console.log(values);
    try{
        const openAI = new openAI({
            api: "KEY GOES HERE"
        })
    }
    catch(err){
        console.log(err);
    }
}