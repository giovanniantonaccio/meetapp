import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';

import { Container, Content } from './styles';

import logo from '../../assets/logo.svg';

export default function Header() {
  const user = useSelector(state => state.user.profile);
  const dispatch = useDispatch();

  return (
    <Container>
      <Content>
        <Link to="/dashboard">
          <img src={logo} alt="logo" />
        </Link>

        <aside>
          <div>
            <strong>{user.name}</strong>
            <Link to="/profile">
              <p>Meu perfil</p>
            </Link>
          </div>
          <button type="button" onClick={() => dispatch(signOut())}>
            Sair
          </button>
        </aside>
      </Content>
    </Container>
  );
}
