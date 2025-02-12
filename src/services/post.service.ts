import { ApiError } from "../errors/api.error";
import { IPost } from "../interfaces/post.intarface";
import { postRepository } from "../repositories/post.repository";

class PostService {
  public async getList(): Promise<IPost[]> {
    return await postRepository.getList();
  }

  public async createPost(dto: IPost): Promise<IPost> {
    return await postRepository.create(dto);
  }

  public async deleteMe(userId: string): Promise<void> {
    const post = await postRepository.getUserPost(userId);
    if (!post) {
      throw new ApiError("Post not found", 404);
    }
    await postRepository.deleteByUserId(userId);
  }

  public async updateMe(userId: string, dto: Partial<IPost>): Promise<IPost> {
    const post = await postRepository.getUserPost(userId);
    if (!post) {
      throw new ApiError("Post not found", 404);
    }
    return await postRepository.updateByUserId(userId, dto);
  }
}

export const postService = new PostService();
