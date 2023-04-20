import { NextFunction, Request , Response} from 'express'
import { senderSchema } from '../schema/message.schema'

export async function validateSender(req: Request, res: Response, next: NextFunction) {
    const sender = req.body
    const { error } = senderSchema.validate(sender)

    if(error) {
        return res.status(400).json({ message: error.details[0].message})
    }
}