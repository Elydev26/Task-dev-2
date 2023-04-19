import { Request, Response, NextFunction } from 'express'
import joi, { string } from 'joi'
import userRegisterSchema from '../schema/user.schema'


//   const registerHandler = (userSchema: joi.Schema) => (req: Request, res: Response, next: NextFunction) =>{

//     const { error } = userSchema.validate(req.body)

//     if(error) return res.status(400).send(error.details[0].message)

//     next()
// }

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    const { error } = req.body
    try {
        await userRegisterSchema.validateAsync(req.body)
        next()

    } catch (error: any) {
        res.status(400).json({ error: error.details[0].message })
    }
}


export default registerHandler