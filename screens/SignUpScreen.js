import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

import styles from '../styles/Styles';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  handleSignUp() {
    // Add logic to add user to database here
    this.props.navigation.navigate("Main")
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={styles.loginInputs}
          placeholder="Email Address"
          onChangeText={(email) => this.setState({email})}
        />
        <TextInput
          style={styles.loginInputs}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
        />
        <Button
          title="Sign Up"
          style={styles.loginInputs}
          onPress={() => {this.handleSignUp()}}
        />
      </View>
    );
  }
}
