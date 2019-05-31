import React from 'react';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";

import styles from '../styles/Styles';
import ContactCollection from '../components/ContactCollection';
import apiRequests from '../api_wrappers/BackendWrapper';
import users from '../users/Users';

// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      filterMenuVisible: false,
      shortcodeInputVisible: false,
      filtersChecked: new Map(),
      userID: null,
      contacts: [], //
    }
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      handleShortcodeAddButton: this.showShortcodeInput,
      handleFilterButton: this.onFiltersPress
    });
  }

  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Cards',
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

  handleCancel = () => {
    this.setState({ shortcodeInputVisible: false });
  };

  handleAdd =  async () => {
    const { navigation } = this.props;
    const userID = navigation.getParam('userID', 'NO-ID');
    console.log(userID);

    apiRequests.addCard(userID, this.state.shortcode);
    // const cont = await apiRequests.getUserContacts(userID);
    // console.log(cont.users);
    this.setState({
      shortcodeInputVisible: false,
      userID: 1,
      // contacts: getCards(userID),
    });
  };

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ filtersChecked: prevState.filtersChecked.set(item, isChecked) }));
  }

  setfilterMenuVisible(visible) {
    this.setState({
      filterMenuVisible: visible,
    });
  }

  setAddOptionsVisible(visible) {
    this.setState({
      filterMenuVisible: false,
    });
  }

  closeModal() {
    this.setState({
      filterMenuVisible: false
    });
  }

  onFiltersPress = () => {
    this.setfilterMenuVisible(!this.state.filterMenuVisible);
  }

//<Filter name={item.name} checked={this.state.filtersChecked.get(item.name)} onChange={() => this.handleChange()} />

  // Icons for adding and filtering
  render() {

    return (
      <View>
        {/*Adding a modal that would display the different filters */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.filterMenuVisible}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.checkContainer}>
              <TouchableOpacity onPress={() => this.closeModal()}>
                <Ionicons name={'ios-checkmark'}size={50} color={'white'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
              <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Select filters:</Text>
            </View>
            <View>
              <DisplayFilters />
            </View>
          </View>
        </Modal>

        <Dialog.Container visible={this.state.shortcodeInputVisible}>
          <Dialog.Title>Add User by Shortcode</Dialog.Title>
          <Dialog.Description>Enter shortcode:</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({shortcode:inputText})}/>
          <Dialog.Button label="Cancel" onPress={this.handleCancel} />
          <Dialog.Button label="Add" onPress={this.handleAdd} />
        </Dialog.Container>

        {/* Displays the collection of cards */}
        <View>
          <ContactCollection contacts={users} />
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

function getCards(userID) {
  return [
    {
    userID: 5,
    firstName: 'Mary',
    lastName: 'David',
    phoneNumber: '048904889',
    email:'mary@email.com',
    company: 'Google',
    profession: 'Software Engineer',
    },
  ];
}
