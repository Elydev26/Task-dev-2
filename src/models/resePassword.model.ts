import mongoose, { Schema, model, Document } from "mongoose";

export interface UsersDocument extends Document {
    email: string 
    password: string 
    resetPasswordToken?: string
    resetPasswordExpires?: Date
}

const usersSchema: Schema = new Schema ({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    email: {
        type: String,
        required: true,
        unique: true
     },
     password: {
        type : String, 
        required: true,
     },
    resetPasswordToken: {type: String},
    resetPasswordExpires:{type: Date} 
    
})

export const Users = model<UsersDocument>('Users', usersSchema )