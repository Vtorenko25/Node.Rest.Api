import {IUser, IUsersDto} from "../interfaces/user.interface";
import {User} from "../models/user.model";

class UserRepository {
    public async getList(): Promise<IUser[]> {
        return await User.find();
    }

    public async create(dto: IUsersDto): Promise<IUser> {
       return await User.create(dto);
    }

    public async getById(userId: string): Promise<IUser> {
        return await User.findById(userId);
    }

    public async updateById(userId: string, dto: IUsersDto): Promise<any> {

    }

    public async deleteById(userId: string, dto: IUsersDto): Promise<void> {

    }
}

export const userRepository = new UserRepository();