import React, { ChangeEvent, useState } from 'react';
import { useForm } from "react-hook-form";
// import { yupResolver } from '@hookform/resolvers/yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';
import { loginSchema } from '../../utils/schemas/loginValidation';
import Button from '@material-ui/core/Button';
import styled from 'styled-components';
import { Box, TextField, Typography } from '@material-ui/core';
import { FormType } from './AuthDialog';
import { setCookie } from 'nookies';
import { LoginUserDto } from '../../services/dto/user-dto';
import { UserApi } from '../../services/api';
import Alert from '@material-ui/lab/Alert';


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

    const [errorMsg, setErrorMsg] = useState('');


    const { register, handleSubmit, formState, formState: { errors } } = useForm<IFormInputs>({
        mode: 'onChange',
        resolver: yupResolver(loginSchema)
      });
      
      const onSubmit = async (dto: LoginUserDto) => {
        try {
            const data = await UserApi.login(dto);
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
            <Typography variant='h5'>Войти через почту</Typography>
            <Box>или <Box className='registerBtn' onClick={() => handleShowForm(FormType.Register)}>зарегистрироваться</Box></Box>
        </Box>

        { errorMsg && <Alert severity="error">{errorMsg}</Alert> }

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
                <Button 
                    variant='contained' 
                    type='submit' 
                    color="primary"
                    disabled={!formState.isValid || formState.isSubmitting}
                    >
                        Войти
                </Button>
                <Button onClick={() => handleShowForm(FormType.Main)} variant='text'>Назад</Button>
        
        </form>
       
    </StyledAuthForm>
  );
}
