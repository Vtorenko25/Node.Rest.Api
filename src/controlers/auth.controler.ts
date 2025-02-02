import { Request, Response, NextFunction } from "express";
import {authService} from "../services/auth.service";
import {IUserCreateDto} from "../interfaces/user.interface";


class AuthControler {

    public async singUp(req: Request, res: Response, next: NextFunction) {
        try{
            const dto = req.body as IUserCreateDto;
            const result = await authService.singUp(dto);
            res.status(201).json(result);
        }catch(e){
            next(e);
        }
    }

    public async signIn(req: Request, res: Response, next: NextFunction) {
        try{
            const dto = req.body as any;
            const result = await authService.signIn(dto);
            res.status(201).json(result);
        } catch (e) {
            next(e);
        }
    }
}

export const authController = new AuthControler();