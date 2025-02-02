import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import { IUserUpdateDto} from "../interfaces/user.interface";
import {ITokenPayload} from "../interfaces/token.interface";


class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getUserById(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const result = await userService.getUserById(userId);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getMe(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPeyload = req.res.locals.tokenPeyload as ITokenPayload;
            const result = await userService.getMe(tokenPeyload);
            res.status(200).json(result);
        } catch (e) {
            next(e);
        }
    }

    public async getMeEmail(req: Request, res: Response, next: NextFunction) {
        try {
            const { userEmail } = req.params; // Отримуємо email з params

            if (!userEmail) {
                return res.status(400).json({ message: "Email is required" });
            }

            const user = await userService.getByEmail(userEmail);

            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }

            res.status(200).json(user);
        } catch (e) {
            next(e);
        }
    }

    public async updateMe(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPeyload = req.res.locals.tokenPeyload as ITokenPayload;
            const dto = req.body as IUserUpdateDto;
            const result = await userService.updateMe(tokenPeyload, dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async deleteMe(req: Request, res: Response, next: NextFunction) {
        try {
            const tokenPeyload = req.res.locals.tokenPeyload as ITokenPayload;
            await userService.deleteMe(tokenPeyload);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();