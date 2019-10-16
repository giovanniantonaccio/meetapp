import React from 'react';
import { Link } from 'react-router-dom';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { Container } from './styles';
import history from '../../services/history';

const events = [
  {
    id: 1,
    title: 'Flutter talks',
    date: '24 de Junho, às 20h',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
  {
    id: 2,
    title: 'React Native',
    date: '24 de Junho, às 20h',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
  {
    id: 3,
    title: 'NodeJS',
    date: '24 de Junho, às 20h',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
];

export default function Dashboard() {
  function handleDetails(event) {
    history.push('/details', { event });
  }

  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <Link to="meetup">
          <button type="button">
            <MdAddCircleOutline />
            Novo meetup
          </button>
        </Link>
      </div>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <p>{event.date}</p>
            </div>
            <MdKeyboardArrowRight onClick={() => handleDetails(event)} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
