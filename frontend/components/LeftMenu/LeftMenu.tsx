import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import NewReleasesIcon from '@material-ui/icons/NewReleases';
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router';

const StyledMenu = styled.div`
  
    a {
        display: flex;
        align-items: center;
    }
`;

const menu = [
    {
        id: 1,
        path: "/",
        text: "Лента",
        icon: <NewReleasesIcon />
    },
    {
        id: 2,
        path: "/messages",
        text: "Сообщения",
        icon:  <MailOutlineIcon />
    },
    {
        id: 3,
        path: "/posts",
        text: "Рейтинг",
        icon:  <StarHalfIcon />
    },
    {
        id: 4,
        path: "/follows",
        text: "Подписки",
        icon:  <BookmarkBorderIcon />
    },
]


export const LeftMenu: React.FC = () => {

    const router = useRouter()


    return (
        <StyledMenu
        
        >
            <List component="nav" aria-label="main mailbox folders">
                { menu.map(item => (
                    <ListItem 
                        key={item.id} 
                        button 
                        selected={router.asPath === item.path}
                        
                    >
                        <Link href={item.path}>
                            <a>
                                <ListItemIcon>
                                    {item.icon}
                                </ListItemIcon>
                                <ListItemText primary={item.text} />
                            </a>
                        </Link>
                    </ListItem>
                ))}
            </List>
        </StyledMenu>
    )
}