import React, { useEffect, useMemo } from 'react';
import { Comment } from '../Comment/Comment';
import { IComment } from '../../types/interfaces'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CreateCommentForm } from '../CreateCommentForm/CreateCommentForm';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';

interface IProps {
  comments: IComment[];
  sideComments?: boolean;
}

const StyledPostComments = styled.div`
 
  
  background: #fff;
  margin-top: 30px;
  border-radius: 8px;

  .commnetsBody, .commnetsHeader {
    max-width: 640px;
    margin: 0 auto;
  }

`;

export const PostComments: React.FC<IProps> = ({comments}) => {

  const commentsCount = useMemo(() => comments.length || 0, [comments])
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };



    return (
        <StyledPostComments className="postComments">
         
          
          <div className="commnetsHeader">
            <h3>{ commentsCount } Комментария</h3>
            <Tabs
              value={value}
              indicatorColor="primary"
              textColor="primary"
              onChange={handleChange}
              aria-label="disabled tabs example"
            >
              <Tab label="Active" />
              <Tab label="Active2" />
            </Tabs>
          </div>
          <Divider />

          <div className="commnetsBody">
           
            <CreateCommentForm />

            { comments && comments.map(comment => (
              <Comment key={comment.id} comment={comment} />
            )) }
          </div>
         
        </StyledPostComments>
    )
}