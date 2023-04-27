import dotenv from 'dotenv'
import path from 'path'
import { cwd } from 'process'
const envFilePath = path.join(cwd(), '.env');
dotenv.config({ path: envFilePath });


export const PORT = process.env.PORT
export const DB = process.env.DB
export const APP_SECRET = process.env.APP_SECRET
export const saltFactor = process.env.saltFactor
export const SERVICE = process.env.SERVICE
export const PASS = process.env.PASS
export const USER_EMAIL = process.env.USER_EMAIL
export const JWT_SECRET = process.env.JWT_SECRET




