import React from 'react';

import { Platform, View, Text } from 'react-native';

import { Icon } from 'react-native-elements';
import withBadge from "../components/Badge";
import { LinearGradient } from 'expo';
import CardTemplate from '../components/CardTemplate';
import OptionsMenu from "react-native-options-menu";
import apiRequests from '../api_wrappers/BackendWrapper';



// Profile screen that shows own card
export default class ProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null,
      links: [],
      linkPopupVisible: false,
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


  componentDidMount() {
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
          <Dialog.Container
            visible={this.state.linkPopupVisible} >
            <Dialog.Title>Add a link</Dialog.Title>
            <Dialog.Description>{'What type of link do you want to add?'}</Dialog.Description>
            <Dialog.Button label="Github" onPress={() => this.handleGithubLink()} />
            <Dialog.Button label="LinkedIn" onPress={() => this.handleLinkedinLink()} />
            <Dialog.Button label="Personal Website/Portfolio" onPress={() => this.handlePersonalLink()} bold={true} />
            <Dialog.Button label="Cancel" onPress={() => this.handleNoRequest()} bold={true} />
          </Dialog.Container >
        </View>
      </View>
    );
  }


  updateLinks = () => {

  }

  getExistingLinks = async () => {
    const details = await apiRequests.getUserDetails(global.userID);
    this.setState({ details: details });
    let links = details.links;
    let existingLinks = [];
    for (let i = 0; i < links.length; i++) {
      let link = await apiRequests.getLink(details.links[i]);
      existingLinks.push(link);
    }
    this.setState({
      links: existingLinks
    })
    console.log(this.state.links);
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
