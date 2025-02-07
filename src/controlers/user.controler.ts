import { NextFunction, Request, Response } from "express";

import { ITokenPayload } from "../interfaces/token.interface";
import { IUserUpdateDto } from "../interfaces/user.interface";
import { userService } from "../services/user.service";

class UserController {
  public async getList(req: Request, res: Response, next: NextFunction) {
    try {
      const query = req.query;
      const result = await userService.getList(query);
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
      const tokenPayload = req.res.locals.tokenPeyload as ITokenPayload;
      const result = await userService.getMe(tokenPayload);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async getMeEmail(req: Request, res: Response, next: NextFunction) {
    try {
      const { email } = req.query;  // Використовуємо query параметр
      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }
      const user = await userService.getByEmail(email as string);  // Переводимо в тип string
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json(user);
    } catch (e) {
      next(e);
    }
  }

  public async getByName(req: Request, res: Response, next: NextFunction) {
    try {
      const { name } = req.query;  // Отримуємо параметр name з query
      if (!name) {
        return res.status(400).json({ message: "Name is required" });
      }
      const users = await userService.getListByName(name as string);  // Викликаємо сервіс для пошуку
      if (users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
      res.status(200).json(users);
    } catch (e) {
      next(e);
    }
  }

  public async updateMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      const dto = req.body as IUserUpdateDto;
      const result = await userService.updateMe(tokenPayload, dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }
  public async deleteMe(req: Request, res: Response, next: NextFunction) {
    try {
      const tokenPayload = req.res.locals.tokenPayload as ITokenPayload;
      await userService.deleteMe(tokenPayload);
      res.sendStatus(204);
    } catch (e) {
      next(e);
    }
  }
}

export const userController = new UserController();
