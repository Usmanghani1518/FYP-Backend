import mongoose, { Schema, Types, Document } from "mongoose";

export interface ICode extends Document {
    _id: Types.ObjectId;
    type: string;
    value: string;
    expires_at: Date;
    user: Types.ObjectId;
}

const codeSchema: Schema = new Schema(
    {
        type: { type: String, required: true }, 
        value: { type: String, required: true }, 
        expires_at: { type: Date, required: true }, 
        user: { type: Types.ObjectId, ref: "User", required: true } 
    },
    { timestamps: true }
);

export const Code = mongoose.model<ICode>("Code", codeSchema);
