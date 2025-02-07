import { NextFunction, Request, Response } from "express";
import { postService } from "../services/post.service";

class PostController {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = res.locals.tokenPayload?.userId;
            if (!userId) {
                throw new Error("User ID is missing from token");
            }

            const dto = req.body as any;
            const result = await postService.createPost({ ...dto, _userId: userId });

            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostController();