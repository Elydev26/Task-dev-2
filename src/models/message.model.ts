import mongoose, {Schema, Document} from 'mongoose'
import User from './user.model'

export interface IMessage extends Document {
    from : string
    to : string
    content: string
}

 const messageSchema: Schema = new mongoose.Schema({
    from: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    to: {
        type: mongoose.Schema.Types.ObjectId,
        requied: true,
        ref: 'User'
    },
    content: {
        type: String,
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema )

export default Message