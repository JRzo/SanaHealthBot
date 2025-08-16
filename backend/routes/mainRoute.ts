import express from "express";

import {getIndex} from '../controllers/mainController.ts';
const router = express.Router();

// main route to get the Sana
export const mainRoute = () =>{

    router.get('/', getIndex);
    console.log("Insane")
}