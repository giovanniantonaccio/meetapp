import React, { useState, useEffect } from 'react';
import { MdAddCircleOutline, MdKeyboardArrowRight } from 'react-icons/md';
import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { Container } from './styles';
import history from '../../services/history';
import api from '../../services/api';

export default function Dashboard() {
  const [events, setEvents] = useState([]);

  function handleDetails(event) {
    history.push('/details', { event });
  }

  function handleNewMeetup() {
    history.push('/meetup');
  }

  useEffect(() => {
    async function loadMeetups() {
      const result = await api.get('/schedule');
      const data = result.data.map(event => ({
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
    }

    loadMeetups();
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
              <strong>{event.name}</strong>
              <p>{event.formatedDate}</p>
            </div>
            <MdKeyboardArrowRight onClick={() => handleDetails(event)} />
          </li>
        ))}
      </ul>
    </Container>
  );
}
