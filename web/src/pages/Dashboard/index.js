import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';

export default function Dashboard() {
  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <button type="button">
          <MdAddCircleOutline />
          Novo meetup
        </button>
      </div>
      <ul>
        <li>
          <div>
            <strong>Meetup de React Native</strong>
            <p>24 de Junho, às 20h</p>
          </div>
          <Link to="/details/1">
            <MdKeyboardArrowRight />
          </Link>
        </li>
        <li>
          <div>
            <strong>Flutter talks</strong>
            <p>24 de Junho, às 20h</p>
          </div>
          <Link to="/details/2">
            <MdKeyboardArrowRight />
          </Link>
        </li>
        <li>
          <div>
            <strong>
              Titulo muito grande de varias linhas que nao cabe em uma linha e
              precisa quebrar em varias linhas
            </strong>
            <p>24 de Setembro, às 20h</p>
          </div>
          <Link to="/details/3">
            <MdKeyboardArrowRight />
          </Link>
        </li>
      </ul>
    </Container>
  );
}
