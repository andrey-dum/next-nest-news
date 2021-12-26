import React from 'react';
import { TextField } from '@material-ui/core';
import { NextPage } from 'next';

import { CreatePostForm } from '../components/CreatePostForm/CreatePostForm';
import { MainLayout } from '../layouts/MainLayout';


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

  
export default WritePage
