import React, { useEffect } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, Divider, IconButton, Typography } from '@material-ui/core';
import Link from 'next/link'
import { PostComments } from '../PostComments/PostComments';
import styled from 'styled-components';
import { IPost } from '../../types/interfaces';

const StyledFullPost = styled.div`
    
    font-size: 18px;
    background: #fff;
    border-radius: 8px;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    padding-bottom: 40px;    
    
    .postBody {
        max-width: 640px;
        margin: 0 auto;
    }


`;

interface IProps {
    post: IPost
  }


export const PostPage: React.FC<IProps> = ({ post }) => {

    return (
        <StyledFullPost className="postPage">
            <div className="postBody">
                <h1>{ post.title }</h1>

                { post.body.map(p => (
                    <Typography key={post.id} variant="body2" color="textSecondary" component="p">
                        {p.data.text}
                    </Typography>
                )) } 

                {/* <PostComments comments={comments} /> */}
            </div>
        </StyledFullPost>
    )
}