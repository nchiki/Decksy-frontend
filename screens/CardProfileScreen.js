import React from 'react';
import { Alert, StyleSheet, ImageBackground, Text, View, TextInput, Platform, Linking } from 'react-native';
import { Icon} from 'react-native-elements';
import call from 'react-native-phone-call';
import apiRequests from '../api_wrappers/BackendWrapper';
import OptionsMenu from "react-native-options-menu";
import email from 'react-native-email';
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
    const to = [this.state.details.email] // string or array of email addresses
    email(to, {
        subject: 'Subject',
        body: 'Body'
    }).catch(console.error)

  }

  handleMessage() {
    Alert.alert("Message!");
  }

  handleCall() {
    const args = {
      number: this.state.details.phoneNumber, // String value with the number to call
      prompt: false // Optional boolean property. Determines if the user should be prompt prior to the call
    }

    call(args).catch(console.error)
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
        <Text style={{fontSize:24, textAlign:'center', marginTop:30, }}>Notes:</Text>
        <View style={{backgroundColor: 'lightyellow', width:350, alignSelf: 'center', marginTop:3, borderRadius:8}}>
          <TextInput
            value= {this.state.text.trim()}
            style={{textAlign: 'left', fontSize:16, marginLeft:10, marginRight:10}}
            onChangeText={(text) => {
              this.state.text = text;
              this.saveNotes();
            }}
            editable = {true}
            multiline= {true}
          />
          <View style={{height:4}} />
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
