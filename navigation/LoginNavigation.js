import React from 'react';
import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen'
import SignUpScreen from '../screens/SignUpScreen'

export default createStackNavigator(
  {
    Login: LoginScreen,
    SignUp: SignUpScreen,
  },
  {
    initialRouteName: 'Login'
  }
);
