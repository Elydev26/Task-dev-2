import nodemailer from 'nodemailer'
import dotenv from 'dotenv'
import { USER_EMAIL, SERVICE, PASS } from '../config/config';
dotenv.config()

const transPort = nodemailer.createTransport({
    service: SERVICE,
    auth: {
        user: USER_EMAIL,
        pass: PASS
    }
})


export async function sendResetPasswordEmail(code: number, recievereMail: string, name: string) {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: recievereMail,
        subject: 'Password Reset Request',
        text: `Dear ${name}, your seven digit reset otp code is ${code}. code expires in 1 hour, do not disclose code to anyone`,
    };
    try {
        transPort.sendMail(mailOptions)
        console.log('email sent sccesfully')
    } catch (error: any) {
        throw new Error(error)

    }

}
export async function sendWelcomeEmail(recievereMail: string, name: string) {
    const mailOptions = {
        from: process.env.USER_EMAIL,
        to: recievereMail,
        subject: 'Welcome to our platform!',
        text: `Hello ${name}, nice having you here! `,
    };
    try {
        transPort.sendMail(mailOptions)
        console.log('email sent sccesfully')
    } catch (error: any) {
        throw new Error(error)

    }
}


