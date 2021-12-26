import React, { ChangeEvent, useState } from 'react';
import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { loginSchema } from '../../utils/schemas/loginValidation';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Box, TextField, Typography } from '@material-ui/core';
import { FormType } from './AuthDialog';


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

interface IFormInputs {
    email: string
    password: number
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
        // color: ${props => props.theme.palette.primary.main};
        display: inline-block;

        &:hover {
            text-decoration: underline;
            cursor: pointer;
        }
    }
`;



export const AuthForm: React.FC<IProps> = ({handleShowForm}) => {

    // const [data, setData] = useState({
    //     email: "",
    //     password: ""
    // })

    const { register, handleSubmit, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(loginSchema)
      });
      
    const onSubmit = (data: IFormInputs) => console.log(data);

    // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setData({
    //         ...data,
    //         [e.target.name]: e.target.value
    //     })
    // }


  return (
    <StyledAuthForm >
        
        <Box>
            <Typography variant='h5'>Войти через почту</Typography>
            <Box>или <Box className='registerBtn' onClick={() => handleShowForm(FormType.Register)}>зарегистрироваться</Box></Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
            <TextField 
                    placeholder='Email' 
                    label='Email'
                    // name="email" 
                    // onChange={handleChange}
                    fullWidth
                    // required
                    {...register("email")}
                    helperText={errors.email?.message}
                    error={!!errors.email?.message}
                />
                <TextField
                    error={!!errors.password?.message}
                    placeholder='Password' 
                    label='Password'
                    type="password"
                    // onChange={handleChange}
                    // name="password"
                    fullWidth
                    // required
                    {...register("password")}
                    helperText={errors.password?.message}
                />
                <Button variant='contained' type='submit' color="primary">Войти</Button>
                <Button onClick={() => handleShowForm(FormType.Main)} variant='text'>Назад</Button>
        
        </form>
       
    </StyledAuthForm>
  );
}
