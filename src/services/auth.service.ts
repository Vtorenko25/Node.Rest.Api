import { ApiError } from "../errors/api.error";
import { ITokenPair } from "../interfaces/token.interface";
import { IUser, IUserCreateDto } from "../interfaces/user.interface";
import { tokenRepository } from "../repositories/token.repository";
import { userRepository } from "../repositories/user.repository";
import { passwordService } from "./password.service";
import { tokenService } from "./token.service";
import { userService } from "./user.service";

class AuthService {
  public async singUp(
    dto: IUserCreateDto,
  ): Promise<{ user: IUser; tokens: ITokenPair }> {
    await userService.isEmailUnique(dto.email);
    const password = await passwordService.hashPassword(dto.password);
    const user = await userRepository.create({ ...dto, password });
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async signIn(dto: any): Promise<{ user: IUser; tokens: ITokenPair }> {
    const user = await userRepository.getByEmail(dto.email);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    if (user.email !== dto.email) {
      throw new ApiError("Incorrect email", 401);
    }
    const isPasswordCorrect = await passwordService.comparePassword(
      dto.password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new ApiError("Incorrect email or password", 401);
    }
    const tokens = tokenService.generateToken({
      userId: user._id,
      role: user.role,
    });
    await tokenRepository.create({ ...tokens, _userId: user._id });
    return { user, tokens };
  }

  public async logout(accessToken: string): Promise<void> {
    const pair = await tokenRepository.findByParams({ accessToken });

    if (!pair) {
      throw new ApiError("Invalid token", 401);
    }

    await tokenRepository.deleteOne({ accessToken }); // Видаляємо токен із БД
  }
}

export const authService = new AuthService();
