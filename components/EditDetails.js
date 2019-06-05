import React, { Component } from 'react';

import { ScrollView, Text, TextInput, View, Button, Alert } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';


export default class EditDetails extends Component {

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
      cardID: null
    }
  }

  static navigationOptions = {
    title: 'Sign Up',
    headerTitleStyle: {
      fontSize: 25
    },
  };

  componentDidMount() {
    const { navigation } = this.props;
    const details =  navigation.getParam('details', 'NULL');
    this.setState({
        userID:details.user,
        email:details.email,
        firstName:details.firstName,
        lastName:details.lastName,
        phoneNumber:details.phoneNumber,
        company:details.company,
        profession:details.profession,
        cardID: details.card
    })
   
  }


  handleSubmit = async () => {
      apiRequests.setUserDetails(this.state.userID, this.state.firstName, this.state.lastName, this.state.phoneNumber,this.state.email, this.state.company, this.state.profession, this.state.cardID);    
      this.props.navigation.goBack();
    }

  render() {
      const details = this.props.navigation.getParam('details', 'NULL');
    return (
      <ScrollView style={{padding: 10, flex:1}}>
          <Text style={{fontWeight: 'bold', fontSize:20}}> Leave the unchanged fields blank:</Text>
        <View style={{flex:4}} />
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.firstName}
            onChangeText={(firstname) => this.setState({firstName: firstname})}
          />
          </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.lastName}
            onChangeText={(lastname) => this.setState({lastName: lastname})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.phoneNumber}
            onChangeText={(phonenumber) => this.setState({phoneNumber: phonenumber})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.company}
            onChangeText={(company) => this.setState({company: company})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.profession}
            onChangeText={(profession) => this.setState({profession: profession})}
          />
        </View>
        <View style={{flex:1}}>
          <TextInput
            style={styles.loginInputs}
            placeholder={details.email}
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
            title="Submit"
            style={styles.loginInputs}
            onPress={() => {this.handleSubmit()}}
          />
        </View>
        <View style={{flex:4}} />
      </ScrollView>
    );
  }
}
