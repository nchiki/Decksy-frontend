import React, { Component } from 'react';

import { ScrollView, TextInput, View, Button, Alert } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';


export default class SignUpScreen extends Component {

  constructor(props) {
    super(props);
    this.state={
      userID:null,
      email:null,
      links: [],
      firstName:null,
      lastName:null,
      phoneNumber:null,
      company:null,
      profession:null,
      field: null,
    }
  }

  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle: {
      fontSize: 25
    },
  };

  handleSignUp = async () => {
    if (!this.state.field || !this.state.email || !this.state.firstName || !this.state.lastName || !this.state.phoneNumber || !this.state.company || !this.state.profession) {
      Alert.alert("Please enter all the required details")
    } else {
      const IDobject = await apiRequests.addUser(this.state.firstName, this.state.lastName, this.state.phoneNumber,this.state.email, this.state.company, this.state.profession, this.state.field, 2);
      const ID = IDobject.user;
      global.userID = Number.parseInt(ID, 10);
      const contacts= await apiRequests.getUserContacts(global.userID);
      const listItems = (contacts.map(async (cont) => {
        const id = Number.parseInt(cont.user, 10);
        const det = await apiRequests.getUserDetails(id);
        return det}) );
      const items = await Promise.all(listItems);
      this.props.navigation.navigate('ProfileScreen', {userID: global.userID, contacts : items})
    }
  }

  render() {
    return (
      <ScrollView style={{padding: 10, flex:1}}>
        <View style={{flex:4}} />
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
            placeholder="Field of work"
            onChangeText={(field) => this.setState({field: field})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Email"
            onChangeText={(email) => this.setState({email:email})}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Password"
            onChangeText={(password) => this.setState({password: password})}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
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
      </ScrollView>
    );
  }
}
