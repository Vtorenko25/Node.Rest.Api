import { ApiError } from "../errors/api.error";
import { ITokenPayload } from "../interfaces/token.interface";
import { IUser, IUserUpdateDto } from "../interfaces/user.interface";
import { userRepository } from "../repositories/user.repository";

class UserService {
  public async getList(query): Promise<IUser[]> {
    return await userRepository.getList(query);
  }

  public async getUserById(userId: string): Promise<IUser> {
    const user = await userRepository.getById(userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async getByEmail(email: string): Promise<IUser> {
    const user = await userRepository.getByEmail(email);
    if (!email) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async getListByName(name: string): Promise<IUser[]> {
    return await userRepository.getByName(name);
  }

  public async getMe(tokenPeyload: ITokenPayload): Promise<IUser> {
    const user = await userRepository.getById(tokenPeyload.userId);
    if (!user) {
      throw new ApiError("user not found", 404);
    }
    return user;
  }

  public async updateMe(
      tokenPayload: ITokenPayload,
      dto: IUserUpdateDto,
  ): Promise<IUser> {
    const user = await userRepository.getById(tokenPayload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    return await userRepository.updateById(user._id, dto);
  }

  public async deleteMe(tokenPeyload: ITokenPayload): Promise<void> {
    const user = await userRepository.getById(tokenPeyload.userId);
    if (!user) {
      throw new ApiError("User not found", 404);
    }
    await userRepository.deleteById(tokenPeyload.userId);
  }

  public async isEmailUnique(email: string): Promise<void> {
    const user = await userRepository.getByEmail(email);
    if (user) {
      throw new ApiError("email is already in use", 409);
    }
  }



}

export const userService = new UserService();
