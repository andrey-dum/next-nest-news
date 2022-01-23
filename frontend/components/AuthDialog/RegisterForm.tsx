import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { Box, TextField, Typography } from '@material-ui/core';
import { FormType } from './AuthDialog';
import { registerValidation } from '../../utils/schemas/registerValidation';
import { useForm } from 'react-hook-form';
import { UserApi } from '../../services/api';
import { CreateUserDto } from '../../services/dto/user-dto';
import { setCookie } from 'nookies';
import { Alert } from '@material-ui/lab';
import { useAppDispatch } from '../../redux/hooks';
import { setUser } from '../../redux/slices/userSlice';


const isEmpty = (data: any) => {
    let res = true;
    for(var key in data) {
        if(data[key] === "") {
            res = true
        } else {
            res = false
        }
    }
    return res
}


interface IProps {
    handleShowForm: (type: FormType) => void;
}

const StyledAuthForm = styled.div`

    .MuiTextField-root {
        margin-bottom: 15px;

    }

    .MuiButton-root {
        margin-top: 15px;
    }

    .registerBtn {
        color: #4eaa84;
        display: inline-block;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;



interface IFormInputs {
    fullName: string;
    email: string
    password: number
}
  


export const RegisterForm: React.FC<IProps> = ({handleShowForm}) => {

    const [errorMsg, setErrorMsg] = useState('');
    const dispatch = useAppDispatch()

    const { register, handleSubmit, formState, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(registerValidation)
      });
      
    const onSubmit = async (dto: CreateUserDto) => {
        try {
            const data = await UserApi.register(dto);
            dispatch(setUser(data))
            setCookie(null, 'token', data.access_token, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/'
            })
            setErrorMsg(''); 
        } catch (error: any) {
            // console.warn('Ошибка при входе', error)
            console.log(error)
            if(error.response) {
                
                setErrorMsg(error.response.data.message);
            }
           
        }
    };


  return (
    <StyledAuthForm >

        <Box>
            <Typography variant='h5'>Регистрация</Typography>
            <Box>Есть аккаунт? <Box className='registerBtn' onClick={() => handleShowForm(FormType.Auth)}>Войти</Box></Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>

            { errorMsg && <Alert severity="error">{errorMsg}</Alert> }

            <TextField 
                placeholder='Name' 
                label='Name'
                // name="name" 
                {...register("fullName")}
                helperText={errors.fullName?.message}
                error={!!errors.fullName?.message}
                fullWidth
            />
            <TextField 
                placeholder='Email' 
                label='Email'
                // name="email" 
                fullWidth
                {...register("email")}
                helperText={errors.email?.message}
                error={!!errors.email?.message}

            />
            <TextField 
                placeholder='Password' 
                label='Password'
                type="password"
                // name="password"
                fullWidth
                {...register("password")}
                helperText={errors.password?.message}
                error={!!errors.password?.message}
            />

        <Button 
            color="primary" 
            variant='contained'
            type='submit'
            disabled={!formState.isValid || formState.isSubmitting}
        
        >
            Регистрация
        </Button>

        <Button onClick={() => handleShowForm(FormType.Main)} variant='text'>Назад</Button>
            
         </form>
       
        
        
    </StyledAuthForm>
  );
}
