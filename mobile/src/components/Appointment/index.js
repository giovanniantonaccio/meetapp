import React, { useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import { parseISO, format, isBefore } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Button from '../Button';

import { Container, Banner, Info, Name, InfoTextRow, InfoText } from './styles';

export default function Appointment({ data, onButtonPress, cancel }) {
  const appointment = data.meetup ? data.meetup : data;

  const dateParsed = useMemo(
    () =>
      format(parseISO(appointment.date), "dd 'de' MMMM', às' H'h'", {
        locale: pt,
      }),
    [appointment.date]
  );

  const isPast = useMemo(
    () => isBefore(parseISO(appointment.date), new Date()),
    [appointment.date]
  );

  return (
    <Container past={isPast}>
      <Banner
        source={{
          uri: appointment.banner.url,
        }}
      />
      <Info>
        <Name>{appointment.name}</Name>
        <InfoTextRow>
          <Icon name="today" size={16} color="#999" />
          <InfoText>{dateParsed}</InfoText>
        </InfoTextRow>
        <InfoTextRow>
          <Icon name="place" size={16} color="#999" />
          <InfoText>{appointment.location}</InfoText>
        </InfoTextRow>
        <InfoTextRow last>
          <Icon name="person" size={16} color="#999" />
          <InfoText>Organizador: {appointment.user.name}</InfoText>
        </InfoTextRow>
        {!isPast && (
          <Button background="#d44059" onPress={onButtonPress}>
            {cancel ? 'Cancelar inscrição' : 'Realizar inscrição'}
          </Button>
        )}
      </Info>
    </Container>
  );
}

Appointment.propTypes = {
  data: PropTypes.shape({}).isRequired,
  cancel: PropTypes.bool,
  onButtonPress: PropTypes.func.isRequired,
};

Appointment.defaultProps = {
  cancel: false,
};
