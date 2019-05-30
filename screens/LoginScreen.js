import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

import styles from '../styles/Styles';
import getUserDetails from '../api_wrappers/BackendWrapper';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Login',
      headerRight: (
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp")
          }}
        />
      ),
    }
  };

  handleLogin() {
    // Add logic to authenticate user here
    this.props.navigation.navigate("Main", {userID: 1})
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
          title="Log In"
          style={styles.loginInputs}
          onPress={() => {this.handleLogin()}}
        />
      </View>
    );
  }
}
