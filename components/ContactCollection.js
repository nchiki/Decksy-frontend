import React from 'react';
import { SectionList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';
import Swipeout from 'react-native-swipeout';
import Ionicons from '@expo/vector-icons/Ionicons';
import templateUtils from './Templates';

export default class ContactCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null,
      swipedCardIsPinned: null,
      swipedCardID: null,
      pinnedContacts : [],
      unpinnedContacts : []
    }
  }

  componentDidMount() {
    console.log(this.props.contacts);
    setTimeout(()=> this.seperatePinnedFromUnpinned(this.props.contacts), 20);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'CardProfile',
    }
  };

  handleCardProfile = (item) => {
    this.props.navigation.navigate('CardProfile', { item: item });
  }

  renderRow(data) {
    let item = data.item;
    let rightSwipeButtons = [
      {
        text: 'Delete',
        backgroundColor: 'red',
        underlayColor: 'rgba(255, 255, 255, 1.0)',
        onPress: () => { this.deleteCard() }
      },
    ];

    let leftSwipeButtons = [
      {
        text: item.isPinned ? 'Unpin' : 'Pin',
        backgroundColor: 'orange',
        underlayColor: 'rgba(255, 255, 255, 1.0)',
        onPress: () => { this.pinCard() }
      },
    ];
    
    let cardID = (item.card <2) ? 2 : item.card;
    return (
      <Swipeout
        left={leftSwipeButtons}
        right={rightSwipeButtons}
        autoClose={true}
        backgroundColor='transparent'
        onOpen={(swipedCardIsPinned, swipedCardID) => {
          this.setState({
            swipedCardIsPinned: item.isPinned,
            swipedCardID: item.user,
          })
        }}
      >
        <View style={{ height: 120, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 16 }}>
          <Text style={{ fontSize: 18 }}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={{ fontSize: 13 }}>{item.profession}</Text>
        </View>
        <View style={{ flex: 3, marginRight: -70 }}>
          <TouchableOpacity style={styles.card} onPress={() => this.handleCardProfile(item)}>
            <ImageBackground source={templateUtils.setImage(cardID)} style={styles.containerStyle}>
              <View style={styles.containerStyle}>
                <View style={templateUtils.setStyle(cardID).titleText}>
                  <Text style={templateUtils.setStyle(cardID).userText} >{`${item.firstName} ${item.lastName}`} </Text>
                </View>
                <View style={templateUtils.setStyle(cardID).user}>
                  <Text style={templateUtils.setStyle(cardID).company}>{item.company}</Text>
                  <Text style={templateUtils.setStyle(cardID).details}><Ionicons name='ios-call' size={10} /> {item.phoneNumber}{'\n'}
                        <Ionicons name='ios-mail' size={10} /> {item.email}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
      </Swipeout>
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

  render() {
    var sections = []
    if (this.state.pinnedContacts.length > 0) {
      if (this.state.unpinnedContacts.length > 0) {
        // if there are both pinned and unpinned contacts, show to sections
        sections = [{title: 'Pinned', data: this.state.pinnedContacts},
                    {title: 'Unpinned', data: this.state.unpinnedContacts}];
      } else {
        // if there are only pinned contacts, only show a section for pinned contacts (no section for unpinned)
        sections = [{title: 'Pinned', data: this.state.pinnedContacts}];
      }
    } else {
      // if there are no pinned contacts then just have a single section with no section header
      sections = [{data: this.state.unpinnedContacts}];
    }
    return (
      <SectionList
        renderItem={this.renderRow.bind(this)}
        renderSectionHeader={({section: {title}}) => (
          <Text style={this.state.pinnedContacts.length > 0 ? styles.sectionHeader : styles.emptySectionHeader}>{title}</Text>
        )}
        sections={sections}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={() => ( <View style={styles.seperator} /> )}
        style={{marginTop: 2, height:'100%'}}
      />
    );
  }

  seperatePinnedFromUnpinned(contacts) {
    let unpinnedContacts = [];
    let pinnedContacts = [];
    for (var i = 0; i < contacts.length; i++) {
      if (contacts[i].pinned) {
        pinnedContacts.push(contacts[i]);
      } else {
        unpinnedContacts.push(contacts[i]);
      }
    }
    this.setState({
      pinnedContacts: pinnedContacts,
      unpinnedContacts: unpinnedContacts,
    })
  }

}

const styles = StyleSheet.create({
  containerStyle: {
    width: 350,
    height: 200,
    transform: [{
      scale: 0.5
    }],
  },
  containerBackStyle: {
    width: 350,
    height: 200,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize:15,
    backgroundColor:'lightgrey'
  },
  emptySectionHeader: {
    height:0,
  },
  seperator: {
    height: 1,
    backgroundColor: "#CED0CE"
  }
})
