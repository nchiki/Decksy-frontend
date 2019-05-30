import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button } from 'react-native';

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
    apiRequests.setUserDetails(this.state.email, this.state.firstname, this.state.lastname, this.state.phonenumber, this.state.email, this.state.company, this.state.profession);
    this.props.navigation.navigate("Main")
  }

  render() {
    return (
      <View style={{padding: 10}}>
         <TextInput
          style={styles.loginInputs}
          placeholder="First Name"
          onChangeText={(firstname) => this.setState({firstname})}
        />
         <TextInput
          style={styles.loginInputs}
          placeholder="Last Name"
          onChangeText={(lastname) => this.setState({lastname})}
        />
         <TextInput
          style={styles.loginInputs}
          placeholder="Phone Number"
          onChangeText={(phonenumber) => this.setState({phonenumber})}
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
