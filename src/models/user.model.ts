import mongoose from "mongoose";
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

export interface IUser extends mongoose.Document {
    userName: string,
    password: string,
    email: string,
  }

const userSchema = new mongoose.Schema<IUser>({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
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


const User = mongoose.model('Users', userSchema)

export default User



