import { IPost } from "../interfaces/post.intarface";
import { Post } from "../models/post.models";

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
    return await Post.create(dto);
  }

  public async getUserPost(userId: string): Promise<IPost | null> {
    return await Post.findOne({ _userId: userId });
  }

  public async deleteByUserId(userId: string): Promise<void> {
    await Post.deleteOne({ _userId: userId });
  }

  public async updateByUserId(
    userId: string,
    dto: Partial<IPost>,
  ): Promise<IPost> {
    return await Post.findOneAndUpdate({ _userId: userId }, dto, { new: true });
  }
}

export const postRepository = new PostRepository();
