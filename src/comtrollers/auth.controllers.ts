import { createToken } from '../util/jwt';
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser } from '../service/user.service'
import userModel from '../models/user.model';
import dotenv from 'dotenv'
import { sendWelcomeEmail } from '../util/email';
dotenv.config()


// USER REGISTER CONTROLLER......
export async function register(req: Request, res: Response) {

    const { userName, email, password, } = req.body;

    const newUser = new userModel({
        userName,
        email,
        password: bcrypt.hashSync(password, 1),

    })
    const user = await createUser(req.body)
    if (!user) {
        return res.status(404).json({
            message: "pls register a new user",
            status: false,
        })
    }
    else {
        sendWelcomeEmail(user.email, user.userName)

    // Generate a JWT token for the new user
        const token = createToken(user)
           return res.status(201).json({
         message: "User registered successfully", 
         email,
         UserActivation: "Account activation token sent proceed to activate your account"
         })
        }
   }

// USERLOGIN CONTROLLER

export async function userLogin(req: Request, res: Response) {

    const { email, password } = req.body

    const existingUser = await userModel.findOne({ email })
    if (!existingUser) {
        return res.status(404).json({
            message: "User with these credential does not exist",
            status: false,
        });

    } else {
       
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password)

        if (isPasswordValid == true) {
            const token = createToken({
                    id: existingUser._id,
                     email: existingUser.email
            })
            return res.status(200).json({
                token,
                message: "Login successfully",
                status: true,
                 role: existingUser
            });
        } else {
            return res.status(400).json({
                message: "Password is not correct",
                status: true,
            })
        }
    }
};

