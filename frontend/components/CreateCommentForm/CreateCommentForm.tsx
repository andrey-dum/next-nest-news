import React, { ChangeEvent, useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';


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


export const CreateCommentForm: React.FC = () => {
    const [clicked, setClicked] = useState(false)
    const [text, setText] = useState('')

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value)
    }

    const handleFocus = () => {
        setClicked(true)
    }

    const handleBlur = () => {
        setClicked(false)
    }
    
    const onAddComment = () => {
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