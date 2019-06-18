import React, { Component } from 'react';
import { Text, AppRegistry, View, StyleSheet, ScrollView, TextInput, Button, Alert, ActivityIndicator, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo';

import AppNavigation from './navigation/AppNavigation';
const NavigatorTypes = Object.freeze({"stack":1, "tab":2, "drawer":3})

const logoText = require('./assets/images/text-only-white.png');
const logoImage = require('./assets/images/logo-white.png');

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

  //background #2970FF

  return (
    //on start should set responder acts when tapping the screen
    <View style={{ flex: 1,
      backgroundColor: '#2970FF',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'stretch'
    }}
    onStartShouldSetResponder={() => this.onNavigationTypeRequested(NavigatorTypes.tab)}
    >
    <ImageBackground source={require('./assets/images/splash.png')}  style={{width: '100%', height: '100%'}}>
    </ImageBackground>
    </View>
  )}
}


AppRegistry.registerComponent('rolodex', () => FlexDimensionsBasics);
