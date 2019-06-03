import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button, Alert } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';

export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      userID:null,
      email:null,
      firstName:null,
      lastName:null,
      phoneNumber:null,
      company:null,
      profession:null,
    }
  }

  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle: {
      fontSize: 25
    },
  };

  handleSignUp = async () => {
    if (!this.state.email || !this.state.firstName || !this.state.lastName || !this.state.phoneNumber || !this.state.company || !this.state.profession) {
      Alert.alert("Please enter all the required details")
    } else {
      const ID = parseInt(this.state.userID, 10);
      apiRequests.setUserDetails(ID, this.state.firstName, this.state.lastName, this.state.phoneNumber,this.state.email, this.state.company, this.state.profession);
      const details = await apiRequests.getUserDetails(2);
      console.log(details.firstName);
      this.props.navigation.navigate('CollectedCards', {userID: 2});
    }
  }

  render() {
    return (
      <View style={{padding: 10, flex:1}}>
        <View style={{flex:4}} />
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="ID "
            onChangeText={(userID) => this.setState({userID: userID})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="First Name"
            onChangeText={(firstname) => this.setState({firstName: firstname})}
          />
          </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Last Name"
            onChangeText={(lastname) => this.setState({lastName: lastname})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Phone Number"
            onChangeText={(phonenumber) => this.setState({phoneNumber: phonenumber})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Company/Self-Employed"
            onChangeText={(company) => this.setState({company: company})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Profession"
            onChangeText={(profession) => this.setState({profession: profession})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Email"
            onChangeText={(email) => this.setState({email:email})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Password"
            onChangeText={(password) => this.setState({password: password})}
          />
        </View>
        <View style={{flex:1}}>
          <Button
            title="Sign Up"
            style={styles.loginInputs}
            onPress={() => {this.handleSignUp()}}
          />
        </View>
        <View style={{flex:4}} />
      </View>
    );
  }
}
