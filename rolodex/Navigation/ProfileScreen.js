import React from 'react';
import styles from './HomeStyles';

import {Image, Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';


// Profile screen that shows own card
export default class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1}}>
        <View style={{flex: 1, backgroundColor: 'azure', justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.bigTitle}> RoloDex </Text>
          </View>
          <View style={{flex:9, alignItems: "center"}} >
            <View style={{top:30}}>
              <Image source={require('./card.png')} />
            </View>
        </View>
      </View>
    );
  }
}