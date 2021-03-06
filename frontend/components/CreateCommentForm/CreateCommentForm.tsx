import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import { useRouter } from 'next/dist/client/router';
import { Api } from '../../services/api';
import { IComment } from '../../types/interfaces';


const StyledFormWrapper = styled.div`
  
    text-align: right;
    .MuiInputBase-root {
        padding: 15px;
        background-color: #f7f7f7;
        border: 1px solid rgba(0,0,0,.03);
        border-radius: 10px;
        cursor: pointer;
    }
    .MuiFormControl-fullWidth {
        margin: 20px 0;
    }

    .MuiFilledInput-underline:before, .MuiFilledInput-underline:hover:before  {
        border-bottom: none;
    }

    .MuiFilledInput-underline:after {
        border-bottom: none;
    }
`;

interface IProps {
    addComment: (obj: IComment) => void;
}

export const CreateCommentForm: React.FC<IProps> = ({addComment}) => {
    const [clicked, setClicked] = useState(false)
    const [text, setText] = useState('')

    const { query: { id: postId } } = useRouter()

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleFocus = () => {
        setClicked(true)
    }

    const handleBlur = () => {
        // setClicked(false)
    }
    
    const onAddComment = async () => {
        try {
            const comment = await Api().comment.create({
                postId: Number(postId),
                text
            })
            addComment(comment)
          
        } catch (error) {
            console.warn("Add commnet", error)
        }
    }

    const rows = clicked ? 5 : 1;

    return (
        <StyledFormWrapper
        
        >
            <TextField
                multiline
                fullWidth 
                placeholder="Написать комментарий..."
                minRows={rows} 
                variant="filled"
                onFocus={handleFocus}
                onBlur={handleBlur}
                value={text}
                onChange={handleChange}
            />


            {clicked && 
                <Button 
                    variant="contained" 
                    color="primary"
                    onClick={onAddComment}
                >
                    Опубликовать
                </Button>}
        </StyledFormWrapper>
    )
}