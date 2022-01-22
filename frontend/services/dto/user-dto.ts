
export type LoginUserDto = Omit<CreateUserDto, 'password'>;

export type CreateUserDto = {
    fullName: string;
    email: string;
    password: string;
}