import React, { ChangeEvent, useState } from 'react';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { Box, TextField, Typography } from '@material-ui/core';
import { FormType } from './AuthDialog';
import { registerValidation } from '../../utils/schemas/registerValidation';
import { useForm } from 'react-hook-form';

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
    fullname: string;
    email: string
    password: number
}
  


export const RegisterForm: React.FC<IProps> = ({handleShowForm}) => {

    // const [data, setData] = useState({
    //     email: "",
    //     password: ""
    // })

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setData({
    //         ...data,
    //         [e.target.name]: e.target.value
    //     })
    // }

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(registerValidation)
      });
      
    const onSubmit = (data: IFormInputs) => console.log(data);


  return (
    <StyledAuthForm >

<       Box>
            <Typography variant='h5'>Регистрация</Typography>
            <Box>Есть аккаунт? <Box className='registerBtn' onClick={() => handleShowForm(FormType.Auth)}>Войти</Box></Box>
        </Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                placeholder='Name' 
                label='Name'
                // name="name" 
                {...register("fullname")}
                helperText={errors.fullname?.message}
                error={!!errors.fullname?.message}
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
         </form>
       
        <Button color="primary" variant='contained'>Регистрация</Button>
        <Button onClick={() => handleShowForm(FormType.Main)} variant='text'>Назад</Button>
        
    </StyledAuthForm>
  );
}
