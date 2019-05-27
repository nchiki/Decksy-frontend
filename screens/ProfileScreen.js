import React from 'react';
import styles from '../styles/Styles';

import {Image, Text, View, StatusBar } from 'react-native';

// Profile screen that shows own card
export default class ProfileScreen extends React.Component {

  static navigationOptions = {
    title: 'Profile',
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
}