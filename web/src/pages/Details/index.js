import React from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever, MdToday, MdPinDrop } from 'react-icons/md';
import { Container } from './styles';

export default function Details({ location }) {
  const { event } = location.state;
  console.tron.log(event);
  return (
    <Container>
      <div className="detailsHeader">
        <h1>{event.title}</h1>
        <div className="buttonRow">
          <button type="button" className="edit">
            <MdEdit />
            Editar
          </button>
          <button type="button" className="delete">
            <MdDeleteForever />
            Cancelar
          </button>
        </div>
      </div>

      <img src={event.image} alt="meetup" />

      <p>{event.description}</p>

      <div className="detailsFooter">
        <div className="date">
          <MdToday />
          <span>{event.date}</span>
        </div>
        <div className="location">
          <MdPinDrop />
          <span>{event.address}</span>
        </div>
      </div>
    </Container>
  );
}

Details.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      event: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        address: PropTypes.string,
      }),
    }),
  }).isRequired,
};
