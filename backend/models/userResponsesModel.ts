import mongoose, {Schema, Document} from "mongoose";

export interface IUserResponse extends Document{
    response: string,
    date?: Date
}
const userResponse: Schema = new Schema({
    response: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

export const UserResponse = mongoose.model<IUserResponse>("UserResponse", userResponse);