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
    }
  }

  componentWillMount() {
    console.log(this.props.contacts);
    this.setState(this.seperatePinnedFromUnpinned(this.props.contacts));
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
        text: 'Pin',
        backgroundColor: 'orange',
        underlayColor: 'rgba(255, 255, 255, 1.0)',
        onPress: () => { this.pinCard() }
      },
    ];

    return (
      <Swipeout
        left={leftSwipeButtons}
        right={rightSwipeButtons}
        autoClose={true}
        backgroundColor='transparent'
        onOpen={(swipedCardIsPinned, swipedCardID) => {
          this.setState({
            swipedCardIsPinned: false,
            swipedCardID: item.card,
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
            <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
              <View style={styles.containerStyle}>
                <View style={templateUtils.setStyle(item.card).titleText}>
                  <Text style={templateUtils.setStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
                </View>
                <View style={templateUtils.setStyle(item.card).user}>
                  <Text style={templateUtils.setStyle(item.card).company}>{item.company}</Text>
                  <Text style={templateUtils.setStyle(item.card).details}><Ionicons name='ios-call' size={10} /> {item.phoneNumber}{'\n'}
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

  // renderSeparator = () => {
  //   return ( <View style={styles.seperator} /> );
  // };

  deleteCard() {
    apiRequests.removeContact(global.userID, contactID);
  }

  pinCard() {
    console.log(this.state.swipedCardID);
    apiRequests.setPinned(global.userID, this.state.swipedCardID, !(this.state.swipedCardIsPinned));
    this.togglePinned(this.state.swipedCardID);
  }

  togglePinned(id) {
    if (this.state.swipedCardIsPinned) {
      this.state.unpinnedContacts.concat(this.state.pinnedContacts.filter(contact => contact.user == id));
      this.state.pinnedContacts.filter(contact => contact.user != id);
    } else {
      this.state.pinnedContacts.concat(this.state.unpinnedContacts.filter(contact => contact.user == id));
      this.state.unpinnedContacts.filter(contact => contact.user != id);
    }
  }

  render() {
    return (
      <SectionList
        renderItem={this.renderRow.bind(this)}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        sections={[
          {title: 'Pinned', data: this.state.pinnedContacts},
          {title: 'Unpinned', data: this.state.unpinnedContacts},
        ]}
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
    return {
      pinnedContacts: pinnedContacts,
      unpinnedContacts: unpinnedContacts,
    }
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
  seperator: {
    height: 1,
    backgroundColor: "#CED0CE"
  }
})
