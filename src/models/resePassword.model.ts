import { number } from "joi";
import mongoose, { Schema, model, Document } from "mongoose";

export interface IResetPassword extends Document {
    user: mongoose.Types.ObjectId
    resetToken: number
    resetPasswordExpires: Date
}

const usersSchema: Schema = new mongoose.Schema<IResetPassword> ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resetToken: Number,
    resetPasswordExpires: Date
    
})

export const resetPasswordModel = mongoose.model('resetPassword', usersSchema )

export default resetPasswordModel