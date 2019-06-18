import React from 'react';

import { StyleSheet, TouchableOpacity, Picker, Platform, View, Text } from 'react-native';

import Dialog from "react-native-dialog";

import { Icon } from 'react-native-elements';
import withBadge from "../components/Badge";
import { LinearGradient } from 'expo';
import CardTemplate from '../components/CardTemplate';
import OptionsMenu from "react-native-options-menu";
import apiRequests from '../api_wrappers/BackendWrapper';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';


import Ionicons from '@expo/vector-icons/Ionicons';
import { SocialIcon } from 'react-native-elements';


// Profile screen that shows own card
export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null,
      links: [],
      linkPopupVisible: false,
      linkValueVisible: false,
      modifyLinkVisible: false,
      editLinkVisible: false,
      linkType: null,
      linkValue: null,
      linkID: null,
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const BadgedIcon = withBadge(global.requests)(Icon);
    return {
      title: 'Profile',
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <BadgedIcon
          containerStyle={{ paddingLeft: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-people" : "md-people"}
          onPress={() => params.showRequests()}
          size={33}
          color='dodgerblue'
        />
      ),
      headerRight: (
        <OptionsMenu
          customButton={(
            <Icon
              containerStyle={{ paddingRight: 12 }}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
              size={33}
              color='dodgerblue'
            />
          )}
          destructiveIndex={2}
          options={["Edit Details", "Edit Links", "Sign Out", "Cancel"]}
          actions={[() => params.changeSettings(), () => params.changeToLinks(), () => params.logOut(), () => { }]}
        />
      ),
    };
  }


  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      changeSettings: () => this.changeSettings(),
      changeToLinks: () => this.changeToLinks(),
      showRequests: () => this.showRequests(),
      logOut: () => this.logOut(),
      getNumberRequests: () => this.getNumberRequests(),
    });
    this.getExistingLinks();
  }

  handleAddLink = () => {
    const linkType = this.state.linkType;
    if (linkType == "Github") {
      console.log("went into Github");
      apiRequests.addLink(global.userID, "Github", "https://www.github.com/" + this.state.linkValue);
    } else if (linkType == "Linkedin") {
      console.log("went into Linkedin");
      apiRequests.addLink(global.userID, "Linkedin", "https://www.linkedin.com/in/" + this.state.linkValue);
    } else if (linkType == "Personal") {
      console.log("went into personal");
      apiRequests.addLink(global.userID, "Personal", "https://www." + this.state.linkValue);
    }
    this.setState({ linkValueVisible: false })
    this.getExistingLinks();
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 3 }}>
          <CardTemplate navigation={this.props.navigation} />
        </View>
        <View style={{ flex: 2, alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Your links</Text>
          <Icon
            containerStyle={{ paddingRight: 12 }}
            type="ionicon"
            name={Platform.OS === "ios" ? "ios-add" : "md-add"}
            size={39}
            color='dodgerblue'
            onPress={() => this.setState({ linkPopupVisible: true })}
          />
          {this.linkDisplay()}
          <Dialog.Container
            visible={this.state.linkPopupVisible} >
            <Dialog.Title>Add a link</Dialog.Title>
            <Dialog.Description>{'What type of link do you want to add?'}</Dialog.Description>
            <Picker
              style={{ height: 50, width: 100 }}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ linkType: itemValue })
              }
            >
              {this.getLinksToDisplay()}
            </Picker >
            <Dialog.Button label="Submit" onPress={() => this.setState({ linkPopupVisible: false, linkValueVisible: true })} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.setState({ linkPopupVisible: false })} bold={true} />
          </Dialog.Container >

          <Dialog.Container
            visible={this.state.linkValueVisible} >
            <Dialog.Title>Add your link</Dialog.Title>
            <Dialog.Description>{`Please add your profile name (if adding a Linkedin or Github link) or your portfolio URL`}</Dialog.Description>
            <Dialog.Input onChangeText={(inputText) => this.setState({ linkValue: inputText })} />
            <Dialog.Button label="Submit" onPress={() => this.handleAddLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.setState({ linkValueVisible: false })} bold={true} />
          </Dialog.Container >

          <Dialog.Container
            visible={this.state.editLinkVisible} >
            <Dialog.Title>Edit your link</Dialog.Title>
            <Dialog.Description>{`Do you want to edit or delete your link?`}</Dialog.Description>
            <Dialog.Button label="Edit" onPress={() => this.setState({ editLinkVisible: false, modifyLinkVisible: true })} bold={true} />
            <Dialog.Button label="Delete" onPress={() => this.removeLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.setState({ editLinkVisible: false })} bold={true} />
          </Dialog.Container >

          <Dialog.Container
            visible={this.state.modifyLinkVisible} >
            <Dialog.Title>Edit your link</Dialog.Title>
            <Dialog.Description>{`Please add your new profile name (if adding a Linkedin or Github link) or your new portfolio URL`}</Dialog.Description>
            <Dialog.Input onChangeText={(inputText) => this.setState({ linkValue: inputText })} />
            <Dialog.Button label="Submit" onPress={() => this.editLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.setState({ edit: false })} bold={true} />
          </Dialog.Container >

        </View>
      </View >
    );
  }

  removeLink = async () => {
    console.log("LinkID");
    console.log(this.state.linkID);
    apiRequests.removeLink(this.state.linkID);
    this.setState({ editLinkVisible: false });
    setTimeout(() => this.getExistingLinks(), 20);
  }

  editLink = async () => {
    const linkType = this.state.linkType;
    if (linkType == "Github") {
      await apiRequests.editLink(this.state.linkID, "Github", "https://www.github.com/" + this.state.linkValue);
    } else if (linkType == "Linkedin") {
      await apiRequests.editLink(this.state.linkID, "Linkedin", "https://www.linkedin.com/in/" + this.state.linkValue);
    } else if (linkType == "Personal") {
      await apiRequests.editLink(this.state.linkID, "Personal", "https://www." + this.state.linkValue);
    }
    this.setState({ modifyLinkVisible: false })
    setTimeout(() => this.getExistingLinks(), 20);
  }

  linkDisplay = () => {
    let display = [];
    for (let i = 0; i < this.state.links.length; i++) {
      let fontColor = null;
      let backgColor = null;
      const type = this.state.links[i].name;
      if (type == "Github") {
        fontColor = 'white';
        backgColor = 'black';
      } else if (type == "Linkedin") {
        fontColor = 'white';
        backgColor = 'deepskyblue';
      } else {
        fontColor = 'dimgrey';
        backgColor = 'white';
      }
      display.push(
        <TextButton key={this.state.links[i].value} title={this.state.links[i].name + ": " + this.state.links[i].value} titleColor={fontColor}
          color={backgColor} shadeColor='grey' onPress={() =>
            this.setState({
              editLinkVisible: true, linkID: this.state.links[i].link, linkValue: this.state.links[i].value, linkType: this.state.links[i].name
            })} />)
    }
    return display;
  }

  getLinksToDisplay = () => {
    var linksToAdd = [];
    let github = true;
    let linkedin = true;
    let personal = true;
    for (let i = 0; i < this.state.links.length; i++) {
      var type = this.state.links[i].name;
      if (type == "Github") {
        github = false;
      }
      if (type == "Linkedin") {
        linkedin = false;
      }
      if (type == "Personal") {
        personal = false;
      }
    }
    linksToAdd.push(<Picker.Item key="Default" label="Choose the type of link" value="Default" />)
    if (github) {
      linksToAdd.push(<Picker.Item key="Github" label="Github" value="Github" />)
    }
    if (linkedin) {
      linksToAdd.push(<Picker.Item key="Linkedin" label="LinkedIn" value="Linkedin" />);
    }
    if (personal) {
      linksToAdd.push(<Picker.Item key="Personal" label="Personal Website/Portfolio" value="Personal" />);
    }
    return linksToAdd;
  }

  getExistingLinks = async () => {
    const details = await apiRequests.getUserDetails(global.userID);
    console.log(details);
    this.setState({ details: details });
    let links = details.links;
    console.log(links);
    let existingLinks = [];
    for (let i = 0; i < links.length; i++) {
      let link = await apiRequests.getLink(details.links[i]);
      existingLinks.push(link);
    }
    this.setState({
      links: existingLinks
    })
  }

  getNumberRequests = async () => {
    const requests = await apiRequests.getRequests(global.userID);
    return requests.length
  }

  showRequests = async () => {
    const requests = await apiRequests.getRequests(global.userID);
    this.props.navigation.navigate('RequestsScreen', { requests: requests.requests });
  }

  changeSettings = async () => {
    const det = await apiRequests.getUserDetails(global.userID);
    this.props.navigation.navigate('EditDetailsScreen', { details: det });
  }

  changeToLinks = async () => {
    const det = await apiRequests.getUserDetails(global.userID);
    this.props.navigation.navigate('LinkScreen', { details: det });
  }

  logOut = () => {
    global.userID = 1;
    this.props.navigation.navigate('Login');
  }
}

