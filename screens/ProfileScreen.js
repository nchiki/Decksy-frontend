import React from 'react';

import { View, Text, Image, StyleSheet, TouchableOpacity,  StatusBar, share } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { Divider, Card,  Button} from 'react-native-elements';

import CardTemplate from '../components/CardTemplate';
import styles from '../styles/Styles';

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
      <CardTemplate navigation={this.props.navigation} />
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
