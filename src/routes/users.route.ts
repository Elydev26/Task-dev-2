import { Router } from 'express'
import { register, userLogin } from  '../comtrollers/auth.controllers'
import { resetPasswordHandler } from '../middlewares/resetPassword.middleware'
import { resetPassword, sendOTP } from '../comtrollers/resetPawword.controller'
import validateReq from '../middlewares/validate.middleware'
import userRegisterSchema, { userloginSchema } from '../validator/user.validator'

const router = Router()
// New and Existing check user route
router.post("/register", validateReq(userRegisterSchema),register)
router.post("/login", validateReq(userloginSchema), userLogin)

// Password reset route
router.post('/OTP/user/:email', sendOTP )
router.post('/reset/password/user/:id', resetPasswordHandler, resetPassword)

export default router