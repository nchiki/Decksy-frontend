import React from 'react';
import { Alert, ScrollView, StyleSheet, ImageBackground, Text, View, TextInput, Platform, Linking } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Dialog from "react-native-dialog";
import call from 'react-native-phone-call';
import apiRequests from '../api_wrappers/BackendWrapper';
import OptionsMenu from "react-native-options-menu";
import email from 'react-native-email';
import templateUtils from '../components/Templates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SocialIcon } from 'react-native-elements';


export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      templateID: 4,
      linkPopupVisible: false,
      curLink: 'https://google.com',
      gitHubLink: null,
      linkedinLink: null,
      personalLink: null,
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

  async componentDidMount() {
    console.log("In component did mount");
    const { navigation } = this.props;
    const details = navigation.getParam('item', 'NO-ID');
    this.setState({
      details: details,
    })
    navigation.setParams({
      handleEmailButton: () => this.handleEmail(),
      handleMessageButton: () => this.handleMessage(),
      handleCallButton: () => this.handleCall(),
    });
    this.getNote(details.user);
    this.getURL(details);
  }

  async componentWillUnmount() {
    apiRequests.setNote(global.userID, this.state.details.user, this.state.note);
  }

  async handleEmail() {
    const to = [this.state.details.email]
    email(to, {
      subject: 'Subject',
      body: 'Body'
    }).catch(console.error)
  }

  handleMessage() {
    Alert.alert("TODO");
  }

  handleCall() {
    const args = {
      number: this.state.details.phoneNumber,
      prompt: false
    }
    call(args).catch(console.error)
  }

  getURL = async (details) => {
    for (let i = 0; i < details.links.length; i++) {
      const link = await apiRequests.getLink(details.links[i]);
      if (link) {
        if (link.name == "Github") {
          this.setState({ gitHubLink: link });
        } else if (link.name == "Linkedin") {
          this.setState({ linkedinLink: link });
        } else {
          this.setState({ personalLink: link });
        }
      }
    }
  }

  getNote = async (userID) => {
    const response = await apiRequests.getNote(global.userID, userID);
    if (response) {
      this.setState({ note: response.note });
    }
  }

  getButtons = () => {
    let buttons = [];
    const github = this.state.gitHubLink;
    const linkedIn = this.state.linkedinLink;
    const personal = this.state.personalLink;
    if (github) {
      buttons.push(
        <SocialIcon
          key={github.value}
          type="github"
          onPress={() => {
            this.setState({ curLink: github.value, linkPopupVisible: true })
          }}
        />
      );
    }
    if (linkedIn) {
      buttons.push(
        <SocialIcon
          key={linkedIn.value}
          type="linkedin"
          onPress={() => {
            this.setState({ curLink: linkedIn.value, linkPopupVisible: true })
          }}
        />
      );
    }
    if (personal) {
      buttons.push(
        <SocialIcon
          key={personal.value}
          onPress={() => {
            this.setState({ curLink: personal.value, linkPopupVisible: true })
          }}
          label="My portfolio"
        />
      );
    }
    return buttons;
  }

  handleNoRequest = () => {
    this.setState({ linkPopupVisible: false });
  }

  handleRedirection = () => {
    Linking.openURL(this.state.curLink);
    this.setState({ linkPopupVisible: false });
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');

    return (
      <View>
        <Dialog.Container
          visible={this.state.linkPopupVisible} >
          <Dialog.Title>Redirect to link reference</Dialog.Title>
          <Dialog.Description>Do you want to be redirected to {this.state.curLink}</Dialog.Description>
          <Dialog.Button label="Yes" onPress={console.log("Pressing button")} />
          <Dialog.Button label="No" onPress={this.handleNoRequest()} />
        </Dialog.Container >
        <View style={{ flex: 1 }}>
          <View style={{ marginTop: 30 }} alignItems='center'>
            <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
              <View style={styles.containerStyle}>
                <View style={templateUtils.setProfileStyle(item.card).titleText}>
                  <Text style={templateUtils.setProfileStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
                </View>
                <View style={templateUtils.setProfileStyle(item.card).user}>
                  <Text style={templateUtils.setProfileStyle(item.card).company}>{item.company}</Text>
                  <Text style={templateUtils.setProfileStyle(item.card).details}><Ionicons name='ios-call' size={10} /> {item.phoneNumber}{'\n'}
                    <Ionicons name='ios-mail' size={10} /> {item.email}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            {this.getButtons()}
          </View>
          <Text style={{ fontSize: 24, textAlign: 'center', marginTop: 30, }}>Notes:</Text>
          <View style={{ backgroundColor: 'lightyellow', width: 350, alignSelf: 'center', marginTop: 3, borderRadius: 8 }}>
            <TextInput
              value={this.state.note}
              style={{ textAlign: 'left', fontSize: 16, marginLeft: 10, marginRight: 10 }}
              onChangeText={(note) => {
                this.setState({ note: note });
              }}
              editable={true}
              multiline={true}
            />
          </View>
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
  },
  MainContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  }
});
