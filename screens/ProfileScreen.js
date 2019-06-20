import React from 'react';

import { Platform, ScrollView, View, Text, TouchableOpacity, StyleSheet, Picker } from 'react-native';

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

import ShareModal from '../components/ShareModal';

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
    shareVisible: false
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
          color='#2970FF'
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
              color='#2970FF'
            />
          )}
          destructiveIndex={2}
          options={[params.displayValueOption, "Edit Details", "Sign Out", "Cancel"]}
          actions={[
            () => params.updateDisplayValue(),
            () => params.changeSettings(),
            () => params.logOut(),
            () => { }
          ]}
        />
      ),
    };
  }

  updateDisplayValue = () => {
    global.displayValue = (global.displayValue === 1) ? 0 : 1;
    global.updateHomeScreen();
    let dispVal = (global.displayValue === 1) ?  "Use Visual View" : "Use Informative View";
    this.props.navigation.setParams({displayValueOption: dispVal});
  }


  handleEdit = () => {
      this.setState({ editing: true });
  }

  doUpdate = () => {
    this.forceUpdate();
  }

  showGallery = async () => {
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

 
    global.details.card = 1;
    this.refresh = true;

    this.forceUpdate();
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    let dispVal = (global.displayValue === 1) ? "Use Visual View" : "Use Informative View";
    navigation.setParams({
      changeSettings: () => this.changeSettings(),
      showRequests: () => this.showRequests(),
      logOut: () => this.logOut(),
      getNumberRequests: () => this.getNumberRequests(),
      updateDisplayValue: () => this.updateDisplayValue(),
      displayValueOption: dispVal
    });
  }

  saveCard = () => {
    this.setState({editing: false});
  }

  render() {
    const { navigation } = this.props;
    let doRefresh = this.refresh;
    this.refresh = false;

    let defaultComponent = (
      <View style={{ flexDirection: 'row', justifyContent: 'center'}}>
        <TouchableOpacity
          style ={[styles.buttonSaveContainer, {width: 100, height: 50}]}
          onPress={this.handleEdit}>
            <Text style={{fontSize: 20,fontWeight: 'bold', color: 'white' }}> Edit </Text>
        </TouchableOpacity>

        <View style={{width:50}}/>
        <TouchableOpacity
          style={[styles.buttonSaveContainer, {width: 100, height: 50}]}
          onPress={() => this.setState({shareVisible: true})}>
            <Text style={{ fontSize: 20,fontWeight: 'bold', color: 'white' }}> Share </Text>
        </TouchableOpacity>
      </View>
    );

    let saveComponent = (
      <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
        <TouchableOpacity style={[styles.buttonSaveContainer, {width: 50, height: 50}]} onPress={this.showGallery}>
          <Ionicons name='ios-apps' size={30} color='white'/>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonSaveContainer, {width: 150, height: 50}]} onPress={this.saveCard} >
          <Text style={{ fontSize: 20, color: 'white' }}> Save Card </Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.buttonSaveContainer, {width: 50, height: 50}]} onPress={this._pickImage}>
          <Ionicons name='ios-share' size={30} color='white'/>
        </TouchableOpacity>
      </View>
    )

    return (
      <ScrollView >

        <ShareModal visible={this.state.shareVisible} modalClose={() => this.setState({shareVisible: false})} />

        <View style={{flex: 1, top: 15}}>
          { this.state.editing ? saveComponent :defaultComponent}
        </View>
        <View style={{flex: 1, top: 20}} >
          <BusinessCard details={global.details} refresh={doRefresh} />
        </View>
        <Links />
      </ScrollView >
    );
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
