import { FilterQuery } from "mongoose";
import {
  IUser,
  IUserCreateDto,
  IUserUpdateDto,
} from "../interfaces/user.interface";
import { User } from "../models/user.model";


class UserRepository {
  public async getList(query): Promise<IUser[]> {
    const filterObj: FilterQuery<IUser> = { isDeleted: false };
    if (query.search) {
      filterObj.$or = [
        { name: { $regex: query.search, $options: "i" } },
        { email: { $regex: query.search, $options: "i" } },
      ];

    }
    return await User.find(filterObj);
  }

  public async create(dto: IUserCreateDto): Promise<IUser> {
    return await User.create(dto);
  }

  public async getById(userId: string): Promise<IUser> {
    return await User.findById(userId);
  }

  public async getByEmail(email: string): Promise<IUser> {
    return await User.findOne({ email });
  }

  public async updateById(userId: string, dto: IUserUpdateDto): Promise<IUser> {
    return await User.findByIdAndUpdate(userId, dto, { new: true });
  }

  public async deleteById(userId: string): Promise<void> {
    await User.deleteOne({ _id: userId });
  }

}

export const userRepository = new UserRepository();
