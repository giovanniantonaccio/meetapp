import React, { useState, useEffect, useMemo } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { getTimeZone } from 'react-native-localize';
import { withNavigationFocus } from 'react-navigation';
import { format, subDays, addDays } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';
import PropTypes from 'prop-types';

import api from '../../services/api';

import Header from '../../components/Header';
import Background from '../../components/Background';
import Appointment from '../../components/Appointment';

import {
  Container,
  DateContainer,
  DateText,
  List,
  EmptyText,
  EmptyContainer,
} from './styles';

function Meetups({ isFocused }) {
  const [meetups, setMeetups] = useState([]);
  const [date, setDate] = useState(new Date());
  const [page, setPage] = useState(1);

  const dateFormatted = useMemo(
    () => format(date, "d 'de' MMMM", { locale: pt }),
    [date]
  );

  async function loadAppointments() {
    const timezone = getTimeZone();
    const response = await api.get(
      `meetups?page=1&date=${date.toISOString()}&timezone=${timezone}`
    );

    setMeetups(response.data);
  }

  async function loadMoreAppointments() {
    if (meetups.length % 10 === 0) {
      const timezone = getTimeZone();

      const response = await api.get(
        `meetups?page=${page +
          1}&date=${date.toISOString()}&timezone=${timezone}`
      );

      setMeetups([...meetups, ...response.data]);
      setPage(page + 1);
    }
  }

  useEffect(() => {
    if (isFocused) {
      setPage(1);
      loadAppointments();
    }
  }, [date, isFocused]);

  function feedback(response) {
    let msg = 'Erro ao se inscrever';
    if (response === 'User is already registered to this meetup') {
      msg = 'Você já está inscrito, agora é só esperar o dia do evento!';
    } else if (
      response === 'User can`t registrate to a meetup where he is the owner'
    ) {
      msg = 'Você não pode se inscrever em meetups em que é o organizador';
    } else if (
      response === 'User is enrolled to another meetup at the same time'
    ) {
      msg = 'Você já está inscrito em outro evento no mesmo horário';
    }

    Alert.alert(msg);
  }

  async function handleRegistration(id) {
    console.tron.log(meetups);
    console.tron.log(id);
    Alert.alert(
      'Confirmar inscrição',
      'Deseja confirmar a sua inscrição para o meetup?',
      [
        {
          text: 'Cancelar',
          onPress: () => {},
        },
        {
          text: 'Confirmar',
          onPress: async () => {
            try {
              await api.post(`registrations/${id}`);
              Alert.alert('Você se inscreveu com sucesso!');
            } catch (err) {
              feedback(err.response.data.error);
            }
          },
        },
      ]
    );
  }

  function handlePrevDay() {
    setDate(subDays(date, 1));
    setPage(1);
  }

  function handleNextDay() {
    setDate(addDays(date, 1));
    setPage(1);
  }

  return (
    <Background>
      <Header />
      <Container>
        <DateContainer>
          <TouchableOpacity onPress={handlePrevDay}>
            <Icon name="keyboard-arrow-left" size={30} color="#fff" />
          </TouchableOpacity>
          <DateText>{dateFormatted}</DateText>
          {/* <Date>10/10</Date> */}
          <TouchableOpacity onPress={handleNextDay}>
            <Icon name="keyboard-arrow-right" size={30} color="#fff" />
          </TouchableOpacity>
        </DateContainer>
        {meetups.length > 0 ? (
          <List
            data={meetups}
            keyExtractor={item => String(item.id)}
            onEndReachedThreshold={0.2}
            onEndReached={loadMoreAppointments}
            // onMomentumScrollBegin={() => setMomentum(false)}
            renderItem={({ item }) => (
              <Appointment
                onButtonPress={() => handleRegistration(item.id)}
                data={item}
              />
            )}
          />
        ) : (
          <EmptyContainer>
            <EmptyText>Sem meetups nesse dia</EmptyText>
          </EmptyContainer>
        )}
      </Container>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="list" size={20} color={tintColor} />
);

Meetups.navigationOptions = {
  tabBarLabel: 'Meetups',
  tabBarIcon,
  header: <Header />,
  headerMode: 'float',
};

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Meetups.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Meetups);
