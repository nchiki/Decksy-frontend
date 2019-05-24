import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';

import { MaterialIcons } from '@expo/vector-icons'
import { Images, Colors, Metrics } from '../Themes'

export default class SampleContentScreen extends React.Component {

  static navigationOptions = ({ navigation }) => {
     const { params = {} } = navigation.state;

     const headerRight = <Button
                             title="Add"
                             onPress={params.handleAdd ? params.handleAdd : () => null} />;

     const tabBarOptions = {
       tabBarLabel: '1st!',
       tabBarIcon: ({ tintColor }) => (
         <MaterialIcons
           name='mood'
           color={tintColor}
           size={Metrics.icons.small}
         />
       ),
     }

     const result = {
       ...tabBarOptions,
       headerRight: headerRight,
     }

     return result;
  };

  componentDidMount() {
    console.log(JSON.stringify(this.props.navigation));
    this.props.navigation.setParams({handleAdd: this._handleAdd});
  }

  _handleAdd = () => {
    const { params = {} } = this.props.navigation.state;
    const { count = 1 } = params;
    const newCount = count + 1;

    const { navigate } = this.props.navigation;
    navigate('SampleContentScreen', { title: 'Another Screen', text: 'This is another simple screen!', count: newCount, color: Colors.midnightBlue });
  }

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
