import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { Images, Metrics } from '../Themes'
import StackNavigation from '../Navigation/StackNavigation'
import TabNavigation from '../Navigation/TabNavigation'
import DrawerNavigation from '../Navigation/DrawerNavigation'

const NavigatorTypes = Object.freeze({"stack":1, "tab":2, "drawer":3})

export default class PickerScreen extends React.Component {

  state = {
    navigationType: null
  }

  onNavigationTypeRequested = (navigatorType) => {
    this.setState({navigationType: navigatorType});
  }

  navigationForType = (type) => {
    switch (type) {
      case NavigatorTypes.stack:
        return <StackNavigation/>
      case NavigatorTypes.tab:
        return <TabNavigation/>
      case NavigatorTypes.drawer:
        return <DrawerNavigation/>
    }
  }

  render() {

    if (this.state.navigationType) {
      return this.navigationForType(this.state.navigationType);
    }

    return (
      <View style={styles.container}>
        <Image style={styles.phoneImage}
          source={Images.phone} />
        <Text style={styles.descText}>Tips & tricks for the basic implementation of three navigators: </Text>

        <Button title="Stack Navigator"
          onPress={() => this.onNavigationTypeRequested(NavigatorTypes.stack)}/>
        <Button title="Tab Navigator"
          onPress={() => this.onNavigationTypeRequested(NavigatorTypes.tab)}/>
        <Button title="Drawer Navigator"
          onPress={() => this.onNavigationTypeRequested(NavigatorTypes.drawer)}/>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  descText: {
    padding: 5,
    textAlign: 'center'
  },
  phoneImage: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    margin: Metrics.doubleBaseMargin,
  }
});
