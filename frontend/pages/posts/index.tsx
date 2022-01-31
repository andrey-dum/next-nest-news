import { Divider } from '@material-ui/core'
import React, { ReactElement } from 'react'
import { MainLayout } from '../../layouts/MainLayout'



interface Props {
    
}

export default function Post({}: Props): ReactElement {
    return (
        <MainLayout flexColumn>
            <Divider />
          
        </MainLayout>
    )
}
