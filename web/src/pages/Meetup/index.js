import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';
import DatePicker from './DatePicker';
// import ReactDatePicker from './ReactDatePicker';

// const schema = null;

export default function Meetup() {
  function handleSubmit(data) {
    // dispatch(signInRequest(email, password));
    console.tron.log(data);
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input name="title" type="text" placeholder="Título do meetup" />
        <Input
          name="description"
          type="text"
          multiline
          placeholder="Descrição completa"
        />
        <DatePicker name="date" placeholder="Data do meetup" className="date" />

        <Input name="address" type="text" placeholder="Localização" />
        <button type="submit" className="saveButton">
          Salvar
        </button>
      </Form>
    </Container>
  );
}
