import React from 'react';

import { MdEdit, MdDeleteForever, MdToday, MdPinDrop } from 'react-icons/md';
import { Container } from './styles';

export default function Details() {
  return (
    <Container>
      <div className="detailsHeader">
        <h1>Meetup de React Native</h1>
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

      <img
        src="https://camunda.com/img/events/meetup-example.jpg"
        alt="meetup"
      />

      <p>
        O Meetup de React Native é um evento que reúne a comunidade de
        desenvolvimento mobile utilizando React a fim de compartilhar
        conhecimento. Todos são convidados.
        <br />
        <br />
        Caso queira participar como palestrante do meetup envie um e-mail para
        organizacao@meetuprn.com.br.
      </p>

      <div className="detailsFooter">
        <div className="date">
          <MdToday />
          <span>24 de junho, às 20h</span>
        </div>
        <div className="location">
          <MdPinDrop />
          <span>Rua Guilherme Gembala, 260</span>
        </div>
      </div>
    </Container>
  );
}
