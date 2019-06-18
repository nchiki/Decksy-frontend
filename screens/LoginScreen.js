import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button, TouchableHighlight, Image, StyleSheet } from 'react-native';

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
      for(let j = 0; j < contacts.length; j++) {
        const id = Number.parseInt(contacts[j].user, 10);
        if(contacts[j].tags && contacts[j].tags.length > 0) {
          console.log(contacts[j].tags)
          for(let i = 0; i < contacts[j].tags.length; i++) {
            if (!tags.some(v => (v.toLowerCase() === contacts[j].tags[i].toLowerCase()))){
              tags.push(contacts[j].tags[i]);
            }
          }
        }
        if (contacts[j].card == 1) {
          const pic = await apiRequests.getCardImage(id);
          images[id] = pic
        }
      }
    global.tags = tags;
    this.props.navigation.navigate('CollectedCards', { userID: global.userID, contacts: contacts, images:images })

    // Add logic to authenticate user here
  }

  render() {
    global.fromLogin = true;
    return (
      <View style={{ padding: 10, flex: 1, justifyContent: 'center' }}>
        <View paddingTop={100} paddingBottom={20} style={{ flex: 1}}>
          <Image source={require('../assets/images/logo-web.png')}
            style={{ flex: 3,
              width: '85%',
              alignSelf: 'center'
            }}
            resizeMode="contain"
          />
        </View>
        <View style={{ flex: 3, alignItems: 'center' }}>
          <TextInput
            style={styles.inputs}
            placeholder="User ID"
            onChangeText={(id) => global.userID = Number.parseInt(id, 10)}
            autoCorrect={false}
            keyboardType="numeric"
            autoCapitalize="none"
          />
          <TextInput
            style={styles.inputs}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
          />
          <TouchableHighlight onPress={() => this.handleLogin()} underlayColor='blue'>
            <View style={{ alignItems: 'center', backgroundColor: '#2196F3', width: 100, height: 40, borderRadius: 5, marginTop: 10 }}>
              <Text style={{ color: 'white', fontSize: 30 }}>Log In</Text>
            </View>
          </TouchableHighlight>
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputs: {
    fontSize: 26,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '70%',
    alignSelf: 'center',
    height: 45,
    marginBottom: 20,
    marginTop: 0,
  }
})
