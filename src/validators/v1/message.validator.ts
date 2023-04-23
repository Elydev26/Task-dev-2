import Message, { IMessage } from '../../models/message.model';



export async function messageUser(userInput: IMessage) {
    try {
        let message = await Message.findOne({ forEmail: userInput.fromEmail })

        if (message)
            throw new Error("Email already exist")
        message = await Message.create(userInput)
        return (message.toJSON())
    }
    catch (error: any) {
        throw new Error(error)
    }
}
