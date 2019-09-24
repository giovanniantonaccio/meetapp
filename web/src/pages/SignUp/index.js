import React from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { object, string } from 'yup';

import logo from '../../assets/logo.svg';

const schema = object().shape({
  name: string().required('O nome é obrigatório'),
  email: string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  password: string()
    .min(6, 'A senha precisa de no mínimo 6 digitos')
    .required('A senha é obrigatória'),
});

export default function SignUp() {
  function handleSubmit({ name, email, password }) {
    console.tron.log(name, email, password);
  }

  return (
    <>
      <img src={logo} alt="logo" />

      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="name" placeholder="Digite o seu nome" />
        <Input name="email" type="email" placeholder="Digite o seu email" />
        <Input
          name="password"
          type="password"
          placeholder="Digite a sua senha"
        />
        <button type="submit">Entrar</button>
        <Link to="/">Já tenho conta</Link>
      </Form>
    </>
  );
}
