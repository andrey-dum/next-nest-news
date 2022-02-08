import { GetServerSidePropsContext } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React, { ReactElement } from 'react'
import { PostComments } from '../../components/PostComments/PostComments'
import { PostPage } from '../../components/PostPage/PostPage'
import { MainLayout } from '../../layouts/MainLayout'
import { Api } from '../../services/api'
import { IComment, IPost } from '../../types/interfaces'


interface IProps {
  post: IPost
}

export default function Post({ post }: IProps): ReactElement {
  
    return (
        <MainLayout flexColumn contentFullWidth>
            <PostPage 
              post={post}
            />
            
            <PostComments postId={post.id} />
           
        </MainLayout>
    )
}



export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
  try {
      const id = ctx.params?.id;
      const post = await Api(ctx).post.getOne(+id!);

      return {
          props: {
              post
          }
      }

  } catch (error) {
      console.log('Post Page', error);
      return {
          props: {}, redirect: {
              destination: '/',
              permanent: false
          }
      }
  }
} 
