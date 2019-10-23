import React from 'react';
import PropTypes from 'prop-types';
import { object, string, date } from 'yup';
import { Form, Input } from '@rocketseat/unform';
import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { toast } from 'react-toastify';
import history from '../../services/history';

import api from '../../services/api';

import DatePicker from '../../components/DatePicker';
import BannerInput from '../../components/BannerInput';

import { Container } from './styles';

const schema = object().shape({
  banner_id: string().required('Banner obrigatório'),
  name: string().required('Título obrigatório'),
  description: string().required('Descrição obrigatória'),
  date: date().required('Data obrigatória'),
  location: string().required('Localização obrigatória'),
});

export default function Meetup({ location }) {
  async function handleSubmit(data) {
    let result = null;

    try {
      if (location.state) {
        result = await api.put(`meetups/${location.state.event.id}`, data);
      } else {
        result = await api.post('meetups', data);
      }

      const event = {
        ...result.data,
        formatedDate: format(
          parseISO(result.data.date),
          "d 'de' MMMM 'de' yyyy ', às' HH:mm",
          {
            locale: pt,
          }
        ),
        isPast: isBefore(parseISO(result.data.date), new Date()),
      };

      toast.success('Meetup salvo com sucesso');
      history.push('/details', { event });
    } catch (err) {
      console.tron.log(err);
      toast.error(
        'Houve um erro ao salvar seu meetup, verfique os dados preenchidos'
      );
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit}
        initialData={location.state ? location.state.event : null}
        schema={schema}
      >
        <BannerInput name="banner_id" />
        <Input name="name" type="text" placeholder="Título do meetup" />
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
        <Input name="location" type="text" placeholder="Localização" />
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
        name: PropTypes.string,
        banner: PropTypes.object,
        description: PropTypes.string,
        date: PropTypes.string,
        location: PropTypes.string,
        formatedDate: PropTypes.string,
        isPast: PropTypes.bool,
      }),
    }),
  }).isRequired,
};
