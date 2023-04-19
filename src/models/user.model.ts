import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
import { saltFactor } from '../config/config';
dotenv.config()

export interface IUser extends mongoose.Document {
    userName: string,
    password: string,
    email: string,
    comparePassword(password: string): Promise<Boolean>
}

const userSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

userSchema.pre<IUser>('save', async function (next) {
    if (!this.isModified('password')) {
        return next()
    }
    const saltFactor = 10
    const salt = await bcrypt.genSalt(saltFactor as number)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})

userSchema.methods.comparePassword = async function (inputPassword: string): Promise<Boolean> {
    console.log(this.password)
    const isValid = await bcrypt.compare(inputPassword, this.password)
    return isValid
}


const User = mongoose.model('Users', userSchema)

export default User



