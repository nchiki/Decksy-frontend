import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button, TouchableHighlight } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';



export default class LoginScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
    }
    global.userID = 1;
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Login',
      headerTitleStyle: {
        fontSize: 25
      },
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

  handleLogin = async () => {
    
    const details = await apiRequests.getUserDetails(global.userID);
    const requests = await apiRequests.getRequests(global.userID);
    if(!details.card || details.card == null) {
      details.card = 2;
    }
    if(details.card == 1) {
      global.picture = await apiRequests.getCardImage(global.userID);
    }
    global.details = details;
    if(requests && requests.length > 0) { global.requests = requests;} else {global.requests = null;}
    let images = [];
    let tags = [];
      const contacts = await apiRequests.getUserContacts(global.userID);
      const listItems = (contacts.map(async (cont) => {
        const id = Number.parseInt(cont.user, 10);
        const det = await apiRequests.getUserDetails(id); 
        if(det.tags && det.tags.length > 0) {
          console.log(det.tags);
          for(let i = 0; i < tags.length; i++) {
            if (!tags.some(v => (v.toLowerCase() === det.tags[i].toLowerCase()))){
              tags.push(det.tags[i]);
            }
          }
        }   
        if (det.card == 1) {
          const pic = await apiRequests.getCardImage(id);
          images[id] = pic
        }
        return det
      }));
    const items = await Promise.all(listItems);
    global.tags = tags;
    this.props.navigation.navigate('CollectedCards', { userID: global.userID, contacts: items, images:images })

    // Add logic to authenticate user here
  }

  render() {
    global.fromLogin = true;
    return (
      <View style={{ padding: 10, flex: 1, justifyContent: 'center' }}>
        <View style={{ flex: 5, justifyContent: "center", alignItems: "center" }}>
          <Text style={styles.bigTitle}>RoloDex</Text>
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.loginInputs}
            placeholder="User ID"
            onChangeText={(id) => global.userID = Number.parseInt(id, 10)}
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <TouchableHighlight onPress={() => this.handleLogin()} underlayColor='blue'>
            <View style={{ alignItems: 'center', backgroundColor: '#2196F3', width: 100, height: 40, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 30 }}>Log In</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 5 }} />
      </View>
    );
  }
}
