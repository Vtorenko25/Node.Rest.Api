import { Schema, model } from "mongoose";


const postSchema = new Schema(
    {
            title: { type: String, required: true },
            content: { type: String, required: true },
            // _userId: { type: Schema.Types.ObjectId, required: true, ref: User },
            isDeleted: { type: Boolean, default: false },
            isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);


export const Post = model("Post", postSchema);