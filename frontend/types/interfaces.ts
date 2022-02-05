// export interface IPost {
//     id: string | number;
//     title: string;
//     text: string;
//     author: string;
//     imageUrl?: string;
// }

import { OutputBlockData, OutputData } from "@editorjs/editorjs";
import { UserResponse } from "../services/dto/user-dto";

export interface IUser {
    fullname: string;
    avatarUrl?: string;
}

export interface IUserRespone {
    fullname: string;
    avatarUrl?: string;

    id: number;
    email?: string;
    password?: string;
    createdAt?: string;
    updatedAt?: string;
}

export interface IComment {
    id: string | number;
    text: string;
    post?: IPost;
    user?: UserResponse;
    createdAt?: string;
}

export interface IPost {
    title: string;
    body: OutputBlockData[];
    tags: string[] | null;
    category: string[] | null;
    id: number;

    views: number;
    createdAt: string;
    updatedAt: string;

    imageUrl?: string;
    user?: IUserRespone;
}