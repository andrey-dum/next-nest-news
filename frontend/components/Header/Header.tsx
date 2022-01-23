import React, { useState, useMemo } from 'react';
import styled from 'styled-components';
import { Avatar, Button, IconButton, TextField, Typography } from '@material-ui/core';
import { AddOutlined, CheckOutlined, Menu } from '@material-ui/icons';
import Link from 'next/link'

import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import { IUser } from '../../types/interfaces';
import { AuthDialog } from '../AuthDialog/AuthDialog';
import { selectUserData } from '../../redux/slices/userSlice';
import { useAppSelector } from '../../redux/hooks';

const StyledHeader = styled.div`
    background: ${props => props.theme.palette.primary.main};
    // background: #d0c5fa;
    padding: 10px 15px;
    display: flex;
    align-items: center;
    width: 100%;

    .drawerIcon {
        display: flex;
        margin-right: 10px;
    }

    .logo {
        font-weight: 700;
        font-size: 22px;
        margin-right: 20px;
    }

        
    .MuiTextField-root {
        margin-right: 18px;
   
        .MuiOutlinedInput-input {
            padding: 10px 14px;
            background: rgba(0, 0, 0, 0.07);
        }

    }

    .MuiButton-label {
        text-transform: none;
        font-weight: 600;
    }

    .userMenu {
        display: flex;
    }

    .spacer {
        margin: auto;
    }
`;

const user: IUser = {
    fullname: "Andrey",
    avatarUrl: ""
}


export const Header: React.FC = () => {
    // const [login, setLogin] = useState(false);

    const user = useAppSelector(selectUserData)

    const followIcon = useMemo(
        () => user ? <AddOutlined /> : <CheckOutlined />
    , [user])

    const [open, setOpen] = React.useState(false);

      const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };
    
        
    return (
        <StyledHeader
        >

            <div className="drawerIcon">
                <IconButton aria-label="Menu" >
                    <Menu />
                </IconButton>
            </div>

            <div className="logo">
                <Link href="/">Next</Link>
            </div>

           <TextField variant="standard" placeholder="Поиск"/>

            { user 
                &&  <Button variant="contained"><Link href="/write">Новая запись</Link></Button> }
            

            <div className="spacer" />

            <div className="userMenu">
                <IconButton 
                    aria-label="NotificationsNoneIcon"
                >
                    <NotificationsNoneIcon />
                </IconButton>
                { user ? 
                    <>
                        <IconButton aria-label="ChatBubbleOutlineIcon">
                            <ChatBubbleOutlineIcon />
                        </IconButton>
                       
                        <Avatar alt="avatar" src="data:image/png;base64,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" />
                    </>
                :
                    <Button 
                        className="loginBtn" 
                        startIcon={<PermIdentityIcon />}
                        onClick={handleClickOpen}
                    >
                        <Typography>Войти</Typography>
                    </Button>
                }

            </div>
            <AuthDialog 
                open={open}
                handleClose={handleClose}
            />

        </StyledHeader>
    )
}