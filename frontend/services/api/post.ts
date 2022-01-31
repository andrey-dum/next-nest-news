import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';
import { IPost } from '../../types/interfaces';


type CreatePostDto = {
    title: string;
    body: OutputData['blocks'];
}



export const PostApi = (instance: AxiosInstance) => ({

    async getPosts () {
        const { data } = await instance.get<IPost[]>('/posts');
        return data;
    },

    async create(dto: CreatePostDto)  {
        const data = await instance.post<CreatePostDto, { data: IPost }>('/posts', dto);
        return data;
    },

    async getOne(id: string | number)  {
        const { data } = await instance.get<IPost>(`/posts/${id}`);
        return data;
    }
 
})