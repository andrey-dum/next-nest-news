import React from 'react';
import { GetServerSideProps, GetServerSidePropsContext, NextPage } from 'next';

import { CreatePostForm } from '../../components/CreatePostForm/CreatePostForm';
import { MainLayout } from '../../layouts/MainLayout';
import { ParsedUrlQuery } from 'querystring';
import { Api } from '../../services/api';

interface IWritePageProps {

}

const WritePage: NextPage<IWritePageProps> = () => {
    return (
        <MainLayout 
            // contentFullWidth
            hideComments    
        >
            <CreatePostForm />
        </MainLayout>
    )
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    try {
        const id = ctx.params?.id;
        const post = await Api(ctx).post.getOne(+id!);
        const user = await Api(ctx).user.getProfile()

        if(user.id !== post.user?.id) {
            return {
                props: {}, 
                redirect: {
                    destination: '/',
                    permanent: false
                }
            }
        }

        return {
            props: {
                post
            }
        }

    } catch (error) {
        console.log('Write Page', error);
        return {
            props: {}, redirect: {
                destination: '/',
                permanent: false
            }
        }
    }
} 

  
export default WritePage
