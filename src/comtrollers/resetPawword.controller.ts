import { Request, Response} from 'express'
import { resetPasswordModel, IResetPassword } from '../models/resetPassword.model'
import bcrypt from 'bcrypt'
import { sendToken } from '../service/resetPassword.service'


// verify the reset password token when the user click the password reset link
export async function verifyResetPasswordToken( req: Request, res: Response) {
    
    const { resetToken } = req.params
    try{
        const user = await resetPasswordModel.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: { $gt: Date.now()}})

        if(!user){
            return res.status(400).send('Invalid or expires')
        }
        res.status(200).send('Token verified')

        }catch(e:any){
        console.error(e)
        res.status(500).send('Internal server error')
    }
}

// Sending OTP tot the Users
export async function sendOTP(req: Request, res: Response) {
   
    try {
        const { email } = req.params
        console.log('req.params:', email)
        await sendToken(email)
        res.send('OTP successfully sent')

    } catch (error: any) {
        if (error.Message === 'not found'){
            return res.status(404).json('user not found')
        } else {
            return res.status(500).json("internal server error")
        }
    }
}

// User enter a new password
export async function resetPassword( req: Request, res: Response){
   
    const { resetToken } = req.params
    const { password } = req.body
    try{
        const user = await resetPasswordModel.findOne({ resetPasswordToken: resetToken, resetPasswordExpires: {$gt:  Date.now()}})
        if (!user){
            return res.status(400).send('Invalid or expired token')
        }
        const hashedPassword = bcrypt.hashSync(password, 10)
        user.password = hashedPassword
        user.resetPasswordToken = undefined
        user.resetPasswordExpires = undefined
        await user.save()
    }catch(e: any){
        console.error(e)
        res.status(500).send('Internal server error')
    }
}