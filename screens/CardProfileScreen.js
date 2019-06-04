import React from 'react';
import { Alert, Button, StyleSheet, ImageBackground, Text, View, TextInput, Platform, Linking } from 'react-native';

import { Icon } from "react-native-elements";
import OptionsMenu from "react-native-options-menu";


import templateUtils from '../components/Templates';

export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      text: null,
      templateID: 4,
    }
  }

  componentDidMount() {
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

  handleEmail() {
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
    
    saveNotes = async(navigation) => {
    const item = navigation.getParam('item', 'NO-ID');
    console.log(this.props.userID); 
    console.log(item.userID);
    apiRequests.setNote(this.props.userID, item.userID, this.state.text);
  }

  getNotes = async() => {
    const note = await apiRequests.getNote(this.props.userID, item.userID);
    return note;
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    const defaultText= this.getNotes(); 
   
    return (
      <View style={{flex:1}}>
        <View style={{marginTop:30}} alignItems='center'>
          <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
            <View style={styles.containerStyle}>
              <View style={templateUtils.setProfileStyle(item.card).titleText}>
                <Text style={templateUtils.setProfileStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
              </View>
              <View style={templateUtils.setProfileStyle(item.card).user}>
                <Text style={templateUtils.setProfileStyle(item.card).company}>{item.company}</Text>
                <Text style={templateUtils.setProfileStyle(item.card).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: 'lightyellow', marginTop:25, marginLeft: 20, marginRight: 20}}>
          <Text style={{fontSize:24, textAlign:'center' }}>Notes:</Text>
          <TextInput style={{fontSize:15}} defaultValue={defaultText}
          onChangeText={(text) => {
            this.setState({text}); 
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

