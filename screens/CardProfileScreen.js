import React from 'react';
import { Alert, StyleSheet, ImageBackground, Text, View, TextInput, Platform, TouchableOpacity, Linking } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import call from 'react-native-phone-call';
import apiRequests from '../api_wrappers/BackendWrapper';
import OptionsMenu from "react-native-options-menu";
import email from 'react-native-email';
import templateUtils from '../components/Templates';

export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _isMounted: false,
      text: "",
      templateID: 4,
      url: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
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
              containerStyle={{ paddingRight: 12 }}
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

  getURL = async (details) => {
    console.log("getURL:");
    console.log(details);
    const linkID = details.links[0];
    const link = await apiRequests.getLink(linkID);
    if (link) {
      this.setState({ url: link.url });
    }
    console.log("URL")
    console.log(link);
  }

  async componentDidMount() {
    const { navigation } = this.props;
    const details = navigation.getParam('item', 'NO-ID');
    console.log(details);
    this.setState({
      details: details,
    })
    navigation.setParams({
      handleEmailButton: () => this.handleEmail(),
      handleMessageButton: () => this.handleMessage(),
      handleCallButton: () => this.handleCall(),
    });
    this.getNotes(details.user);
    this.getURL(details);
  }

  async componentWillUnmount() {
    apiRequests.setNote(global.userID, this.state.details.user, this.state.text);
  }

  getNotes = async (userID) => {
    const response = await apiRequests.getNote(global.userID, userID);
    if (response) {
      this.setState({ text: response.note });
    }
  }

  //Linking.openURL('https://google.com')

  render() {
    // this.getURL();
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    return (
      <View style={{ flex: 1 }}>
        <View style={{ marginTop: 30 }} alignItems='center'>
          <TouchableOpacity style={styles.containerStyle} onPress={() => Linking.openURL('https://' + this.state.url)} >
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
          </TouchableOpacity>
        </View>
        <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 30, }}>Notes:</Text>
        <View style={{ backgroundColor: 'lightyellow', width: 350, alignSelf: 'center', marginTop: 3, borderRadius: 8 }}>
          <TextInput
            value={this.state.text}
            style={{ textAlign: 'left', fontSize: 16, marginLeft: 10, marginRight: 10 }}
            onChangeText={(text) => {
              this.setState({ text: text });
            }}
            editable={true}
            multiline={true}
          />
          <View style={{ height: 4 }} />
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
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }
})
