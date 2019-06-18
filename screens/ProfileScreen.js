import React from 'react';

import { Platform, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { Icon, Card, Button } from 'react-native-elements';
import withBadge from "../components/Badge";
import { LinearGradient } from 'expo';
import OptionsMenu from "react-native-options-menu";
import apiRequests from '../api_wrappers/BackendWrapper';

import BusinessCard from '../components/BusinessCard';

import templateUtils from '../components/Templates';


import {ImagePicker, Permissions, Constants} from 'expo';

import Ionicons from '@expo/vector-icons/Ionicons';

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

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      changeSettings: () => this.changeSettings(),
      changeToLinks: () => this.changeToLinks(),
      showRequests: () => this.showRequests(),
      logOut: () => this.logOut(),
      getNumberRequests: () => this.getNumberRequests(),
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
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <Button
          onPress={() => this.handleEdit()}
          title="Edit"
          color="#841584"
          // style={{marginRight:5}}
        />
        <View style={{width:50}}/>
        <Button
          onPress={() => {}}
          title="Share"
          color="#841584"
        />
      </View>
    );
    let editingComponent = (
      <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity style={styles.buttonSaveContainer} onPress={this.showGallery}>
          <Text style={{ fontWeight: 'bold' }}> Gallery </Text>
        </TouchableOpacity>
        <Button
          onPress={this.saveCard}
          title="Save Card"
          color="#841584"
        />
          <TouchableOpacity style={styles.buttonContainer} onPress={this._pickImage}>
            <Ionicons name='ios-qr-scanner' size={26} />
          </TouchableOpacity>
        </View>
    );

    return (
      <View style={{ flex: 1 }}>

        { this.state.editing ? editingComponent : defaultComponent }

        <View style={{ flex: 3 }}>
          <BusinessCard details={global.details} refresh={doRefresh} />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={{ fontSize: 24 }}>Your shortcode is:</Text>
          <Text style={{ fontSize: 30 }}>{global.userID}</Text>
        </View>
      </View>
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
    height: 30,
    width: 60,
    borderWidth: 2,
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

})
