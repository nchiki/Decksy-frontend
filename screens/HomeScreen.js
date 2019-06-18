import React from 'react';

import { View, Button, Platform, SegmentedControlIOS, Text } from 'react-native';

import { Icon, SearchBar } from "react-native-elements";

import Dialog from "react-native-dialog";

import OptionsMenu from "react-native-options-menu";

import InformativeContactsView from '../components/card-views/InformativeContactsView';
import apiRequests from '../api_wrappers/BackendWrapper';
import VisualContactsView from '../components/card-views/VisualContactsView';

const ASC = 'ascending';

// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      searchDialogVisible: false,
      shortcodeInputVisible: false,
      requestID: null,
      unpinnedContacts: [],
      pinnedContacts: [],
      displayValue: 1,
      images: [],
      search: '',
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
    let allContacts = this.seperatePinnedFromUnpinned(contacts)
    setTimeout(() => this.setState(allContacts), 20);
    this.setState({
      allContacts: {
        pinned: allContacts.pinnedContacts,
        unpinned: allContacts.unpinnedContacts,
      }
    })

    navigation.setParams({
      handleShortcodeAddButton: this.showShortcodeInput,
      handleQRCodeAddButton: this.handleQRCode,
      updateContacts: this.updateContacts,
      handleSortByNameButton: this.handleSortbyName,
      handleSortBySurnameButton: this.handleSortbySurname,
      handleSortByAddedButton: this.handleSortByRecentlyAdded,
      handleSearchButton: this.search,
    });

    //this.updateContacts();
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Your Cards',
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <OptionsMenu
          customButton={(
            <Text style={{ color: '#2970FF', marginLeft: 10, fontSize: 20 }}>Sort</Text>
          )}
          options={["By First Name", "By Surname", "By Most Recently Added", "Cancel"]}
          actions={[() => params.handleSortByNameButton(), () => params.handleSortBySurnameButton(), () => params.handleSortByAddedButton(), () => { }]}
        />
      ),
      headerRight: (
        <OptionsMenu
          customButton={(
            <Icon
              containerStyle={{ paddingRight: 12 }}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-add" : "md-add"}
              size={41}
              color='#2970FF'
            />
          )}
          options={["Shortcode", "QR Code", "Cancel"]}
          actions={[() => params.handleShortcodeAddButton(), () => params.handleQRCodeAddButton(), () => { }]}
        />
      ),
    }
  };

  showShortcodeInput = () => {
    this.setState({ shortcodeInputVisible: true });
  };

  handleQRCode = () => {
    this.props.navigation.navigate("QRScanner", { cb: this.updateContacts });
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
    });
  };

  handleSendRequest = () => {
    apiRequests.addRequest(this.state.shortcode, global.userID);
    this.handleAdd();
  }

  handleSearch = (search) => {
    if (!search) {
      setTimeout(() =>
        this.setState({
          searchDialogVisible: false,
        }), 20);
    } else {
      const unpinned = this.state.allContacts.unpinned;
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
          )
        }
      }));
      const pinned = this.state.allContacts.pinned;
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
          )
        }
      }));

      setTimeout(() =>
        this.setState({
          searchDialogVisible: false,
          pinnedContacts: pinnedItems,
          unpinnedContacts: unpinnedItems,
        }), 20);
    }
  };

  handleCancelSearch = () => {
    this.setState({ searchDialogVisible: false });
  };

  updateContacts = async () => {
    let images = this.state.images;
    const contacts = await apiRequests.getUserContacts(global.userID);
    for (let j = 0; j < contacts.length; j++) {
      const id = Number.parseInt(contacts[j].user, 10);
      if (contacts[j].card == 1) {
        const pic = await apiRequests.getCardImage(id);
        images[id] = pic
      }
    }

    this.setState({ images: images });
    setTimeout(() => this.setState(
      this.seperatePinnedFromUnpinned(items)
    ), 20);
  }



  sortByName(a, b, order = ASC) {
    let diff = a.firstName.toLowerCase().localeCompare(b.firstName.toLowerCase());
    if (diff == 0) {
      diff = a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());

    }
    if (order === ASC) {
      return diff;
    }

    return -1 * diff;
  }

  sortBySurname(a, b, order = ASC) {
    const diff = a.lastName.toLowerCase().localeCompare(b.lastName.toLowerCase());
    if (order === ASC) {
      return diff;
    }
    return -1 * diff;
  }

  sortByAdded(a, b, order = ASC) {
    const diff = Number.parseInt(b.added, 10) - Number.parseInt(a.added, 10);
    if (order === ASC) {
      return diff;
    }
    return -1 * diff;
  }

  handleSortByRecentlyAdded = () => {
    const pinnedContacts = this.state.pinnedContacts;
    const unpinnedContacts = this.state.unpinnedContacts;
    pinnedContacts.sort((a, b) => this.sortByAdded(a, b, ASC));
    unpinnedContacts.sort((a, b) => this.sortByAdded(a, b, ASC));

    this.setState({ pinnedContacts: pinnedContacts, unpinnedContacts: unpinnedContacts })

  }

  handleSortbyName = () => {
    const pinnedContacts = this.state.pinnedContacts;
    const unpinnedContacts = this.state.unpinnedContacts;
    pinnedContacts.sort((a, b) => this.sortByName(a, b, ASC));
    unpinnedContacts.sort((a, b) => this.sortByName(a, b, ASC));

    this.setState({ pinnedContacts: pinnedContacts, unpinnedContacts: unpinnedContacts })
  }

  handleSortbySurname = () => {
    const pinnedContacts = this.state.pinnedContacts;
    const unpinnedContacts = this.state.unpinnedContacts;
    pinnedContacts.sort((a, b) => this.sortBySurname(a, b, ASC));
    unpinnedContacts.sort((a, b) => this.sortBySurname(a, b, ASC));

    this.setState({ pinnedContacts: pinnedContacts, unpinnedContacts: unpinnedContacts })
  }

  updateDisplay = () => {
    this.setState({ displayValue: (this.state.displayValue == 1 ? 2 : 1) });
  };

  render() {
    const { search } = this.state;
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

    let mainScreen;
    if (this.state.pinnedContacts.length == 0 && this.state.unpinnedContacts.length == 0 && this.state.search == '') {
      mainScreen = (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, color: 'grey' }}>You have no cards</Text>
          <Text style={{ fontSize: 15, color: 'grey', marginTop: 12, textAlign: 'center' }}>Add someone by tapping the + button in the top-right corner</Text>
        </View>
      )
    } else {
      // {changeDisplayButton}
      mainScreen = (
        <View>
          <SearchBar
            placeholder="Search"
            onChangeText={(text) => {
              this.setState({ search: text });
              if (text == '') {
                this.setState({
                  pinnedContacts: this.state.allContacts.pinned,
                  unpinnedContacts: this.state.allContacts.unpinned,
                });
              } else {
                this.handleSearch(text);
              }
            }}
            onClear={() => {
              this.setState({
                search: '',
                pinnedContacts: this.state.allContacts.pinned,
                unpinnedContacts: this.state.allContacts.unpinned,
              });
            }}
            onCancel={() => {
              this.setState({
                search: '',
                pinnedContacts: this.state.allContacts.pinned,
                unpinnedContacts: this.state.allContacts.unpinned,
              });
            }}
            value={search}
            platform="ios"
            inputContainerStyle={{ height: 20, backgroundColor: "gainsboro" }}
            containerStyle={{ height: 50, backgroundColor: "white", width: "95%", alignSelf: 'center' }}
          />
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
      )
    }

    return (
      <View style={{ flex: 1 }}>
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
        {mainScreen}
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
    pinnedContacts.forEach(function (contact) {
      contact.isPinned = true;
    });
    unpinnedContacts.forEach(function (contact) {
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
