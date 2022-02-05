import { AxiosInstance } from 'axios';
import { IComment, IPost } from '../../types/interfaces';


export type CreateCommentDto = {
    postId: number;
    text: string;
}



export const CommentApi = (instance: AxiosInstance) => ({

    async getComments () {
        const { data } = await instance.get<IComment[]>('/comments');
        return data;
    },

    async create(dto: CreateCommentDto)  {
        const { data } = await instance.post<CreateCommentDto, { data: IComment }>('/comments', dto);
        return data;
    },

  
 
})