export interface LoginDto {
    email: string;
    password: string;
}

export interface LoginResponseDto {
    JWT: string;
    username: string;
}
