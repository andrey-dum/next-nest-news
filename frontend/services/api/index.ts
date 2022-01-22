import axios from 'axios';
import { CreateUserDto, LoginUserDto } from '../dto/user-dto';

const instance = axios.create({
    baseURL: "http://localhost:7777/",
    withCredentials: true
})


export const UserApi = {

    async register (dto: CreateUserDto) {
        const data = await instance.post('auth/register', dto);
        return data;
    },

    async login (dto: LoginUserDto) {
        const data = await instance.post('auth/login', dto);
        return data;
    }
}