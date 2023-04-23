import { Router } from 'express'
import { register, userLogin } from  '../comtrollers/auth.controllers'
import registerHandler from '../middlewares/register.middleware'
import loginHandler from '../middlewares/login.middleware'
import { validateSender } from '../middlewares/message.middleware'
import { message } from '../comtrollers/message.controller'
import { resetPasswordHandler } from '../middlewares/resetPassword.middleware'
import { sendResetPasswordEmail, resetPassword } from '../comtrollers/resetPawword.controller'

const router = Router()
// New and Existing check user route
router.post("/register", registerHandler,register)
router.post("/login", loginHandler, userLogin)

// Message sender route
router.post('/message/user', validateSender, message )

// Password reset route
router.post('/passwordreset/email/user', resetPasswordHandler, sendResetPasswordEmail )
router.post('/reset/password/user', resetPasswordHandler, resetPassword)

export default router