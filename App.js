import React, { Component } from 'react';
import { Text, AppRegistry, View, StyleSheet, ScrollView, TextInput, Button, Alert } from 'react-native';

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
  return (
    //on start should set responder acts when tapping the screen
    <View style={{flex: 1}} onStartShouldSetResponder={() => this.onNavigationTypeRequested(NavigatorTypes.tab)}>
      <View style={{flex: 2, backgroundColor: 'powderblue', justifyContent: "center", alignItems: "center"}}>
        <Text style={styles.bigTitle}> RoloDex </Text>
      </View>
      <View style={{flex: 3, backgroundColor: 'white'}} />
    </View>
  )}
}

const styles = StyleSheet.create({
  bigTitle: {
    fontWeight: 'bold',
    fontSize: 30,
  },
  red: {
    color: 'red',
  },
});

AppRegistry.registerComponent('rolodex', () => FlexDimensionsBasics);
