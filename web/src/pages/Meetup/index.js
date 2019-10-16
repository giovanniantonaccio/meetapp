import React from 'react';

import { Form, Input } from '@rocketseat/unform';

import { Container } from './styles';
import DatePicker from './DatePicker';

const schema = null;

export default function Meetup() {
  function handleSubmit(data) {
    // dispatch(signInRequest(email, password));
    console.tron.log(data);
  }

  return (
    <Container>
      <Form schema={schema} onSubmit={handleSubmit}>
        <Input name="title" type="text" placeholder="Título do meetup" />
        <Input
          name="description"
          type="text"
          multiline
          placeholder="Descrição completa"
        />
        <DatePicker name="date" />

        {/* <Input name="date" type="date" placeholder="Data do meetup" /> */}
        <Input name="address" type="text" placeholder="Localização" />
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
