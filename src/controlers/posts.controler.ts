import { NextFunction, Request, Response } from "express";
import {postService} from "../services/post.service";


class PostControler {
    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as any;
            const result = await postService.createPost(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const postController = new PostControler();