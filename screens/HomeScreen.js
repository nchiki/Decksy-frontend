import React from 'react';
import styles from '../styles/Styles';
// import CollectedCardsStack from '../navigation/TabNavigation';
import { addUserToContacts } from '../api_wrappers/BackendWrapper';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import CardCollection from './CardCollection';
import { NavigationActions, StackActions } from 'react-navigation';
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";

// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      barVisible: false,
      addVisible: false,
      shortcodeInputVisible: false,
      filtersChecked: new Map(),
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
        <Button
          title="Filter"
          onPress={() => {
            params.handleFilterButton()
          }}
        />
      ),
      headerRight: (
        <Button
          title="Add Short Code"
          onPress={() => {
            params.handleShortcodeAddButton()
          }}
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

  handleAdd = () => {
    // addUserToContacts(1, this.state.shortcode);
    this.setState({ shortcodeInputVisible: false });
  };

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ filtersChecked: prevState.filtersChecked.set(item, isChecked) }));
  }

  setBarVisible(visible) {
    this.setState({
      barVisible: visible,
      addVisible: false
    });
  }

  setAddOptionsVisible(visible) {
    this.setState({
      barVisible: false,
      addVisible: visible
    });
  }

  closeModal() {
    this.setState({
      barVisible: false
    });
  }

  closeAddModal() {
    this.setState({
      addVisible : false
    })
  }

  onFiltersPress = () => {
    this.setBarVisible(!this.state.barVisible);
  }

  onAddPress = () => {
    this.setAddOptionsVisible(!this.state.addVisible);
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
          visible={this.state.barVisible}
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
          <CardCollection />
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

function getCards() {
  // return getUserContacts(this.userID)
  return [
    {title: 'D', data: ['Devin']},
    {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
  ];
}
