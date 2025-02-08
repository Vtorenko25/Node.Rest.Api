import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { postService } from "../services/post.service";

class PostController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const posts = await postService.getList();
      res.status(200).json(posts);
    } catch (e) {
      next(e);
    }
  }
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

  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await postService.deleteMe(tokenPayload.userId);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.res.locals.tokenPayload.userId;
      const dto = req.body;
      const updatedPost = await postService.updateMe(userId, dto);
      res.status(200).json(updatedPost);
    } catch (e) {
      next(e);
    }
  }
}

export const postController = new PostController();
