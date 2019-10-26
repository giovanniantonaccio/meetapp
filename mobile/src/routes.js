// import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
  // createStackNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

import Meetups from './pages/Meetups';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Meetups,
            Profile,
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#fff',
              inactiveTintColor: 'rgba(255,255,255,0.5)',
              style: {
                backgroundColor: '#402845',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
