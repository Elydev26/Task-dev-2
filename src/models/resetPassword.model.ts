import mongoose, { Schema, Document } from "mongoose";
 

export interface IResetPassword extends Document {
    user: mongoose.Types.ObjectId
    resetToken: number
    resetPasswordExpires: Date
}

const resetpasswordSchema: Schema = new mongoose.Schema<IResetPassword> ({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    resetToken: Number,
    resetPasswordExpires: Date
    
})

export const resetPasswordModel = mongoose.model('resetPassword', resetpasswordSchema )

export default resetPasswordModel