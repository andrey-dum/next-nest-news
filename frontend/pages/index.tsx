import type { NextPage } from 'next'
import Head from 'next/head'
import { PostItem } from '../components/PostItem/PostItem'
import { MainLayout } from '../layouts/MainLayout'


const posts = [
  {
    id: 1,
    title: 'Shrimp and Chorizo Paella 1',
    text: `This impressive paella is a perfect party dish and a fun meal to cook together with your
    guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
    author: 'author 1',
  },
  {
    id: 2,
    title: '2222222222222222',
    text: `This impressive paella is a perfect party dish and a fun meal to cook together with your
    guests. Add 1 cup of frozen peas along with the mussels, if you like.`,
    author: 'author 2',
  },
]

const Home: NextPage = () => {
  return (
      <MainLayout flexColumn>
        { posts.map(post => (
          <PostItem key={post.id} post={post} />
        )) }
        
      </MainLayout>

  )
}

export default Home
