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
        onPress={() => {this.onShare}}
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

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
}