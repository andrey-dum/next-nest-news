import axios from 'axios';
import { CreateUserDto, LoginUserDto, UserResponse } from '../dto/user-dto';

const instance = axios.create({
    baseURL: "http://localhost:7777/",
    withCredentials: true
})


export const UserApi = {

    async register (dto: CreateUserDto) {
        const { data } = await instance.post<CreateUserDto, { data: UserResponse }>('auth/register', dto);
        return data;
    },

    async login (dto: LoginUserDto) {
        const { data } = await instance.post<LoginUserDto, { data: UserResponse }>('auth/login', dto);
        return data;
    },

    async getProfile (token: string) {
        const { data } = await instance.get<UserResponse>('users/profile', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return data;
    }
}