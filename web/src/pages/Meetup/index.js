import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from '@rocketseat/unform';
import { Container } from './styles';
import DatePicker from '../../components/DatePicker';
import BannerInput from '../../components/BannerInput';

// const schema = null;

export default function Meetup({ location }) {
  function handleSubmit(data) {
    // dispatch(signInRequest(email, password));
    console.tron.log(data);
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={location.state ? location.state.event : null}
      >
        <BannerInput />
        <Input name="title" type="text" placeholder="Título do meetup" />
        <Input
          name="description"
          type="text"
          multiline
          placeholder="Descrição completa"
        />
        <DatePicker
          name="date"
          placeholder="Data do meetup"
          className="date"
          selectedDate={location.state && location.state.event.date}
        />
        <Input name="address" type="text" placeholder="Localização" />
        <button type="submit" className="saveButton">
          Salvar
        </button>
      </Form>
    </Container>
  );
}

Meetup.propTypes = {
  location: PropTypes.shape({
    state: PropTypes.shape({
      event: PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        image: PropTypes.string,
        description: PropTypes.string,
        date: PropTypes.string,
        address: PropTypes.string,
        formatedDate: PropTypes.string,
        isPast: PropTypes.bool,
      }),
    }),
  }).isRequired,
};
