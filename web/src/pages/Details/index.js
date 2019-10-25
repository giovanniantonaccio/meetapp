import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { MdEdit, MdDeleteForever, MdToday, MdPinDrop } from 'react-icons/md';
import { toast } from 'react-toastify';
import { Container } from './styles';
import history from '../../services/history';
import api from '../../services/api';

export default function Details({ location }) {
  const { event } = location.state;
  const [bannerImage, setBannerImage] = useState('');

  function handleEdit() {
    history.push('/meetup', { event });
  }

  async function handleDelete() {
    await api.delete(`/meetups/${event.id}`);
    toast.success('Meetup cancelado!');
    history.push('/dashboard');
  }

  useEffect(() => {
    async function getDetails() {
      const response = await api.get(`meetups/${event.id}`);

      setBannerImage(response.data.banner.url);
    }
    getDetails();
  }, []); // eslint-disable-line

  return (
    <Container>
      <div className="detailsHeader">
        <h1>{event.name}</h1>
        <div className="buttonRow">
          <button
            type="button"
            className="edit"
            onClick={() => handleEdit()}
            disabled={event.isPast}
          >
            <MdEdit />
            Editar
          </button>
          <button
            type="button"
            className="delete"
            onClick={() => handleDelete()}
            disabled={event.isPast}
          >
            <MdDeleteForever />
            Cancelar
          </button>
        </div>
      </div>

      <img src={bannerImage} alt="meetup" />

      <p>{event.description}</p>

      <div className="detailsFooter">
        <div className="date">
          <MdToday />
          <span>{event.formatedDate}</span>
        </div>
        <div className="location">
          <MdPinDrop />
          <span>{event.location}</span>
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
        name: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
        formatedDate: PropTypes.string,
        isPast: PropTypes.bool,
        banner: PropTypes.object,
      }),
    }),
  }).isRequired,
};
