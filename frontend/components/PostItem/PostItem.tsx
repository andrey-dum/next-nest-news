import React, { useEffect } from 'react';
import { Avatar, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, Typography } from '@material-ui/core';
import Link from 'next/link';
import { IPost } from '../../types/interfaces'
import styled from 'styled-components';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { Share } from '@material-ui/icons';

interface IProps {
  post: IPost;
}

const StyledCard = styled(Card)`
    width: 100%;
    // max-width: 640px;
    margin: 15px auto;
    background: #fff;

    .MuiCardMedia-root {
        height: 200px;
        max-width: 100%;
    }

    .MuiCardActions-root {
      justify-content: space-between;
    }

  .cardTitle {
    margin: 0;
    font-size: 22px;
    font-weight: 500;
  }

`;

export const PostItem: React.FC<IProps> = ({ post }) => {

    // const firstParagraph = post.body.find(obj => obj.type === 'paragraph')?.data.text || '';
    

    return (
          <StyledCard>
            <CardHeader
              title={
                <>
                 <h3 className="cardTitle"> <Link href={`/posts/${post.id}`}>{post.title}</Link></h3>
                </>
              }
              subheader="September 14, 2016"
            />
            <CardMedia
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGOfJEHAIvVjPI8TXLLrMgwXWZiPx0FkU3dBiBExfIDy-ISANxSh2ulIvA9f86y_yu-sU&usqp=CAU"
              title={post.title}
            />
            <CardContent>
              <Typography variant="body2" color="textSecondary" component="p">
                {/* {firstParagraph} */}
              </Typography>
{/* 
              {post.body.map(p => (
                <Typography variant="body2" color="textSecondary" component="p">
                {p.data.text}
              </Typography>
              ))} */}
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to favorites">
                <ChatBubbleOutlineIcon />
              </IconButton>
              <IconButton aria-label="share">
                <BookmarkBorderIcon />
              </IconButton>
              <IconButton aria-label="share">
                <Share />
              </IconButton>
              <IconButton aria-label="share">
                <ChatBubbleOutlineIcon />
              </IconButton>
            
            </CardActions>
          </StyledCard>
    )
}