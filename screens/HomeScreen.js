import React from 'react';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert, Platform, SegmentedControlIOS, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import { NavigationActions, StackActions } from 'react-navigation';
import { Icon } from "react-native-elements";
import DialogInput from 'react-native-dialog-input';
import Dialog from "react-native-dialog";
import Swipeout from 'react-native-swipeout';
import OptionsMenu from "react-native-options-menu";

import InformativeContactsView from '../components/card-views/InformativeContactsView';
import apiRequests from '../api_wrappers/BackendWrapper';
import VisualContactsView from '../components/card-views/VisualContactsView';

const ASC = 'ascending';
    const DSC = 'descending';
// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      searchDialogVisible: false,
      shortcodeInputVisible: false,
      requestVisible: false,
      requestID: null,
      search: null,
      unpinnedContacts: [],
      pinnedContacts: [],
      displayValue: 1,
      images: [],

    }
  }

  componentDidMount() {
    const { navigation } = this.props;

    let contacts = this.props.navigation.getParam('contacts', 'NO-ID');
    if (contacts == 'NO-ID') {
      contacts = global.contacts;
    }

    let images = this.props.navigation.getParam('images', 'NULL');
    if (images == 'NULL') {
      images = global.images;
    }

    this.setState({
      images: images
    });
    setTimeout(()=> this.setState(this.seperatePinnedFromUnpinned(contacts)), 20);

    navigation.setParams({
      handleShortcodeAddButton: this.showShortcodeInput,
      handleQRCodeAddButton: this.handleQRCode,
      handleNFCAddButton: this.handleNFC,
      updateContacts: this.updateContacts,
      handleSortButton : this.handleSort,
      handleSearchButton : this.search,
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
        <OptionsMenu
          customButton={(
        <Icon
          containerStyle={{ paddingLeft: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-options" : "md-options"}
          size={39}
          color='dodgerblue'
        />
        )}
        options={[ "Search", "Sort", "Restore", "Cancel"]}
        actions={[() => params.handleSearchButton(),  () => params.handleSortButton(),()=> params.updateContacts(), () => { }]}
      />
      ),
      headerRight: (
        <OptionsMenu
          customButton={(
            <Icon
              containerStyle={{ paddingRight: 12 }}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
              size={39}
              color='dodgerblue'
            />
          )}
          options={["Shortcode", "QR Code", "NFC", "Cancel"]}
          actions={[() => params.handleShortcodeAddButton(), () => params.handleQRCodeAddButton(), () => params.handleNFCAddButton(), () => { }]}
        />
      ),
    }
  };

  showShortcodeInput = () => {
    this.setState({ shortcodeInputVisible: true });
  };

  handleQRCode = () => {
      this.props.navigation.navigate("QRScanner");
  }

  handleNFC = () => {
    alert("TODO");
  }



  handleCancel = () => {
    this.setState({ shortcodeInputVisible: false });
  };



  handleAdd = async () => {
    const { navigation } = this.props;
    apiRequests.addCard(this.state.shortcode, global.userID);
    setTimeout(() => this.updateContacts(), 20);
    this.setState({
      shortcodeInputVisible: false,
      requestVisible: true,
    });
    //apiRequests.addCard(global.userID, this.state.shortcode);
  };

  handleSendRequest = () => {
    apiRequests.addRequest(this.state.shortcode, global.userID);
    this.setState({ shortcodeInputVisible: false });
    //this.setState({ requestVisible: false });
  }

  search = () => {
    setTimeout(() => this.updateContacts(), 30);
    this.setState({ searchDialogVisible: true });
  };

  handleSearch = () => {
    const search = this.state.search;
    if (!search) {
      setTimeout(() =>
        this.setState({
          searchDialogVisible: false,
        }), 20);
    } else {
      const unpinned = this.state.unpinnedContacts;
      const unpinnedItems = (unpinned.filter(cont => {
        if (!cont.field) {
          return false
        } else {
          let field = (cont.field).toLowerCase();
          let firstName = (cont.firstName).toLowerCase();
          let lastName = (cont.lastName).toLowerCase();
          let company = (cont.company).toLowerCase();
          let profession = (cont.profession).toLowerCase();
          let email = (cont.email).toLowerCase();
          let phoneNumber = (cont.phoneNumber).toLowerCase();
          return ((field.indexOf(search.toLowerCase()) != -1) ||
          (firstName.indexOf(search.toLowerCase()) != -1) ||
          (lastName.indexOf(search.toLowerCase()) != -1) ||
          (company.indexOf(search.toLowerCase()) != -1) ||
          (profession.indexOf(search.toLowerCase()) != -1) ||
          (email.indexOf(search.toLowerCase()) != -1) ||
          (phoneNumber.indexOf(search.toLowerCase()) != -1)
          )}
      }));
      const pinned = this.state.pinnedContacts;
      const pinnedItems = (pinned.filter(cont => {
        if (!cont.field) {
          return false
        } else {
          let field = (cont.field).toLowerCase();
          let firstName = (cont.firstName).toLowerCase();
          let lastName = (cont.lastName).toLowerCase();
          let company = (cont.company).toLowerCase();
          let profession = (cont.profession).toLowerCase();
          let email = (cont.email).toLowerCase();
          let phoneNumber = (cont.phoneNumber).toLowerCase();
          return ((field.indexOf(search.toLowerCase()) != -1) ||
          (firstName.indexOf(search.toLowerCase()) != -1) ||
          (lastName.indexOf(search.toLowerCase()) != -1) ||
          (company.indexOf(search.toLowerCase()) != -1) ||
          (profession.indexOf(search.toLowerCase()) != -1) ||
          (email.indexOf(search.toLowerCase()) != -1) ||
          (phoneNumber.indexOf(search.toLowerCase()) != -1)
          )}
      }));

      setTimeout(() =>
        this.setState({
          searchDialogVisible: false,
          pinnedContacts: pinnedItems,
          search: null,
          unpinnedContacts: unpinnedItems,
        }), 20);
    }
  };

  handleCancelSearch = () => {
    this.setState({ searchDialogVisible: false });
  };

  handleNoRequest = () => {
    this.setState({ requestVisible: false });
  }

  updateContacts = async () => {
    let images = this.state.images;
    const contacts = await apiRequests.getUserContacts(global.userID);
    const listItems = (contacts.map(async (cont) => {
      const id = Number.parseInt(cont.user, 10);
      const det = await apiRequests.getUserDetails(id);
      if (Number.parseInt(det.card, 10) == 1) {
        const pic = await apiRequests.getCardImage(id);
        images[id] = pic
      }
      return det
    }));
    this.setState({images:images});
    const items = await Promise.all(listItems);
    setTimeout(() => this.setState(
      this.seperatePinnedFromUnpinned(items)
    ), 20);
  }



sortByName(a, b, order = ASC) {
  let diff = a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
  if( diff == 0) {
    const diff = a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());

  }
    if (order === ASC) {
        return diff;
    }

    return -1 * diff;
}

sortByCompany(a, b, order = ASC) {
    const diff = a.company.toLowerCase().localeCompare(b.company.toLowerCase());

    if (order === ASC) {
        return diff;
    }

    return -1 * diff;
}

handleSort = () => {
  const pinnedContacts = this.state.pinnedContacts;
  const unpinnedContacts = this.state.unpinnedContacts;
  // if(sortValue == 'name') {
    if(true) {
    pinnedContacts.sort((a, b) => this.sortByName(a, b, ASC));
    unpinnedContacts.sort((a, b) => this.sortByName(a, b, ASC));
  } else {
    pinnedContacts.sort((a, b) => sortByCompany(a, b, ASC));
    unpinnedContacts.sort((a, b) => sortByCompany(a, b, ASC));
  }
  this.setState({pinnedContacts : pinnedContacts, unpinnedContacts: unpinnedContacts})
}



  updateDisplay = () => {
    this.setState({ displayValue: (this.state.displayValue == 1 ? 2 : 1) });
  };

  render() {
    let changeDisplayButton = Platform.OS === "ios" ? (
      <SegmentedControlIOS
        values={['Informative View', 'Visual View']}
        selectedIndex={this.state.displayValue - 1}
        onChange={(event) => {
          this.setState(
            { displayValue: event.nativeEvent.selectedSegmentIndex + 1 });
        }}
        style={{ marginTop: 7, width: "70%", alignSelf: 'center' }}
      />)
      : (<Button
          title='Change Display'
          onPress={() => this.setState({
            displayValue: (this.state.displayValue == 1 ? 2 : 1)
          })}
        />)

    return (
      <View>
        {/*Adding a modal that would display the different filters */}


        <Dialog.Container visible={this.state.searchDialogVisible}>
          <Dialog.Title>Search</Dialog.Title>
          <Dialog.Description>Enter what you want to search:</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({ search: inputText })} />
          <Dialog.Button label="Cancel" onPress={this.handleCancelSearch} bold={true} />
          <Dialog.Button label="Search" onPress={this.handleSearch} />
        </Dialog.Container>

        <Dialog.Container
          visible={this.state.shortcodeInputVisible} >
          <Dialog.Title>Add User</Dialog.Title>
          <Dialog.Description>Enter a user's shortcode to add their business card to your collection</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({ shortcode: inputText })} />
          <Dialog.Button label="Cancel" onPress={this.handleCancel} bold={true} />
          <Dialog.Button label="Add with request" onPress={this.handleSendRequest} />
          <Dialog.Button label="Add" onPress={this.handleAdd} />
        </Dialog.Container>


        {/* Displays the collection of cards */}
        <View>
          {changeDisplayButton}
          {this.state.displayValue == 1 ?
            (<InformativeContactsView
              pinnedContacts={this.state.pinnedContacts}
              unpinnedContacts={this.state.unpinnedContacts}
              navigation={this.props.navigation}
              images={this.state.images}
              deleteCard={this.deleteCard}
              pinCard={this.pinCard}
              swipeButtons={this.swipeButtons}
              onSwipe={this.onSwipe}
            />)
            : (<VisualContactsView
                pinnedContacts={this.state.pinnedContacts}
                unpinnedContacts={this.state.unpinnedContacts}
                navigation={this.props.navigation}
                images={this.state.images}
                deleteCard={this.deleteCard}
                pinCard={this.pinCard}
                swipeButtons={this.swipeButtons}
                onSwipe={this.onSwipe}
              />)
          }
        </View>
      </View>
    );
  }

  deleteCard() {
    apiRequests.removeContact(global.userID, this.state.swipedCardID);
    if (this.state.swipedCardIsPinned) {
      this.setState({
        pinnedContacts: this.state.pinnedContacts.filter(contact => contact.user != this.state.swipedCardID)
      })
    } else {
      this.setState({
        unpinnedContacts: this.state.unpinnedContacts.filter(contact => contact.user != this.state.swipedCardID)
      })
    }
  }

  pinCard() {
    apiRequests.setPinned(global.userID, this.state.swipedCardID, !(this.state.swipedCardIsPinned));
    var unpinned = this.state.unpinnedContacts;
    var pinned = this.state.pinnedContacts;
    if (this.state.swipedCardIsPinned) {
      unpinned = unpinned.concat(pinned.filter(contact => contact.user == this.state.swipedCardID));
      pinned = pinned.filter(contact => contact.user != this.state.swipedCardID);
      unpinned.filter(contact => contact.user == this.state.swipedCardID)[0].isPinned = false;
    } else {
      pinned = pinned.concat(unpinned.filter(contact => contact.user == this.state.swipedCardID));
      unpinned = unpinned.filter(contact => contact.user != this.state.swipedCardID);
      pinned.filter(contact => contact.user == this.state.swipedCardID)[0].isPinned = true;
    }
    this.setState({
      pinnedContacts: pinned,
      unpinnedContacts: unpinned,
    })
  }

  seperatePinnedFromUnpinned(allContacts) {
    let unpinnedContacts = [];
    let pinnedContacts = [];
    for (var i = 0; i < allContacts.length; i++) {
      if (allContacts[i].pinned) {
        pinnedContacts.push(allContacts[i]);
      } else {
        unpinnedContacts.push(allContacts[i]);
      }
    }
    pinnedContacts.forEach(function(contact) {
      contact.isPinned = true;
    });
    unpinnedContacts.forEach(function(contact) {
      contact.isPinned = false;
    });
    return {
      pinnedContacts: pinnedContacts,
      unpinnedContacts: unpinnedContacts,
    };
  }

  onSwipe = (contactID, contactIsPinned) => {
    this.setState({
      swipedCardID: contactID,
      swipedCardIsPinned: contactIsPinned,
    })
  }

  swipeButtons = {
    left: [
      {
        text: 'Pin',
        backgroundColor: 'orange',
        underlayColor: 'rgba(255, 255, 255, 1.0)',
        onPress: () => { this.pinCard() }
      }
    ],
    right: [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(255, 255, 255, 1.0)',
        onPress: () => { this.deleteCard() }
      }
    ]
  }

}
