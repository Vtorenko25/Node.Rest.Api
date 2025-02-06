import {IPost} from "../interfaces/post.intarface";
import {postRepository} from "../repositories/post.repository";

class PostService {
    public async createPost(dto: IPost): Promise<IPost> {
        return await postRepository.create(dto);
    }
}

export const postService = new PostService();