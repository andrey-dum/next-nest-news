import { Divider } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { PostComments } from '../../components/PostComments/PostComments'
import { PostPage } from '../../components/PostPage/PostPage'
import { MainLayout } from '../../layouts/MainLayout'


interface Props {
    
}

export default function ProfilePage({}: Props): ReactElement {
    return (
        <MainLayout flexColumn>
            ProfilePage
           
        </MainLayout>
    )
}
