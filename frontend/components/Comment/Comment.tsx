import { Avatar } from '@material-ui/core';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Api } from '../../services/api';
import { IComment } from '../../types/interfaces';

interface IProps {
    comment: IComment;
    onRemoveComment: (id: number) => void;
}

const StyledComment = styled.div`
    background: #fff;
    padding: 15px 15px;
    margin: 10px 0;
    display: flex;
    // align-items: center;

    .author {
        font-weight: 600;
        color: #666;
    }


    .avatar {
        margin-right :12px;
    }
`;

export const Comment: React.FC<IProps> = ({ comment, onRemoveComment }) => {

    const onRemove = async () => {
        try {
          await Api().comment.remove(+comment.id)
          onRemoveComment(+comment.id)
        } catch (error) {
          console.warn("Error delete comment", error)
        }
      }
    

    return (
        <StyledComment className="comment">
            <div className="avatar">
                <Avatar src={comment?.user?.avatarUrl} >{comment?.user?.fullName.slice(0,2).toUpperCase()}</Avatar>
            </div>

            

            <div className="authorInfo">
                <div className="author">{comment?.user?.fullName}</div>
                <div className="createdAt">
                    <small>{comment.createdAt}</small>
                </div>
                <div className="text">{comment.text}</div>
                <button
                    onClick={onRemove}
                >
                    Delete
                </button>
            </div>

            
        </StyledComment>
    )
}