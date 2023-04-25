import { Request, Response} from 'express'
import { resetPasswordModel, IResetPassword } from '../models/resePassword.model'
import bcrypt from 'bcrypt'
import { sendToken } from '../services/resetPassword.service'
import { error } from 'console'
import { json } from 'stream/consumers'


// // Create a reset password token and send a reset lonk to the User's email address

// const transporter = nodemailer.createTransport({
//     service : 'gmail',
//     auth: {
//         user: 'hadewunmi026@gmail.com',
//         pass: 'password111'
//     }
// })
// export async function sendResetPasswordEmail( req: Request, res: Response) {
//     const errors = resetPasswordUser(req.body)
//     const { id } = req.params

//     try{
//         const users = await userPassword.findOne({ id })

//         if(!users){
//             return res.status(400).send('PasswordReset not successful')
//         }

//         const resetToken = bcrypt.hashSync(users._id.toString(), 10)
//         users.resetPasswordToken = resetToken,
//         users.resetPasswordExpires as Date;  Date.now() + 3600000;
//         await users.save()

//         const resetLink = 
//         `https://yourapp.com/rest-password/${resetToken}`
//         const mailOptions = {
//             to: email,
//             subject: 'Your OTP to reset your Password',
//             content: 'Click the link below to reset your password'
//         }

//         await transporter.sendMail(mailOptions)

//     }catch(e:any){
//         console.error(e)
//         return res.status(500).send('Internal server error')
//     }

    
// }



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