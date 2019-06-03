import React from 'react';

import { Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen';
import CardProfileScreen from '../screens/CardProfileScreen';
import TabBarIcon from '../components/TabBarIcon';
import BusinessCard from '../components/BusinessCard';
import CardTemplate from '../components/CardTemplate';
import { Ionicons } from '@expo/vector-icons';

export const CollectedCardsStack = createStackNavigator({
    CollectedCards: {screen: HomeScreen},
    QRScanner: {screen: QRCodeScannerScreen},
    CardProfile: {screen: CardProfileScreen},
  },
  { initialRouteName: 'CollectedCards' }
);

CollectedCardsStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabsStyle: {
      labelStyle: { fontSize: 30 },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-browsers`
          : 'md-browsers'
      }
    />
  ),
};



const ProfileScreenStack = createStackNavigator({
  ProfileScreen: {screen: ProfileScreen},
  CardScreen: {screen : BusinessCard},
});

ProfileScreenStack.navigationOptions = {
  tabBarLabel: 'Profile',
  tabsStyle: {
      labelStyle: { fontSize: 30 },
  },
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-contact' : 'md-contact'}
    />
  ),
};

export default createBottomTabNavigator({
    CollectedCardsStack,
    ProfileScreenStack,
  },
  {
    tabBarOptions: {labelStyle: { fontSize: 14 }}
  }
);
