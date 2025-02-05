import mongoose , {Document , Schema} from "mongoose"

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    role:string,
    profilePicture:string,
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
          enum: ['user', 'admin' , 'teacher'],
          default: 'user', 
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