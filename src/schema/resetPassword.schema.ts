import joi from 'joi'
import  Validator  from 'validator'
import { UsersDocument } from '../models/resePassword.model'


export const resetpasswordSchema = joi.object({
    userId: joi.string().custom((value, helpers) => {
        if (!Validator.isMongoId(value)) {
            return helpers.error('any.invalid')
        }
        return value
    }, 'MongoDb ObjectID'),
    email: joi.string().email().required(),
    password: joi.string().required(),
    resetPasswordToken: joi.string(),
    resetPasswordExpires: joi.date()
})