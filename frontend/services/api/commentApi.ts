import { AxiosInstance } from 'axios';
import { IComment, IPost } from '../../types/interfaces';


export type CreateCommentDto = {
    postId: number;
    text: string;
}



export const CommentApi = (instance: AxiosInstance) => ({

    async getComments (postId: number) {
        const { data } = await instance.get<IComment[]>('/comments', { params: {
            postId
        } });
        return data;
    },

    async create(dto: CreateCommentDto)  {
        const { data } = await instance.post<CreateCommentDto, { data: IComment }>('/comments', dto);
        return data;
    },

    async remove(id: number)  {
        const { data } = await instance.delete('/comments' + id);
        return data;
    },

  
 
})