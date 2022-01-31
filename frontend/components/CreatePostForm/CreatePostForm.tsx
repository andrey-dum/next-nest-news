import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import dynamic from 'next/dynamic';
import { OutputBlockData, OutputData } from '@editorjs/editorjs';
import { Api } from '../../services/api';


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


export const CreatePostForm: React.FC = () => {

    const [title, setTitle] = useState('');
    const [blocks, setBlocks] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChangeTitle = (e: { target: { value: React.SetStateAction<string>; }; }) => {
        setTitle(e.target.value)
    }

    const handleChangeEditor = (blocksData: any) => {
        console.log(blocksData)
        setBlocks(blocksData)
    }

    const handleCreatePost = async () => {
        try {
            setLoading(true)
            const post = await Api().post.create({
                title,
                body: blocks
            })
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
                handleChange={(data: OutputBlockData) => handleChangeEditor(data)}
            />

            <Button 
                disabled={loading}
                variant="contained" 
                color="primary"
                onClick={handleCreatePost}
            >
                Опубликовать
            </Button>
        </StyledFormWrapper>
    )
}