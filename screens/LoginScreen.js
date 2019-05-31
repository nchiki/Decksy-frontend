import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

import styles from '../styles/Styles';
import getUserDetails from '../api_wrappers/BackendWrapper';

export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      email:null,
      password:null,
    }
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Login',
      headerRight: (
        <Button
          title="Sign Up"
          onPress={() => {
            navigation.navigate("SignUp", this.state)
          }}
        />
      ),
    }
  };

  handleLogin() {
    // Add logic to authenticate user here
    this.props.navigation.navigate('CollectedCards', {userID: this.state.email})
  }

  render() {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={styles.loginInputs}
          placeholder="Email Address"
          onChangeText={(email) => this.setState({email})}
          autoCorrect={false}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.loginInputs}
          placeholder="Password"
          onChangeText={(password) => this.setState({password})}
          autoCorrect={false}
          autoCapitalize="none"
          secureTextEntry={true}
          textContentType="password"
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
