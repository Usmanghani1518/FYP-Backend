import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validateSchema } from "../utils/validate.schema.js";
import { signInValidation, signUpValidation } from "../validators/auth.validator.js";
import { sendError } from "../utils/error.handler.js";



export const signup = async (req, res) => {
  try {
   
    validateSchema(signUpValidation, req.body, res)

    let { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      return sendError(res,403,"already account exist")
    }
    const hashPassword =  bcrypt.hash(password, 10, (error, hash) => {
      if (error) {
      } else {
        return password=hash;
      }
    });
    
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res
      .status(200)
      .json({ success: true, message: "user createtd successfully" });
  } catch (error) {
    return sendError(res,500,error)
  }
};


export const signin = async (req, res) => {
  try {
   
      const isValid =  validateSchema(signInValidation, req.body, res)

    let { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (!checkUser) {
      return sendError(res,403,"No account found")
    }
    const passwordMatch =  bcrypt.compare(password,checkUser.password)
    if (!passwordMatch){
      return res.status()
    }
    
    const newUser = await User.create({
      name: name,
      email: email,
      password: password,
    });
    res
      .status(200)
      .json({ success: true, message: "user createtd successfully" });
  } catch (error) {
     return sendError(res,500,error)
  }
};
