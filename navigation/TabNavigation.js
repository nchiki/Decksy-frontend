import React from 'react';

import { Text, View, Platform } from 'react-native';
import { createBottomTabNavigator, createAppContainer, createStackNavigator, createMaterialTopTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
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
import AlbumsScreen from '../screens/AlbumsScreen';
import Album from '../components/Album';
import CollectionSelection from '../components/utilsCollections/CollectionSelection';

const AlbumsStack = createStackNavigator({
  AlbumsScreen: { screen: AlbumsScreen },
  Album: { screen: Album },
  CollectionSelection: { screen: CollectionSelection },
  CardProfile: { screen: CardProfileScreen },
},
  {
    initialRouteName: 'AlbumsScreen',
  }
);

AlbumsStack.navigationOptions = {
  tabBarLabel: 'Collections',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-browsers` : 'md-browsers'}
    />
  ),
};

export const CollectedCardsStack = createStackNavigator({
  CollectedCards: { screen: HomeScreen },
  QRScanner: { screen: QRCodeScannerScreen },
  CardProfile: { screen: CardProfileScreen },
},
  {
    initialRouteName: 'CollectedCards',
  }
);

CollectedCardsStack.navigationOptions = {
  tabBarLabel: 'Cards',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios' ? 'ios-albums' : 'md-albums'

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


export default createMaterialBottomTabNavigator({
  AlbumsStack,
  CollectedCardsStack,
  ProfileScreenStack,
},
  {
    initialRouteName: "CollectedCardsStack",
    activeColor: '#2970FF',
    inactiveColor: '#ccc',
    barStyle: { backgroundColor: '#ffffff' },
  },
);
/*
const TabNavigator = createMaterialBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarLabel: 'Home',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-home'} />
          </View>),
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarLabel: 'Profile',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-person'} />
          </View>),
        activeColor: '#f60c0d',
        inactiveColor: '#f65a22',
        barStyle: { backgroundColor: '#f69b31' },
      }
    },
    Image: {
      screen: ImageScreen,
      navigationOptions: {
        tabBarLabel: 'History',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-images'} />
          </View>),
        activeColor: '#615af6',
        inactiveColor: '#46f6d7',
        barStyle: { backgroundColor: '#67baf6' },
      }
    },
    Cart: {
      screen: CartScreen,
      navigationOptions: {
        tabBarLabel: 'Cart',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name={'ios-cart'} />
          </View>),
      }
    },
  },
  {
    initialRouteName: "Home",
    activeColor: '#f0edf6',
    inactiveColor: '#226557',
    barStyle: { backgroundColor: '#3BAD87' },
  },
);
*/
