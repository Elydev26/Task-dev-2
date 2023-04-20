import express, {Request, Response} from 'express'
import Message from '../models/message.model'
import User from '../models/user.model'

export async function message(req: Request, res: Response) {
    try{
        const { fromEmail, toEmail} = req.query

        const fromUser = await User.findOne({email: fromEmail})
        const toUser = await User.findOne({email: toEmail})

        if(!fromUser || !toUser) {
            return res.status(400).json({error: 'Invalid user email(s) provided'})
        }

        const message = await Message.find({
            $or: [
                {
                    from: fromUser._id, to: toUser._id},
                    { from: toUser._id, to: fromUser._id}
            ],
        }).populate('from', 'name email').populate('to', 'name email')
        res.status(200).json({ message})

    }catch(error){
        console.error(error)
        res.status(500).json({ error: 'An error occurred while processing your request'})
    }
}
