import mongoose, {Schema, Document} from 'mongoose'


export interface IMessage extends Document {
    fromEmail : string
    toEmail : string
    content: string
}

 const messageSchema: Schema = new mongoose.Schema({
    fromEmail: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    toEmail: {
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