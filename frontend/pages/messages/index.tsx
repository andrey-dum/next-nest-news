import React, { ReactElement } from 'react'
import { MainLayout } from '../../layouts/MainLayout'



interface Props {
    
}

export default function MessagesPage({}: Props): ReactElement {
    return (
        <MainLayout flexColumn>
           <div className="page">
                <div className="pageBody">
                MessagesPage
                </div>
           </div>
        </MainLayout>
    )
}
