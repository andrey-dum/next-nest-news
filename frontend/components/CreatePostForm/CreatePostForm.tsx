import React, { useEffect } from 'react';
import { Button, TextField } from '@material-ui/core';
import styled from 'styled-components';
import dynamic from 'next/dynamic';


const EditorJs = dynamic(() => import('../Editor/Editor').then(m => m.Editor), { ssr: false })

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

    return (
        <StyledFormWrapper
        
        >
            <TextField fullWidth placeholder="Заголовок" />

            <EditorJs />

            <Button variant="contained" color="primary">Опубликовать</Button>
        </StyledFormWrapper>
    )
}