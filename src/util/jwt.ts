import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '../config/config'


export function createToken(payload: any){
    const token = jwt.sign(payload, JWT_SECRET as string, 
        {expiresIn: "1h",
             algorithm: "HS256"})
    return token
}

export function verifyToken( token: string){
    try{
        const decoded = jwt.verify(token, JWT_SECRET as string)
    }catch(e: any){
        throw new Error

    }
}