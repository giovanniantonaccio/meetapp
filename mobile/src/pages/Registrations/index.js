import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import { withNavigationFocus } from 'react-navigation';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Header from '../../components/Header';
import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import { Container, List, EmptyContainer, EmptyText } from './styles';

function Registrations({ isFocused }) {
  const [appointments, setAppointments] = useState([]);

  async function loadAppointments() {
    const response = await api.get('registrations');

    setAppointments(response.data);
  }

  useEffect(() => {
    if (isFocused) {
      loadAppointments();
    }
  }, [isFocused]);

  async function handleCancel(id) {
    console.tron.log(appointments);
    console.tron.log(id);
    Alert.alert(
      'Cancelar inscrição',
      'Realmente deseja cancelar a sua inscrição?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            await api.delete(`registrations/${id}`);

            await loadAppointments();
          },
        },
      ]
    );
  }

  return (
    <Background>
      <Header />
      <Container>
        {appointments.length > 0 ? (
          <List
            data={appointments}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <Appointment
                onButtonPress={() => handleCancel(item.id)}
                data={item}
                cancel
              />
            )}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Você não está inscrito em nenhum evento</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="local-offer" size={20} color={tintColor} />
);

Registrations.navigationOptions = {
  tabBarLabel: 'Inscrições',
  tabBarIcon,
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Registrations.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Registrations);
