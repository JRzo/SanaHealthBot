import mongoose from "mongoose";

const {Schema} = mongoose;

export const userResponse = new Schema({
    response: {
        type: String,
        require
    },
    date: {
        type: Date,
        default: Date.now()
    }
})