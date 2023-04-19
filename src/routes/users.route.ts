import { Router } from 'express'
import { register, userLogin } from  '../comtrollers/auth.controllers'
import registerHandler from '../middlewares/register.middleware'
import loginHandler from '../middlewares/login.middleware'



const router = Router()

router.post("/register", registerHandler, register)


router.post("/login", loginHandler, userLogin)

export default router