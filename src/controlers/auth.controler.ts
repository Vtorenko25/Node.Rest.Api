import { NextFunction, Request, Response } from "express";

import { ApiError } from "../errors/api.error";
import { IUserCreateDto } from "../interfaces/user.interface";
import { authService } from "../services/auth.service";

class AuthControler {
  public async singUp(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as IUserCreateDto;
      const result = await authService.singUp(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async signIn(req: Request, res: Response, next: NextFunction) {
    try {
      const dto = req.body as any;
      const result = await authService.signIn(dto);
      res.status(201).json(result);
    } catch (e) {
      next(e);
    }
  }

  public async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const accessToken = req.headers.authorization?.split("Bearer ")[1];

      if (!accessToken) {
        throw new ApiError("No token provided", 401);
      }

      await authService.logout(accessToken);
      res.status(200).json({ message: "Logout successful" });
    } catch (e) {
      next(e);
    }
  }
}

export const authController = new AuthControler();
