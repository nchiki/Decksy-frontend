import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'
import { Images, Colors, Metrics } from '../Themes'

export default class SampleDrawerScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {

     const drawerOptions = {
        drawerLabel: 'Home',
        drawerIcon: ({ tintColor }) => (
          <MaterialIcons
            name='mood'
            color={tintColor}
            size={Metrics.icons.small}
          />
        ),
      }

     return drawerOptions;
  };

  render() {

    const { params = {} } = this.props.navigation.state;
    const { text = "This is a simple screen!", count = 1, color = Colors.fire } = params;

    return (
      <View style={[ styles.container, { backgroundColor: color } ]}>
        <Text style={styles.text}>{text}</Text>
        <Text style={styles.text}>{count}</Text>
      </View>
    );

  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    color: Colors.snow
  }
});
