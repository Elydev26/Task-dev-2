import {Request,Response,NextFunction} from 'express'
import joi from 'joi'

const validateReq = (userSchema: joi.Schema) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await userSchema.validateAsync(req.body);
    next();
  } catch (error:any) {
    if (error.isJoi) {
      res.status(400).send(error.details[0].message)
    } else {
      res.status(400).send(error.local.message)
    }
  }
};

export default validateReq