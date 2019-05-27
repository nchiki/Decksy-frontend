import React from 'react';
import styles from '../styles/Styles';

import {Image, Text, View, StatusBar, Button, share } from 'react-native';

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
      <View style={{ flex: 1}}>
        {/* <View style={{flex: 1, backgroundColor: 'azure', justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.bigTitle}> RoloDex </Text>
          </View> */}
          <View style={{flex:9, alignItems: "center"}} >
            <View style={{top:30}}>
              <Image source={require('../assets/images/card.png')} />
            </View>
          </View>
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