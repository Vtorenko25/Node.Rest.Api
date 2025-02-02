import { passwordService } from "./password.service";
import { userRepository } from "../repositories/user.repository";
import { ApiError } from "../errors/api.error";
import {IUser, IUserCreateDto} from "../interfaces/user.interface";
import {userService} from "./user.service";
import {tokenService} from "./token.service";
import {tokenRepository} from "../repositories/token.repository";
import {ITokenPair} from "../interfaces/token.interface";

class AuthService {

    public async singUp(dto: IUserCreateDto): Promise<{user: IUser , tokens: ITokenPair}> {
        await userService.isEmailUnique(dto.email);
        const password = await passwordService.hashPassword(dto.password);
        const user = await userRepository.create({...dto, password});
        const tokens = tokenService.generateToken({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({...tokens, _userId: user._id});
        return { user, tokens }
    }

    public async signIn(dto: any): Promise<{user: IUser , tokens: ITokenPair}> {
        const user = await userRepository.getByEmail(dto.email);
        if (!user) {
            throw new ApiError("User not found", 404);
        }
        if (user.email !== dto.email) {
            throw new ApiError("Incorrect email", 401);
        }
        const isPasswordCorrect = await passwordService.comparePassword(
            dto.password,
            user.password
        );
        if (!isPasswordCorrect) {
            throw new ApiError("Incorrect email or password", 401);
        }
        const tokens = tokenService.generateToken({
            userId: user._id,
            role: user.role,
        });
        await tokenRepository.create({...tokens, _userId: user._id});
        return {user, tokens};
    }
}

export const authService = new AuthService();