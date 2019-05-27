import React from 'react';
import styles from '../styles/Styles';

import {Image, Text, View, StatusBar, Button } from 'react-native';
import BusinessCard from './BusinessCard';
// Profile screen that shows own card
export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Share"
      />
    ),
  };

  render() {
    return (
      <View >
              <BusinessCard />
      </View>
    );
  }
}