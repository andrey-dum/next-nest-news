import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { Api } from '../../services/api';
import { IPost } from '../../types/interfaces';
import { useRouter } from 'next/dist/client/router';


const EditorJs = dynamic((): Promise<any> => import('../Editor/Editor').then(m => m.Editor), { ssr: false })

const StyledFormWrapper = styled.div`
  
    .MuiInputBase-input {
        font-size: 28px;
        font-weight: 600;
        color: #929292;
        margin: 10px 0;
    }

    .MuiInput-underline:before, .MuiInput-underline:after  {
        border-bottom: none;
    }

    .MuiInput-underline:hover:not(.Mui-disabled):before {
        border-bottom: none;
    }
`;

interface IProps {
    data?: IPost;
}


export const CreatePostForm: React.FC<IProps> = ({ data }) => {

    const router = useRouter()

    const [title, setTitle] = useState(data?.title || '');
    const [blocks, setBlocks] = useState(data?.body || []);
    const [loading, setLoading] = useState(false);

    const handleChangeTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(e.target.value)
    }

    const handleChangeEditor = (blocksData: any) => {
        setBlocks(blocksData)
    }

    const handleCreatePost = async () => {
        try {
            setLoading(true)

            const postData = {
                title,
                body: blocks
            }

            if (!data) {
                const post = await Api().post.create(postData)
                await router.push(`/write/${post.id}`)
            } else {
                const post = await Api().post.update(data.id, postData)
            }

            
        } catch (error) {
            console.warn('Create post', error)
            setLoading(false)
        } finally {
            setLoading(false)
        }
    }


    return (
        <StyledFormWrapper
        
        >
            <TextField 
                fullWidth 
                placeholder="Заголовок"
                value={title}
                onChange={handleChangeTitle} 
            />

            <EditorJs
                initialBlocks={data?.body}
                handleChange={(data: OutputBlockData) => handleChangeEditor(data)}
            />

            <Button 
                disabled={
                    loading || 
                    !blocks.length ||
                    !title
                }
                variant="contained" 
                color="primary"
                onClick={handleCreatePost}
            >
                { data ? 'Save' : 'Опубликовать'}
            </Button>
        </StyledFormWrapper>
    )
}