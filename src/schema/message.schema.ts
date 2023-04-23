import joi from 'joi'

export const senderSchema = joi.object({
    from: joi.string().required(),
    to: joi.string().required(),
    content: joi.string().required()
})
