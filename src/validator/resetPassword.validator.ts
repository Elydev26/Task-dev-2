import joi from 'joi'

export const resetpasswordSchema = joi.object({
    password: joi.string().required(),
    resetToken: joi.number().min(10000).max(99999).required()
})