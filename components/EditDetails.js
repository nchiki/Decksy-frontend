import React, { Component } from 'react';

import { Text, TextInput, View, Button, Alert } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';

var numOfLinks = 0; 

export default class EditDetails extends Component {

  constructor(props) {
    super(props);
    this.state={
      userID:null,
      email:null,
      firstName:null,
      lastName:null,
      phoneNumber:null,
      links: null,
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


  addToLinks = async(name, URL) => {
    const linkID = await apiRequests.addLink(global.userID, name, URL); 
    console.log(linkID); 
    let links = this.state.links;
    links.push(linkID); 
    this.state.links = links;
  }

  addLinkFields = () => {
    console.log("entered addLinkFields"); 
    var links=[];  
    for (let i = 0; i < numOfLinks; i++) {
      var name = ""; 
      var URL = ""; 
      links.push(
      <View key = {i} style={{flex:1}}>
        <TextInput
          key = {i}
          style={styles.loginInputs}
          placeholder="Name of the link"
          onChangeText={(linkName) => name = linkName }
        />
        <TextInput
          key = {'_'+i}
          style={styles.loginInputs}
          placeholder="URL"
          onChangeText={(url) => URL = url
          }
        />
      </View>
      )
      this.addToLinks(name, URL);
      console.log("finished pushing");
    }
    return links; 
  }



  componentDidMount() {
    const { navigation } = this.props;
    const details =  navigation.getParam('details', 'NULL');
    this.setState({
        userID:details.user,
        email:details.email,
        firstName:details.firstName,
        lastName:details.lastName,
        phoneNumber:details.phoneNumber,
        links: details.links,
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
      <View style={{padding: 10, flex:1}}>
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
         {this.addLinkFields()} 
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
            <Button title="Add link" onPress={() => { 
              numOfLinks++;
              this.forceUpdate(); }
            }/>
          </View>
        <View style={{flex:1}}>
          <Button
            title="Submit"
            style={styles.loginInputs}
            onPress={() => {this.handleSubmit()}}
          />
        </View>
        <View style={{flex:4}} />
      </View>
    );
  }
}
