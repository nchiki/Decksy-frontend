import React from 'react';

import { Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';
import TabBarIcon from '../components/TabBarIcon';

import { Ionicons } from '@expo/vector-icons';

const CollectedCardsStack = createStackNavigator({
  CollectedCards: HomeScreen,
});

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

const LinksStack = createStackNavigator({
  Links: ProfileScreen,
});

LinksStack.navigationOptions = {
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
  LinksStack,
}); 
