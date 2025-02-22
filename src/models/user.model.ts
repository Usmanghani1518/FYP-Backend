import mongoose , {Document , Schema, Types} from "mongoose"


export enum UserRole{
  STUDENT = "student",
  TEACHER ="teacher",
  ADMIN = "admin"
}
export interface IUser extends Document{
    _id: Types.ObjectId;
    name:string,
    email:string,
    password:string,
    role:UserRole,
    profilePicture?:string,
    emailConfirmed:boolean,
}


const userSchema = new Schema<IUser>(
    {
        name: {
          type: String,
          required: true,
          trim: true,
        },
        email: {
          type: String,
          required: true,
          unique: true, 
          trim: true,
          lowercase: true, 
        },
        password: {
          type: String,
          required: true,
          minlength: 6,
        },
        role: {
          type: String,
          enum: Object.values(UserRole),
          default: UserRole.STUDENT, 
        },
        emailConfirmed:{
          type: Boolean,
          default: false, 
        },
        profilePicture: {
          type: String,
          default: '',
        },
      },
      {
        timestamps: true, 
      }
)

export const User = mongoose.model<IUser>("User" , userSchema)