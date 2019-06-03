import React from 'react';
import { createAppContainer, createStackNavigator, createSwitchNavigator } from 'react-navigation';

import TabNavigation from './TabNavigation';
import LoginNavigation from './LoginNavigation';
import CardNavigation from './CardNavigation'; 

export default createAppContainer(createSwitchNavigator(
  {
    Main: {screen: TabNavigation},
    Login: {screen: LoginNavigation},
    CardProfileScreen: {screen: CardNavigation}
  },
  {
    initialRouteName: 'Login',
  }
));
