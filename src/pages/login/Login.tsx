import React from 'react'

import * as Yup from "yup";
import { useNavigate } from 'react-router-dom';

import styles from './Login.module.css'

import Form from '../../components/forms/Form';
import Input from '../../components/forms/Input/Input';
import Button from '../../components/common/Button';
import Title from '../../components/common/Title';

import {  LoginData, login as loginService } from '../../services/authService';

import { useAuth } from '../../contexts/AuthContexts';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const initialValues:LoginData = {
    email:"",
    password:"",
  };

  const validationSchema = Yup.object().shape({
    email:Yup.string()
      .email("E-mail inválido")
      .required("Email é obrigatorio"),
    password:Yup.string()
    .min(6,"A senha deve ter pelo menos 6 caracteres")
    .required("Senha é obrigatorio"),
  });

  const onSubmit = async(values:LoginData) => {
    try {
      const user = await loginService(values);
      login(user)
      navigate("/");
    } catch (error) {
      alert('Email ou senha invalidos')    
    }
  }

  return (
    <div className={styles.loginWrapper}> 
    
        <Form 
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}              
        >
          {({errors, touched})=> (
              <>
                <Title>Meu Site Pessoal</Title>
                <Input
                  label='Email'
                  name='email'
                  type='email'
                  errors={errors.email}
                  touched={touched.email}                
                />

                <Input
                  label='Password'
                  name='password'
                  type='password'
                  errors={errors.password}
                  touched={touched.password}
                />

                <Button type='submit'>Login</Button>
              </>
          )}

        </Form>

    </div>
  )
}

export default Login

