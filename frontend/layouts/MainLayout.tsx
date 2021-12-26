import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { LeftMenu } from '../components/LeftMenu/LeftMenu';
import { SideComments } from '../components/SideComments/SideComments';

interface MainLayoutProps {
    hideComments?: boolean | undefined;
    hideSidebar?: boolean | undefined;
    contentFullWidth?: boolean;
    flexColumn?: boolean;
}

const StyledMainLayout = styled.div<MainLayoutProps>`
    display: flex;
    height: 100%;
    min-height: 100vh;
    
    background: #f2f2f2;

    .sidebar {
        width: 260px;
    }

    .main {
        flex: 1;
        // background: ${(props) => props.contentFullWidth ? '#ffff' : 'inherit'}; 
        
    }

    .page {
        font-size: 18px;
        background: #fff;
        border-radius: 8px;
        border-top-left-radius: 0;
        border-top-right-radius: 0;
        
        padding-top: 16px;
        padding-bottom: 16px;
        margin-top: 16px;
        margin-bottom: 16px;
        
        .pageBody {
            max-width: 640px;
            margin: 0 auto;
            padding: 15px;
        }
    }

    .content {
        display: flex;
        // padding: 15px 25px;
        max-width: 1000px;
        margin: 0 auto;
       
        width: ${(props) => props.contentFullWidth ? '100%' : '640px'};

        &.flexColumn {
            flex-direction: column;
            
        }
    }

    .rightSide {
        padding: 15px;
        padding-left: 30px;
    }


    .post {
        width: 100%;
        max-width: 640px;
        margin: 0 auto;

        .MuiCardMedia-root {
            height: 200px;
            max-width: 100%;
        }
    }
`;

export const MainLayout: React.FC<MainLayoutProps> = ({
    children,
    hideComments,
    hideSidebar,
    contentFullWidth,
    flexColumn
}) => {
        
    return (
        <StyledMainLayout
            contentFullWidth={contentFullWidth}
        >
            { !hideSidebar && 
                <div className="sidebar">
                    <LeftMenu />
                </div>
            }
           

            <div className={`main`}>
                <div className={`content ${flexColumn ? "flexColumn" : ''}`}>
                    {children}
                </div>
                
            </div>



            { !hideComments &&
                <div className="rightSide">
                    <SideComments />
                </div>
            }

        </StyledMainLayout>
    )
}