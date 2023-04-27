import joi from 'joi'


export const userRegisterSchema: joi.Schema = joi.object({
    userName: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
    confirmPassword: joi.string().
        required().valid(joi.
            ref('password')).
        messages({ 'any.only': 'Password do not match' })

})

export const userloginSchema: joi.Schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required()

})

export default userRegisterSchema