const styles = StyleSheet.create({
  linksButton: {
    width: '100%',
    height: '30%',
    justifyContent: 'center',
    alignItems: 'center'
  },
});

/*
<Dialog.Container
            visible={this.state.linkPopupVisible} >
            <Dialog.Title>Add a link</Dialog.Title>
            <Dialog.Description>{'What type of link do you want to add?'}</Dialog.Description>
            <Dialog.Button label="Github" onPress={() => this.handleGithubLink()} />
            <Dialog.Button styles={styles.linksButton} label="LinkedIn" onPress={() => this.handleLinkedinLink()} />
            <Dialog.Button label="Personal Website/Portfolio" onPress={() => this.handlePersonalLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.handleNoRequest()} bold={true} />
          </Dialog.Container >


          <Dialog.Container
            visible={this.state.linkPopupVisible} >
            <Dialog.Title>Add a link</Dialog.Title>
            <Dialog.Description>{`Do you want to be redirected`}</Dialog.Description>
            <Dialog.Content>
              <SocialIcon
                key="Github"
                type="github"
                onPress={() => {
                  alert("TODO")
                }}
              />
            </Dialog.Content>

            <Dialog.Button label="Github" onPress={() => this.handleGithubLink()} />
            <Dialog.Button label="LinkedIn" onPress={() => this.handleLinkedinLink()} />
            <Dialog.Button label="Personal Website/Portfolio" onPress={() => this.handlePersonalLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.handleNoRequest()} bold={true} />
          </Dialog.Container >
          */

