import crypto from "crypto";
import { IUser } from "../models/user.model";
import { Code } from "../models/code.model";
import { sendVerificationEmail } from "./verificationemail";

export async function generateVerificationOTP(type: string, user: IUser):Promise<void> {
  const otp = crypto.randomInt(100000, 999999).toString();
  const expires_at = new Date(Date.now() + 30 *60 *1000)
  const alreadyCodeSent = await Code.findOne({user: user._id})
  if (alreadyCodeSent){
    await alreadyCodeSent.deleteOne()
  }
  const code = new Code({
    type,
    value:otp,
    user: user._id,
    expires_at
  });
  await code.save()
  if (type === "account_activation"){
    return sendVerificationEmail(user.email , code.value)
  }
}


