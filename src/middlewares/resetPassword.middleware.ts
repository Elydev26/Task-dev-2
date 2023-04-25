import { Request, Response, NextFunction } from 'express'
import { ValidationResult } from 'joi'
import { resetpasswordSchema } from '../schema/resetPassword.schema'


export const resetPasswordHandler = async ( req: Request, res: Response, next: NextFunction) => {
    const { error}: ValidationResult = resetpasswordSchema.validate(req.body)

    if(error){
        const errors = error.details.map((err) => err.message)
        return res.status(400).json({errors})
    }
    return next()

}





