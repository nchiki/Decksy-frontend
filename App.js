import React, { Component } from 'react';
import { Text, AppRegistry, View, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';
import { LinearGradient } from 'expo';

import AppNavigation from './navigation/AppNavigation';
const NavigatorTypes = Object.freeze({"stack":1, "tab":2, "drawer":3})

// default initial screen/class
export default class FlexDimensionsBasics extends Component {
  state = {
    navigationType: null
  }

  // Sets state to tab navigation when screen is tapped
  onNavigationTypeRequested = (navigatorType) => {
    this.setState({navigationType: navigatorType});
  }

  navigationForType = (type) => {
    // returns the other screen: see tabNavigation.js
        return <AppNavigation/>
  }

 render() {
   // depending on if we have tapped the screen or not displays welcome screen (change to login in the future)
   // or displays the logged in ones once we tap on the screen
  if (this.state.navigationType) {
    return this.navigationForType(this.state.navigationType);
  }

  const  gradientHeight=500;
  const gradientBackground  = 'purple';
  const data = Array.from({ length: gradientHeight });
  return (
    //on start should set responder acts when tapping the screen
    <View style={{ flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch',}} onStartShouldSetResponder={() => this.onNavigationTypeRequested(NavigatorTypes.tab)}>
      <LinearGradient
        colors={['#4AB3F6', '#A4D8F9']}
        style={{flex: 1, justifyContent: 'center'}}
      >
        <Text style={styles.bigTitle}>RoloDex</Text>
      </LinearGradient>
    </View>
  )}
}

const styles = StyleSheet.create({
  bigTitle: {
    textAlign: 'center',
    color:'white',
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

AppRegistry.registerComponent('rolodex', () => FlexDimensionsBasics);