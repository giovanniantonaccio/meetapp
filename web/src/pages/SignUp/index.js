import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../../assets/logo.svg';

export default function SignUp() {
  return (
    <>
      <img src={logo} alt="logo" />

      <form action="">
        <input placeholder="Digite o seu nome" />
        <input type="email" placeholder="Digite o seu email" />
        <input type="password" placeholder="Digite a sua senha" />
        <button type="submit">Entrar</button>
      </form>

      <Link to="/">Já tenho conta</Link>
    </>
  );
}
