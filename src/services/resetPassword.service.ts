import mongoose from 'mongoose'
import { sendResetPasswordEmail } from '../util/email'
import resetPasswordModel from '../models/resePassword.model'
import User, {IUser} from '../models/user.model'
import { generateToken } from '../util/generateResetCode.util'

export async function sendToken( email: string) {
    console.log(email)
    const user = await User.findOne({email})
    console.log(user)

    if(!user) {
        throw new Error('invalid')
    }

    const resetToken = generateToken()
    const expired = new Date(Date.now() + 3600000)
    const resetPassword = {
        user: user._id,
        TokenCode: resetToken,
        expiredDate: expired 
    }

    try{

        resetPasswordModel.create(resetPassword)

        await sendResetPasswordEmail(resetToken, user.email, user.userName)
        console.log("successful")
    }
    catch(e:any){
        throw new Error(e)
    }
      
}


export async function resetPassword(
    { otpCode, password }:
        { otpCode: number, password: string },
    ID: string
) {

    if (!(mongoose.Types.ObjectId.isValid(ID))) throw new Error("object Id")

    const user = await User.findOne({ _id: ID })

    if (!user) throw new Error("not found")

    const resetPassword = await resetPasswordModel.findOne({ otpCode: otpCode, user: user._id })

    if (!resetPassword) throw new Error("Invalid otp code")

    if (resetPassword.expiredDate < new Date()) throw new Error("otp code expired")

    user.password = password;

    await user.save()

    console.log("new password:", user.password)

    const deletedPaswordModel = await resetPasswordModel.findOneAndDelete({ user: resetPassword.user })

    if (!deletedPaswordModel) return true;

}