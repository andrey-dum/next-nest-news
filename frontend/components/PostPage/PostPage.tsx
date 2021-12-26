import React, { useEffect } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@material-ui/core';
import Link from 'next/link'
import { PostComments } from '../PostComments/PostComments';
import styled from 'styled-components';

const StyledFullPost = styled.div`
    
    font-size: 18px;
    background: #fff;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    
    .postBody {
        max-width: 640px;
        margin: 0 auto;
    }


`;


export const PostPage: React.FC = () => {

    return (
        <StyledFullPost className="postPage">
            <div className="postBody">
                <h1> POST PAGE</h1>

                <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quae repellat facilis nostrum voluptatem placeat vitae nulla est animi maiores eum amet necessitatibus, dignissimos neque ducimus minima rerum ipsum nesciunt quas!</p>

                {/* <PostComments comments={comments} /> */}
            </div>
        </StyledFullPost>
    )
}