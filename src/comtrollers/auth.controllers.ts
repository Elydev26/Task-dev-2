import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { createUser, currentUser } from '../validators/v1/users.validator'
import userModel from '../models/user.model';
import dotenv from 'dotenv'
import { APP_SECRET } from '../config/config';
dotenv.config()


// USER REGISTER CONTROLLER......
export async function register(req: Request, res: Response) {

    // Validating users input
    const errors = createUser(req.body)

    const { userName, email, password, } = req.body;

    const newUser = new userModel({
        userName,
        email,
        password: bcrypt.hashSync(password, 1),

    })

    // Generate a JWT token for the new user
    const token =
        jwt.sign({ _id: newUser._id },
            APP_SECRET as string, {
            expiresIn: "1h",
            algorithm: "HS256"
        });
    res.status(201).json({ message: "User registered", token, UserActivation: "Account activation token sent proceed to activate your account" })
}


// USERLOGIN CONTROLLER

export async function userLogin(req: Request, res: Response) {

    const errors = currentUser(req.body)
    const { email, password } = req.body

    const existingUser = await userModel.findOne({ email })
    if (!existingUser) {
        return res.status(404).json({
            message: "User with these credential does not exist",
            status: false,
        });

    } else {
        console.log(password, existingUser);
        const isPasswordValid = bcrypt.compareSync(password, existingUser.password)

        if (isPasswordValid == true) {
            const token =
                jwt.sign({
                    id: existingUser._id,
                    email: existingUser.email
                },
                    APP_SECRET as string)
            return res.status(200).json({
                // token,
                message: "Login successfully",
                status: true,
                // role: existingUser
            });
        } else {
            return res.status(400).json({
                message: "Password is not correct",
                status: true,
            })
        }
    }
};

