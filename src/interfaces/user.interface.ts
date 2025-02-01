export interface IUser {
    id: number;
    name: string;
    email: string;
    password: string;
}

export interface IUsersDto extends Pick<IUser, "name" | "email" | "password"> {}