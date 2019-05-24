import React, { Component } from 'react';
import { Text, AppRegistry, View, StyleSheet, ScrollView} from 'react-native';
import TabNavigation from './Navigation/TabNavigation';
const NavigatorTypes = Object.freeze({"stack":1, "tab":2, "drawer":3})

export default class FlexDimensionsBasics extends Component {
  state = {
    navigationType: null
  }

  onNavigationTypeRequested = (navigatorType) => {
    this.setState({navigationType: navigatorType});
  }

  navigationForType = (type) => {
        return <TabNavigation/>
  }

 render() {
  if (this.state.navigationType) {
    return this.navigationForType(this.state.navigationType);
  }
    return (
  
      <View style={{flex: 1}}onStartShouldSetResponder={() => this.onNavigationTypeRequested(NavigatorTypes.tab)}
 >
          <View style={{flex: 2, backgroundColor: 'powderblue', justifyContent: "center", alignItems: "center"}}> 
          <Text style={styles.bigTitle}> RoloDex </Text>
          </View>
          <View style={{flex: 3, backgroundColor: 'white'}} />
        </View>
    
    )}
}

state = {
  hasDoneOnboarding: true
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
// skip this line if using Create React Native App
AppRegistry.registerComponent('rolodex', () => FlexDimensionsBasics);

