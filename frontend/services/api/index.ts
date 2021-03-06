import axios from 'axios';
import { GetServerSidePropsContext, NextPageContext } from 'next';
import Cookies, { parseCookies } from 'nookies';
import { CommentApi } from './commentApi';
import { PostApi } from './post';
import { UserApi } from './user';


export type ApiRetrunType = {
    user: ReturnType<typeof UserApi>;
    post: ReturnType<typeof PostApi>;
    comment: ReturnType<typeof CommentApi>;
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
        user: UserApi(instance),
        post: PostApi(instance),
        comment: CommentApi(instance),

    }


}