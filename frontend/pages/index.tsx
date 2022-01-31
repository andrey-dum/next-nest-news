import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { PostItem } from '../components/PostItem/PostItem'
import { MainLayout } from '../layouts/MainLayout'
import { Api } from '../services/api'
import { IPost } from '../types/interfaces'


interface IProps {
  posts: IPost[]
}

const Home: NextPage<IProps> = ({ posts }) => {

  return (
      <MainLayout flexColumn>
        { posts.map(post => (
          <PostItem key={post.id} post={post} />
        )) }
        
      </MainLayout>

  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  
  try {
    const posts = await Api().post.getPosts()

    // store.dispatch(setUser(user))

    return { props: {
        posts
      } 
    }
    
  } catch (error) {

    console.log(error)
    return { props: {
      posts: null
      } 
    }
  }
}

export default Home
