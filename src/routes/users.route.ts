import { Router } from 'express'
import { register, userLogin } from  '../comtrollers/auth.controllers'
import registerHandler from '../middlewares/register.middleware'
import loginHandler from '../middlewares/login.middleware'
import { resetPasswordHandler } from '../middlewares/resetPassword.middleware'
import { resetPassword, sendOTP } from '../comtrollers/resetPawword.controller'

const router = Router()
// New and Existing check user route
router.post("/register", registerHandler,register)
router.post("/login", loginHandler, userLogin)

// Password reset route
router.post('/OTP/user/:email', sendOTP )
router.post('/reset/password/user/:id', resetPasswordHandler, resetPassword)

export default router