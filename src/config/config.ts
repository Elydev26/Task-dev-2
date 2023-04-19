import dotenv from 'dotenv'
import path from 'path'
import { cwd } from 'process'

const envFilePath = path.join(cwd(), '.env');
dotenv.config({ path: envFilePath });


export const PORT = process.env.PORT
export const DB = process.env.DB
export const APP_SECRET = process.env.APP_SECRET
export const saltFactor = process.env.saltFactor

