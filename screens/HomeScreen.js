import React from 'react';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert, Platform, SegmentedControlIOS, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";

import ContactCollection from '../components/ContactCollection';
import apiRequests from '../api_wrappers/BackendWrapper';
import CardCollection from '../components/CardCollection';


// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      filterMenuVisible: false,
      shortcodeInputVisible: false,
      filters: null,
      userID: null,
      contacts: [],
      displayValue: 1,
    }
  }

  componentDidMount() {
    const { navigation } = this.props;
    let contacts = this.props.navigation.getParam('contacts', 'NO-ID');

    if (contacts == 'NO-ID') {
      contacts = global.contacts;
    }
    this.setState({ contacts: contacts });
    navigation.setParams({
      handleShortcodeAddButton: this.showShortcodeInput,
      handleFilterButton: this.onFiltersPress
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Cards',
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <Icon
          containerStyle={{ paddingLeft: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-options" : "md-options"}
          onPress={() => params.handleFilterButton()}
          size={28}
          color='dodgerblue'
        />
      ),
      headerRight: (
        <Icon
          containerStyle={{ paddingRight: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          onPress={() => params.handleShortcodeAddButton()}
          size={39}
          color='dodgerblue'
        />
      ),
    }
  };

  showShortcodeInput = () => {
    this.setState({ shortcodeInputVisible: true });
  };

  onFiltersPress = () => {
    this.setState({ filterMenuVisible: true });
  }

  handleCancel = () => {
    this.setState({ shortcodeInputVisible: false });
  };

  handleCancelFilter = () => {
    this.setState({ filterMenuVisible: false });
  };

  handleAdd = async () => {
    const { navigation } = this.props;
    apiRequests.addCard(global.userID, this.state.shortcode);
    setTimeout(() => this.getContactsForDisplay(), 20);
    this.setState({
      shortcodeInputVisible: false,
    });
  };


  getContactsForDisplay = async () => {
    const contacts = await apiRequests.getUserContacts(global.userID);
    const listItems = (contacts.map(async (cont) => {
      const id = Number.parseInt(cont.user, 10);
      const det = await apiRequests.getUserDetails(id);
      return det
    }));
    const items = await Promise.all(listItems);
    setTimeout(() => this.setState({
      contacts: items
    }), 20);
  }

  handleFilter = async () => {
    const filter = this.state.filters;
    if(!filter) {
      this.getContactsForDisplay();
      setTimeout(() =>
        this.setState({
          filterMenuVisible: false,
        }), 20);
    } else {
      const contacts = this.state.contacts;
      const listItems = (contacts.filter(cont => {
        if (!cont.field) {
          return false
        } else {
          let field = (cont.field).toLowerCase();
          return field.indexOf(filter.toLowerCase()) != -1
        }
      }));

      setTimeout(() =>
        this.setState({
          filterMenuVisible: false,
          contacts: listItems,
          filters: null
        }), 20);
    }
  };

  updateDisplay = () => {
    this.setState({ displayValue: (this.state.displayValue == 1 ? 2 : 1) });
  };

  DeckDisplay(displayValue, navigation, contacts) {
    return displayValue == 1 ?
      (<ContactCollection contacts={contacts} navigation={navigation} />)
      : (<CardCollection contacts={contacts} navigation={navigation} />)
  }

  render() {

    const displayValue = this.state.displayValue;
    const contacts = this.state.contacts;
    const changeDisplayButton = Platform.OS === "ios" ? (
      <SegmentedControlIOS
        values={['Informative View', 'Visual View']}
        selectedIndex={this.state.displayValue - 1}
        onChange={(event) => {
          this.setState(
            { displayValue: event.nativeEvent.selectedSegmentIndex + 1 });
        }}
        style={{ marginTop: 7, width: "70%", alignSelf: 'center' }}
      />)
      : (<Button title='Change Display' onPress={this.updateDisplay} />)

    return (
      <View>
        {/*Adding a modal that would display the different filters */}
        <Dialog.Container
          visible={this.state.filterMenuVisible}>
          <Dialog.Title>Filter</Dialog.Title>
          <Dialog.Description>Enter a keyword that you would like to be used to filter your business cards</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({ filters: inputText })} />
          <Dialog.Button label="Cancel" onPress={this.handleCancelFilter} bold={true} />
          <Dialog.Button label="Filter" onPress={this.handleFilter} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.shortcodeInputVisible} >
          <Dialog.Title>Add User</Dialog.Title>
          <Dialog.Description>Enter a user's shortcode to add their business card to your collection</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({ shortcode: inputText })} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} bold={true} />
          <Dialog.Button label="Add" onPress={this.handleAdd} />
        </Dialog.Container>

        {/* Displays the collection of cards */}
        <View>
          {changeDisplayButton}
          {this.DeckDisplay(displayValue, this.props.navigation, contacts)}
        </View>
      </View>
    );
  }
}
