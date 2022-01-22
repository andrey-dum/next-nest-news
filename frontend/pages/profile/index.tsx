import React, { ReactElement } from 'react'
import { MainLayout } from '../../layouts/MainLayout'

interface Props {
    
}

export default function Profile({}: Props): ReactElement {
    return (
        <MainLayout flexColumn>
           Profile
        </MainLayout>
    )
}
