import {Request, Response} from "express"
import bcrypt from "bcrypt"
import { User} from "../models/user.model";
import { generateToken } from "../helpers/token";   
import { generateVerificationOTP } from "../helpers/generateOtp";
import { Code } from "../models/code.model";

export const signup = async (req:Request, res:Response):Promise<void>=>{

    try {
    let {email, name, password, role,} = req.body;
    console.log("Received Body:", req.body);
    if (!email || !name || !password || !role ) {
        res.status(400).json({ success: false, detail: "All fields are required" });
        return

      }
    const existing_user = await User.findOne({email});
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.trim())) {  
      res.status(400).json({ success: false, detail: "Invalid email format" });
      return;
    }
    
    if(existing_user){
    res.status(400).json({success:false, detail: "User already exists"});
    return;
    }

    if (password.length < 8){
    res.status(400).json({success:false, detail: "Password length must be 8 characters."})
    return;
    }
    const salt  = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const newUser = new User({
        email,
        name, 
        password:hashedPassword,
        role,
    }   )
    await newUser.save()
    
    await generateVerificationOTP("account_activation",newUser)
    res.status(201).json({success:true, detail: "Signed Up Successfully. Please check your email to verify your account."})
    return;
    } catch (error) {
        console.error("Signup Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    return;
    }
};


export const login = async (req:Request, res:Response):Promise<void> =>{
try {
    let {email , password}  = req.body
    if(!email || !password){
    res.status(500).json({ success: false, detail: "All feilds are required" });
    return
    }
    const user_exists = await User.findOne({email})
    if (!user_exists){
    res.status(500).json({ success: false, detail: "Invalid Creditenials" });
    return
    }
    if(!user_exists.emailConfirmed){
      await generateVerificationOTP("account_activation", user_exists)
      res.status(500).json({ success: true, verified: false, detail: "Account is not verified. A new verification email has been sent." });
      return
    }
    const hashedPassword = await bcrypt.compare(password , user_exists.password)
    if (!hashedPassword){
        res.status(500).json({ success: false, detail: "Invalid Creditenials" });
        return
        }
        const resUser = await User.findOne(user_exists._id).select("-password");
        const userId: string = user_exists._id.toString();
        generateToken(userId, res)
        res.status(201).json({success:true, detail: "Logged in successfully." ,resUser,verified: true, })
        return;
} catch(error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    return;
}
}


export const accountActication = async( req:Request , res:Response):Promise<void>=>{
   try {
    const {email , code} = req.body
    const user =await User.findOne({email})
    if (!user){
      res.status(500).json({ success: false, detail: "Invalid email" });
      return
    }

    const code_verification = await Code.findOne({user:user, value:code,type:'account_activation'})
    if (!code_verification) {
      res.status(400).json({ success: false, detail: "Invalid code." });
      return;
    }

    if (code_verification.expires_at && new Date(Date.now()) > code_verification.expires_at) {
      await code_verification.deleteOne(); 
      res.status(400).json({ success: false, detail: "Code has expired. Request a new one." });
      return;
    }
    await code_verification.deleteOne()

    user.emailConfirmed = true
    await user.save()

    const userId :string = user._id.toString()
    generateToken(userId , res)
    res.status(201).json({ success: true, detail: "Account Is Activated. LoggedIn Successfully." });
   } catch (error) {
    console.error("Error activating account:", error);
    res.status(500).json({ success: false, detail: "Error while generating code" });
    
   }
}


 