import React, { Fragment } from 'react';
import { Alert, AppRegistry, Button, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View, TextInput, Platform, Linking } from 'react-native';
import { Icon, List, ListItem, Divider, Card, CardItem } from 'react-native-elements';
import users from '../users/Users';
import apiRequests from '../api_wrappers/BackendWrapper';
import OptionsMenu from "react-native-options-menu";

import templateUtils from '../components/Templates';

export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      text: "",
      templateID: 4,
    }
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    const firstName = params.item.firstName;
     return {
      title: `${firstName}\'${firstName.endsWith("s") ? "" : "s"} Card`,
      headerTitleStyle: {
        fontSize: 25
      },
      headerRight: (
        <OptionsMenu
          customButton={(
            <Icon
              containerStyle={{paddingRight: 12}}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-chatboxes" : "md-chatboxes"}
              size={35}
              color='dodgerblue'
            />
          )}
          options={["Email", "Message", "Call", "Cancel"]}
          actions={[() => params.handleEmailButton(), () => params.handleMessageButton(), () => params.handleCallButton(), console.log]}
        />
      ),
    }
  };

 async handleEmail() {
    this.launchURL(`mailto:${this.state.details.email}`);
  }

  handleMessage() {
    Alert.alert("Message!");
  }

  handleCall() {
    this.launchURL(`tel:${this.state.details.phoneNumber}`);
  }

  launchURL(url) {
    Linking.canOpenURL(url).then(supported => {
    if(!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            Linking.openURL(url)
            .catch(err => {
        console.warn('openURL error', err);
            });
        }
    }).catch(err => console.warn('An unexpected error happened', err));
  }
    

async componentDidMount() {
  const { navigation } = this.props;
  this.setState({
    details: navigation.getParam('item', 'NO-ID')
  })
  navigation.setParams({
    handleEmailButton: () => this.handleEmail(),
    handleMessageButton: () => this.handleMessage(),
    handleCallButton: () => this.handleCall(),
  });
}

saveNotes = async() => {
  const { navigation } = this.props;
  const item = navigation.getParam('item', 'NO-ID');
  apiRequests.setNote(global.userID, item.user, this.state.text);
  const det = await apiRequests.getNote(global.userID, item.user);
  this.setState({text: det});
}

getNotes = async(item) => {
  const note = await apiRequests.getNote(global.userID, item.user);
  if (note) {
    this.state.text= note.note;  
  }
}


  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    this.getNotes(item);
   
    return (
      <View style={{flex:1}}>
        <View style={{marginTop:30}} alignItems='center'>
          <ImageBackground source={templateUtils.setImage(this.state.templateID)} style={styles.containerStyle}>
            <View style={styles.containerStyle}>
              <View style={templateUtils.setProfileStyle(this.state.templateID).titleText}>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).userText} >{`${item.firstName} ${item.lastName}`} </Text>
              </View>
              <View style={templateUtils.setProfileStyle(this.state.templateID).user}>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).company}>{item.company}</Text>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: 'lightyellow', marginTop:25, marginLeft: 20, marginRight: 20}}>
          <Text style={{fontSize:24, textAlign:'center' }}>Notes:</Text>
          <TextInput style={{fontSize:15}} value= {this.state.text}
          onChangeText={(text) => {
            this.state.text = text; 
            this.saveNotes(); 
          }
        }/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  },
  card:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
  }
})

const cardStyles = (color) => StyleSheet.create({
  company: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color,
    justifyContent: 'center',
  },
  details: {
    right: -85,
    bottom: -35,
    fontSize: 15,
    color: color
  }
})
