import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import { AppDialog } from '../../ui/AppDialog/AppDialog';
import { Box, Typography } from '@material-ui/core';
import { Facebook, Twitter, Apple } from '@material-ui/icons';
import styled from 'styled-components';
import { AuthForm } from './AuthForm';
import { RegisterForm } from './RegisterForm';




interface Props {
    open: boolean;
    handleClose: () => void;
}

const StyledAppDialog = styled(AppDialog)`
    .MuiDialogTitle-root {
        text-align: center;
    }
    .content {
        width: 60%;
        margin: 0 auto;
    }

    .mainButtons {
        .MuiButton-root {
            margin-bottom: 10px;
        }
    }

    .bottomBtns {
        display: flex;
        justify-content: space-between;
    }

    .mainAuth {
        .MuiButton-root {
            box-shadow: 0 1px 2px rgb(0 0 0 / 8%), inset 0 0 0 1px rgb(0 0 0 / 6%), inset 0 -1px 0 rgb(0 0 0 / 12%), inset 1px 0 0 rgb(0 0 0 / 6%), inset -1px 0 0 rgb(0 0 0 / 6%);
            font-weight: 500;
        }
    }

    

`;

export enum FormType {
    Main = 'main',
    Auth = 'auth',
    Register = 'register'

}


export const AuthDialog: React.FC<Props> = ({ open, handleClose }) => {
    
    const [formType, setFormType] = useState<FormType>(FormType.Register);

    const handleShowForm = (type: FormType) => {
        setFormType(type);
    }

  return (
    <StyledAppDialog open={open} handleClose={handleClose} >
        <div className="content">
            { formType === FormType.Auth && <AuthForm handleShowForm={handleShowForm} /> }
            { formType === FormType.Register && <RegisterForm handleShowForm={handleShowForm} /> }
            { formType === FormType.Main &&
            <div className='mainAuth'>
                <Typography variant='h5' paragraph align='center'>Вход</Typography>
                <div className="mainButtons">
                    <Button fullWidth>
                        Вконтакте
                    </Button>
                    <Button fullWidth onClick={() => handleShowForm(FormType.Auth)}>
                        Через почту
                    </Button>
                    <Button fullWidth>
                        Google
                    </Button>
                </div>
                <Box className='bottomBtns'>
                    <Button>
                    <Facebook />
                    </Button>
                    <Button>
                    <Twitter />
                    </Button>
                    <Button>
                        <Apple />
                    </Button>
                </Box>
            </div>
        }
        </div>
    </StyledAppDialog>
  );
}
