import User from "../models/user.model.js";
import * as yup from "yup";
import bcrypt from "bcrypt";

const schema = yup.object({
  name: yup
    .string()
    .required("name is required")
    .min(3, "min 3 chars")
    .max(10, "max 10 chars"),
  email: yup
    .string()
    .required("email is required")
    .email("enter valid email adress"),
  password: yup
    .string()
    .required("name is required")
    .min(6, "min 6  chars of password")
    .max(10, "max 10 chars"),
});

export const signup = async (req, res) => {
  try {
    await schema.validate(req.body, { abortEarly: false }).catch((err) => {
      const errorMessages = err.inner.map((e) => e.message);
      return res.status(400).json({ errors: errorMessages });
    });

    let { name, email, password } = req.body;
    const checkUser = await User.findOne({ email });
    if (checkUser) {
      res.status(403).json({ error: "user alreday exist" });
    }
    const hashPassword = await bcrypt.hash(password, 10, (error, hash) => {
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
    // console.log(`server errror ${error}`);
    // return res.status(500).json({
    //   error: `Server error: ${error}`
    // });
  }
};
