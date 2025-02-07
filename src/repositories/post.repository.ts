import { Post } from "../models/post.models";
import {IPost} from "../interfaces/post.intarface";


class PostRepository {
    public async getList(): Promise<IPost[]> {
        try {
            const posts = await Post.find({ isDeleted: false });
            return posts;
        } catch (error) {
            throw new Error("Failed to retrieve posts");
        }
    }
    public async create(dto: any): Promise<any> {
        return  await Post.create(dto);
    }

    public async getUserPost(userId: string): Promise<IPost | null> {
        return await Post.findOne({ _userId: userId }); // Пошук поста за _userId
    }

    public async deleteByUserId(userId: string): Promise<void> {
        await Post.deleteOne({ _userId: userId }); // Видалення поста за _userId
    }

    public async updateByUserId(userId: string, dto: Partial<IPost>): Promise<IPost> {
        return await Post.findOneAndUpdate({ _userId: userId }, dto, { new: true });
    }
}

export const postRepository = new PostRepository();