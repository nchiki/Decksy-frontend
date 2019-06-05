import React from 'react';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert, Platform } from 'react-native';
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
      displayValue : 1,

    }
    
  }

  componentDidMount() {
    const { navigation } = this.props;
    this.setState({contacts : this.props.navigation.getParam('contacts', 'NO-ID')});
    navigation.setParams({
      handleShortcodeAddButton: this.showShortcodeInput,
      handleFilterButton: this.onFiltersPress
    });
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Cards',
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <Icon
          containerStyle={{paddingLeft:12}}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-options" : "md-options"}
          onPress={() => params.handleFilterButton()}
          size={28} 
          color='dodgerblue'
        />
      ),
      headerRight: (
        <Icon
          containerStyle={{paddingRight: 12}}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          onPress={() => params.handleShortcodeAddButton()}
          size={37}
          color='dodgerblue'
        />
      ),
    }
  };

  showShortcodeInput = () => {
    this.setState({ shortcodeInputVisible: true });
  };

  onFiltersPress = () =>{
    this.setState({ filterMenuVisible: true });
  }

  handleCancel = () => {
    this.setState({ shortcodeInputVisible: false });
  };

  handleCancelFilter = () => {
    this.setState({ filterMenuVisible: false });
  };
  
  handleAdd =  async () => {
    const { navigation } = this.props;
    //const userID = navigation.getParam('userID', 'NO-ID');
    apiRequests.addCard(global.userID, this.state.shortcode);
    setTimeout(() => this.getContactsForDisplay(), 20);
    this.setState({
      shortcodeInputVisible: false,
    });
  };


  getContactsForDisplay = async () => {
    const contacts= await apiRequests.getUserContacts(global.userID);
    const listItems = (contacts.map(async (cont) => {
      const id = Number.parseInt(cont.user, 10);
      const det = await apiRequests.getUserDetails(id);
      return det}) );
    const items = await Promise.all(listItems);
    console.log(items);
    setTimeout(() => this.setState({
      contacts: items
    }), 20);
  }

  handleFilter =  async () => {
    const filter = this.state.filters;
    const contacts = this.state.contacts;
    const listItems = (contacts.filter(cont => {
      if(!cont.field) { return false} else {
      let field = (cont.field).toLowerCase(); 
      return field.indexOf(
      filter.toLowerCase()) != -1}}) );
   
    setTimeout(() => 
    this.setState({
      filterMenuVisible : false,
      contacts : listItems,
      filters: null
    }), 20);
  };
  
  updateDisplay = () => {
    const display = this.state.displayValue;
    if(display == 1) {
      this.setState({displayValue : 2});
    } else {
      this.setState({displayValue: 1})
    }

  };

  DeckDisplay(displayValue, navigation, contacts) {
    if (displayValue == 1) {
      return (
        <ContactCollection contacts={contacts} navigation={navigation} />
      )
    } else {
      return (
        <CardCollection contacts={contacts} navigation={navigation} />
      )
    }

  }
  // Icons for adding and filtering
  render() {

    const displayValue = this.state.displayValue;
    const contacts = this.state.contacts;
    return (
      <View>
        {/*Adding a modal that would display the different filters */}
        <Dialog.Container
          visible={this.state.filterMenuVisible}>
          <Dialog.Title>Filter:</Dialog.Title>
          <Dialog.Description>Enter field:</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({filters:inputText})}/>
          <Dialog.Button label="Cancel" onPress={this.handleCancelFilter} />
          <Dialog.Button label="Filter" onPress={this.handleFilter} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.shortcodeInputVisible}>
          <Dialog.Title>Add User by Shortcode</Dialog.Title>
          <Dialog.Description>Enter shortcode:</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({shortcode:inputText})}/>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Add" onPress={this.handleAdd} />
        </Dialog.Container>

        {/* Displays the collection of cards */}
        <View>
          <Button title='Change Display' onPress={this.updateDisplay} />
          {this.DeckDisplay(displayValue, this.props.navigation, contacts)}
        </View>
      </View>
    );
  }
}



function DisplayFilters() {
  return(
    <View>
      <CheckBox
        center
        title='Software'
        checked={false}
      />
      <CheckBox
        center
        title='Business'
        checked={false}
      />
      <CheckBox
        center
        title='Finance'
        checked={false}
      />
      <CheckBox
        center
        title='Hardware'
        checked={false}
      />
    </View>
  );
}
