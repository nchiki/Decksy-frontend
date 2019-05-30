import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button, Alert } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    title: 'Sign Up',
  };

  handleSignUp() {
    // Add logic to add user to database here
    if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.phoneNumber || !this.state.email || !this.state.company || !this.state.profession) {
      var a = 1
    } else {
      apiRequests.setUserDetails(this.state.email, this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.email, this.state.company, this.state.profession);
    }
    this.props.navigation.navigate("Main")
  }

  render() {
    return (
      <View style={{padding: 10}}>
         <TextInput
          style={styles.loginInputs}
          placeholder="First Name"
          onChangeText={(firstname) => this.setState({firstName})}
        />
         <TextInput
          style={styles.loginInputs}
          placeholder="Last Name"
          onChangeText={(lastname) => this.setState({lastName})}
        />
         <TextInput
          style={styles.loginInputs}
          placeholder="Phone Number"
          onChangeText={(phonenumber) => this.setState({phoneNumber})}
        />
         <TextInput
          style={styles.loginInputs}
          placeholder="Your company or self-employed"
          onChangeText={(company) => this.setState({company})}
        />
        <TextInput
          style={styles.loginInputs}
          placeholder="Your profession"
          onChangeText={(profession) => this.setState({profession})}
        />
        <TextInput
          style={styles.loginInputs}
          placeholder="Email"
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
