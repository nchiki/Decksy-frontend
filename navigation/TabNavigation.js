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
import TemplatesGallery from '../components/TemplatesGallery';
import EditDetailsScreen from '../screens/EditDetailsScreen';
import LinkScreen from '../screens/LinkScreen';
import RequestsScreen from '../screens/RequestsScreen';
import AddLinkScreen from '../screens/AddLinkScreen';

export const CollectedCardsStack = createStackNavigator({
  CollectedCards: { screen: HomeScreen },
  QRScanner: { screen: QRCodeScannerScreen },
  CardProfile: { screen: CardProfileScreen },
},
  {
    initialRouteName: 'CollectedCards',
    swipeEnabled: true,
  }
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
  ProfileScreen: { screen: ProfileScreen },
  CardScreen: { screen: BusinessCard },
  CardTemplateScreen: { screen: CardTemplate },
  EditDetailsScreen: { screen: EditDetailsScreen },
  LinkScreen: { screen: LinkScreen },
  RequestsScreen: { screen: RequestsScreen },
  TemplatesGallery: { screen: TemplatesGallery },
  AddLink: { screen: AddLinkScreen },
},
);

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
},
  {
    tabBarOptions: { labelStyle: { fontSize: 14 } }
  }
);
