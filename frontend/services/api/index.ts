import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { UserApi } from './user';

const instance = axios.create({
    baseURL: "http://localhost:7777/",
    withCredentials: true
})

export type ApiRetrunType = {
    user: ReturnType<typeof UserApi>;
}


export const Api = (ctx?: NextPageContext | GetServerSidePropsContext): ApiRetrunType => {
    const cookies = ctx ? Cookies.get(ctx) : parseCookies()
    const token = cookies.token;

    const instance = axios.create({
        baseURL: 'http://localhost:7777',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    return {
        user: UserApi(instance)
    }


}