import React from 'react';

import { Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import QRCodeScannerScreen from '../screens/QRCodeScannerScreen'
import TabBarIcon from '../components/TabBarIcon';

import { Ionicons } from '@expo/vector-icons';

export const CollectedCardsStack = createStackNavigator({
    CollectedCards: {screen: HomeScreen},
    QRScanner: {screen: QRCodeScannerScreen},
  },
  { initialRouteName: 'CollectedCards' }
);

CollectedCardsStack.navigationOptions = {
  tabBarLabel: 'Cards',
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
  Profile: ProfileScreen,
});

ProfileScreenStack.navigationOptions = {
  tabBarLabel: 'Profile',
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
});
