import { NextFunction, Request, Response } from "express";

import { userService } from "../services/user.service";
import {IUserCreateDto, IUserUpdateDto} from "../interfaces/user.interface";


class UserController {
    public async getList(req: Request, res: Response, next: NextFunction) {
        try {
            const result = await userService.getList();
            res.json(result);
        } catch (e) {
            next(e);
        }
    }

    public async create(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = req.body as IUserCreateDto;
            const result = await userService.create(dto);
            res.status(201).json(result);
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

    public async getUserByEmail(req: Request, res: Response, next: NextFunction) {
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

    public async updateUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            const dto = req.body as IUserUpdateDto;
            const result = await userService.updateUser(userId, dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
    public async deleteUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = req.params.userId;
            await userService.deleteUser(userId);
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    }
}

export const userController = new UserController();