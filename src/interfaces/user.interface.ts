export interface IUser {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    roles: string;
    phone?: string;
    isDeleted: boolean;
    isVerified: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface IUsersDto extends Pick<IUser, "name" | "email" | "password"> {}

