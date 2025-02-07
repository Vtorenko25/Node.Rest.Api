import { Schema, model } from "mongoose";
import {IPost} from "../interfaces/post.intarface";


const postSchema = new Schema<IPost>(
    {
        title: { type: String, required: true },
        content: { type: String, required: true },
        _userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        isDeleted: { type: Boolean, default: false },
        isVerified: { type: Boolean, default: false },
    },
    { timestamps: true, versionKey: false }
);

export const Post = model<IPost>("Post", postSchema);