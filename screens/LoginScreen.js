import React, { Component } from 'react';

import { AppRegistry, Text, TextInput, View, Button, TouchableHighlight } from 'react-native';

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

  handleLogin() {
    // Add logic to authenticate user here
    this.props.navigation.navigate('CollectedCards', {userID: this.state.email})
  }

  render() {
    return (
      <View style={{padding: 10, flex: 1, justifyContent: 'centerText'}}>
        <View style={{flex: 5, justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.bigTitle}>RoloDex</Text>
        </View>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Email Address"
            onChangeText={(email) => this.setState({email})}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{flex: 1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder="Password"
            onChangeText={(password) => this.setState({password})}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <TouchableHighlight onPress={() => this.handleLogin()} underlayColor='blue'>
            <View style={{alignItems: 'center', backgroundColor: '#2196F3', width: 100, height:40, borderRadius:5}}>
              <Text style={{color:'white', fontSize:30}}>Log In</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{flex:5}} />
      </View>
    );
  }
}
