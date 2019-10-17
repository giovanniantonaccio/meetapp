import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container } from './styles';
import history from '../../services/history';

const events_list = [
  {
    id: 1,
    title: 'Flutter talks',
    date: '2019-10-27T15:00:00-04:00',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
  {
    id: 2,
    title: 'React Native',
    date: '2019-07-10T15:00:00-04:00',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
  {
    id: 3,
    title: 'NodeJS',
    date: '2019-07-10T15:00:00-04:00',
    image: 'https://camunda.com/img/events/meetup-example.jpg',
    description:
      'O Meetup de React Native é um evento que reúne a comunidade de desenvolvimento mobile utilizando React a fim de compartilhar conhecimento. Todos são convidados. Caso queira participar como palestrante do meetup envie um e-mail para organizacao@meetuprn.com.br.',
    address: 'Rua Guilherme Gembala, 260',
  },
];

export default function Dashboard() {
  console.tron.log(events_list);
  const [events, setEvents] = useState(events_list);

  function handleDetails(event) {
    history.push('/details', { event });
  }

  function handleNewMeetup() {
    history.push('/meetup');
  }

  useEffect(() => {
    // get events from api

    const data = events.map(event => ({
      ...event,
      formatedDate: format(
        parseISO(event.date),
        "d 'de' MMMM 'de' yyyy ', às' HH:mm",
        {
          locale: pt,
        }
      ),
      isPast: isBefore(parseISO(event.date), new Date()),
    }));

    setEvents(data);
  }, []); // eslint-disable-line

  return (
    <Container>
      <div>
        <h1>Meus meetups</h1>
        <button type="button" onClick={() => handleNewMeetup()}>
          <MdAddCircleOutline />
          Novo meetup
        </button>
      </div>
      <ul>
        {events.map(event => (
          <li key={event.id}>
            <div>
              <strong>{event.title}</strong>
              <p>{event.formatedDate}</p>
            </div>
            <MdKeyboardArrowRight onClick={() => handleDetails(event)} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
