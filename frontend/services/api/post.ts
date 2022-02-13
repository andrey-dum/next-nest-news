import { OutputData } from '@editorjs/editorjs';
import { AxiosInstance } from 'axios';
import { IPost } from '../../types/interfaces';


type CreatePostDto = {
    title: string;
    body: OutputData['blocks'];
}

interface SearchPostDto {
    title?: string;
  
    body?: string;
  
    views?: 'DESC' | 'ASC';
  
    limit?: number;
  
    take?: number;
  
    tag?: string;
  }
  



export const PostApi = (instance: AxiosInstance) => ({

    async getPosts () {
        const { data } = await instance.get<IPost[]>('/posts');
        return data;
    },

    async search (query: SearchPostDto) {
        const { data } = await instance.get<{ items: IPost[], total: number }>('/posts', {
            params: query
        });
        return data;
    },

    async create(dto: CreatePostDto)  {
        const { data } = await instance.post<CreatePostDto, { data: IPost }>('/posts', dto);
        return data;
    },

    async getOne(id: string | number)  {
        const { data } = await instance.get<IPost>(`/posts/${id}`);
        return data;
    },

    async update(id: string | number, dto: CreatePostDto)  {
        const { data } = await instance.patch<IPost>(`/posts/${id}`, dto);
        return data;
    }
 
})