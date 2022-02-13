import React, { useEffect, useMemo } from 'react';
import { Comment } from '../Comment/Comment';
import { IComment } from '../../types/interfaces'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { CreateCommentForm } from '../CreateCommentForm/CreateCommentForm';
import styled from 'styled-components';
import { Divider } from '@material-ui/core';
import { useAppSelector } from '../../redux/hooks';
import { selectUserData } from '../../redux/slices/userSlice';
import { Api } from '../../services/api';

interface IProps {
  postId: number;
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

export const PostComments: React.FC<IProps> = ({postId}) => {

  // const commentsCount = useMemo(() => comments.length || 0, [comments])
  const [value, setValue] = React.useState(0);
  const [comments, setComments] = React.useState([] as IComment[]);

  useEffect(() => {
    (async () => {
      try {
        const data = await Api().comment.getComments(Number(postId));
        setComments(data)
      } catch (error) {
        console.warn('Fetch comments', error)
      }
    })();

  }, [])

  const user = useAppSelector(selectUserData)

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const addComment = (obj: IComment) => {
    setComments((prev) => [...prev, obj])
  }

  const onRemoveComment = (id: number) => {
    setComments((prev) => prev.filter(obj => obj.id !== id))
  }

  

    return (
        <StyledPostComments className="postComments">
         
          
          <div className="commnetsHeader">
            {/* <h3>{ commentsCount } Комментария</h3> */}
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
           
           {  !!user && <CreateCommentForm addComment={addComment} /> }

            { comments && comments.map(comment => (
              <Comment 
                key={comment.id} 
                comment={comment}
                onRemoveComment={onRemoveComment}
                
              />
            )) }
          </div>
         
        </StyledPostComments>
    )
}