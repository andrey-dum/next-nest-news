

export interface IPost {
    id: string | number;
    title: string;
    text: string;
    author: string;
    imageUrl?: string;
}

export interface IUser {
    fullname: string;
    avatarUrl?: string;
}

export interface IComment {
    id: string;
    text: string;
    author: IUser;
    createdAt?: string;
}
