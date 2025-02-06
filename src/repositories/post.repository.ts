import { Post } from "../models/post.models";

class PostRepository {
    public async create(dto: any): Promise<any> {
        return  await Post.create(dto);
    }
}

export const postRepository = new PostRepository();