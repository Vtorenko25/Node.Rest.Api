import { ObjectId } from "mongoose";

export interface IPost {
  _id: string | ObjectId;
  title: string;
  content: string;
  _userId: string | ObjectId;
  isDeleted: boolean;
  isVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}
