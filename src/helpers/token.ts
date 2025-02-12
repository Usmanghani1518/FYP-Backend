import jwt from "jsonwebtoken"
import { Response } from "express";
const jwt_key = process.env.JWT_KEY || "jo3i2e9ruijn30rejnopojio32ier9u8fdjon"

export const generateToken = (userId:string , res:Response):string =>   {
const token =   jwt.sign( {id:userId},jwt_key,{ algorithm: "HS256", expiresIn: "7d" })
res.cookie("token",token,{
    httpOnly:true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
})
return token
}

export const  decodeToken = (token:string):object | null =>{
    try {
    return jwt.verify(token,jwt_key ) as object
        
    } catch (error) {
            console.error("Invalid Token", error)
            return null;
    }

}