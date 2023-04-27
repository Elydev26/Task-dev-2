import userModel, { IUser } from '../models/user.model'
import bcrypt from 'bcrypt'


export async function createUser(userInput: IUser) {
    try {
        let user = await userModel.findOne({ email: userInput.email })

        if (user)
            throw new Error("Email already exist")
        user = await userModel.create(userInput)
        return (user.toJSON())
    }
    catch (error: any) {
        throw new Error(error)
    }
}

export async function comparePassword(inputPassword: string, comparePassword: string): Promise<boolean> {
    return await bcrypt.compareSync(inputPassword, comparePassword ) 
}






