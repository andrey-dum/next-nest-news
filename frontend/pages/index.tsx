import type { GetServerSideProps, NextPage } from 'next'
import Head from 'next/head'
import { PostItem } from '../components/PostItem/PostItem'
import { MainLayout } from '../layouts/MainLayout'
import { wrapper } from '../redux/store'
import { parseCookies } from 'nookies';
import { UserApi } from '../services/api'
import { setUser } from '../redux/slices/userSlice'


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

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(store => async (ctx) => {
  
//   try {

//     const {token} = parseCookies(ctx)
//     const user = await UserApi.getProfile(token)

//     store.dispatch(setUser(user))

//     return { props: {} }
    
//   } catch (error) {

//     console.log(error)
//     return { props: {} }

//   }
// })

export default Home
