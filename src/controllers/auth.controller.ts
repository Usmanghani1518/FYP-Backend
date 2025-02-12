import {Request, Response} from "express"
import bcrypt from "bcrypt"
import { User} from "../models/user.model";
import { generateToken } from "../helpers/token";   
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
    const resUser = await User.findById(newUser._id).select("-password");
    if (!resUser) {
      res.status(400).json({ error: "Unable to create user" });
      return;
    }
    const userId: string = newUser._id.toString();
    generateToken(userId,res)

    res.status(201).json({success:true, detail: "Account created successfully.",resUser})
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
    const hashedPassword = await bcrypt.compare(password , user_exists.password)
    if (!hashedPassword){
        res.status(500).json({ success: false, detail: "Invalid Creditenials" });
        return
        }
        const resUser = await User.findOne(user_exists._id).select("-password");
        const userId: string = user_exists._id.toString();
        generateToken(userId, res)
        res.status(201).json({success:true, detail: "Logged in successfully." ,resUser})
        return;
} catch(error) {
    console.error("Signup Error:", error);
    res.status(500).json({ success: false, detail: "Internal Server Error" });
    return;
}
}

 