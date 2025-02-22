import mongoose , {Document, Schema} from "mongoose"


export interface SocialAccount {
    plateform : "facebook" | "twitter" | "linkedin";
    url: string
}

export interface ITeacher extends Document {
  bio?: string;
  headline: string;
  user: mongoose.Types.ObjectId; 
  experience: "beginner" | "intermediate" | "professional";
  socialAccounts?: SocialAccount[]
}



const TeacherSchema  = new Schema<ITeacher>({
    bio: { type: String,  },
    headline: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    experience: { type: String, enum: ["beginner", "intermediate", "professional"], required: true },
    socialAccounts : [
        {
            plateform :  {
                type : String,
                enum:["facebook" , "twitter" , "linkedin"]
            },
            url:{
                type:String
            }
        }
    ]
})


export const Teacher = mongoose.model<ITeacher>("Teacher", TeacherSchema)