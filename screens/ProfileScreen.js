import React from 'react';

import { Platform, View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';

import Dialog from "react-native-dialog";

import { Icon, Card, Button } from 'react-native-elements';
import withBadge from "../components/Badge";
import { LinearGradient } from 'expo';
import OptionsMenu from "react-native-options-menu";
import apiRequests from '../api_wrappers/BackendWrapper';
import { TextButton, RaisedTextButton } from 'react-native-material-buttons';

import BusinessCard from '../components/BusinessCard';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SocialIcon } from 'react-native-elements';

import templateUtils from '../components/Templates';


import Links from '../components/Links';

import {ImagePicker, Permissions, Constants} from 'expo';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  phoneNumber: 99999999,
}

// Profile screen that shows own card
export default class ProfileScreen extends React.Component {

  state = {
    editing: false,
    details: u,
    image: require("../assets/images/templates/template2.png"),
    templateStyle: templateUtils.setProfileStyle(2),
  };

  refresh = false;

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

  handleEdit = () => {
      this.setState({ editing: true });
  }

  doUpdate = () => {
    this.forceUpdate();
  }

  showGallery = async () => {
    global.details = await apiRequests.getUserDetails(global.userID);
    this.props.navigation.navigate('TemplatesGallery', {details: global.details, cb: this.doUpdate});
  }

  _pickImage = async () => {

    if (Platform.OS) {
      const status  = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if(status.status != 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.cancelled) {
      return;
    }

    const data = new FormData();

    data.append("card", {
      name: 'businessCard',
      type: result.type,
      uri:
        Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
    });

    data.append("user", global.userID);
    apiRequests.addCardImage(data);
    apiRequests.setCard(global.userID, 1);

    console.log("updating picture");
    global.details.card = 1;
    this.refresh = true;

    this.forceUpdate();
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

  saveCard = () => {
    this.setState({editing: false});
  }

  render() {
    const { navigation } = this.props;
    let doRefresh = this.refresh;
    this.refresh = false;

    let defaultComponent = (
      <View style={{ flexDirection: 'row', justifyContent: 'center', top: 50 }}>
        <TouchableOpacity
          style ={[styles.buttonSaveContainer, {width: 100, height: 50}]}
          onPress={this.handleEdit}>
            <Text style={{fontSize: 20,fontWeight: 'bold', color: 'white' }}> Edit </Text>
        </TouchableOpacity>

        <View style={{width:50}}/>
        <TouchableOpacity
          style={[styles.buttonSaveContainer, {width: 100, height: 50}]}
          onPress={() => {}}>
            <Text style={{ fontSize: 20,fontWeight: 'bold', color: 'white' }}> Share </Text>
        </TouchableOpacity>
      </View>
    );

    let saveComponent = (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around', top: 50}}>
        <TouchableOpacity onPress={this.showGallery}>
          <Ionicons name='ios-apps' size={52} color='#2970FF'/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonSaveContainer, {width: 150, height: 50}]} onPress={this.saveCard} >
          <Text style={{ fontSize: 20, color: 'white' }}> Save Card </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this._pickImage}>
          <Ionicons name='ios-share' size={52} color='#2970FF'/>
        </TouchableOpacity>
      </View>
    )

    return (
      <View style={{flex: 2, top: 35}}>
        <BusinessCard details={global.details} refresh={doRefresh} />
        { this.state.editing ? saveComponent :defaultComponent}
        <Links />
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
  cardContainer: {
    top: 20,
    width: 350,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },
  buttonRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
  },
  buttonContainer: {
    margin: 5,

  },
  buttonSaveContainer: {
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#2970FF',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerStyle: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  containerBackStyle: {
    width: 350,
    height: 200,
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },
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
