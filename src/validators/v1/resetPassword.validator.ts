import { userPassword, IUsers } from '../../models/resePassword.model';


export async function resetPasswordUser(userInput: IUsers) {
    try {
        let user = await userPassword.findOne({ email: userInput.email })

        if (user)
            throw new Error("Email already exist")
        user = await userPassword.create(userInput)
        return (user.toJSON())
    }
    catch (error: any) {
        throw new Error(error)
    }
}

