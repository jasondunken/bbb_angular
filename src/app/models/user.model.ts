export interface CreateUserDto {
    userName: string;
    email: string;
    password: string;
}

export interface UserDto {
    _id: string;
    userName: string;
    email: string;
    password: string;
}
