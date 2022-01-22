
export type LoginUserDto = Omit<CreateUserDto, 'password'>;

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
}

export interface UserResponse {
    fullName: string;
    email: string;
    id: number | string;
    password: string;
    createdAt: string;
    updatedAt: string;
    access_token: string;
}