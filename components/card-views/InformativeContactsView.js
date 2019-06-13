import React from 'react';
import { SectionList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';
import apiRequests from '../../api_wrappers/BackendWrapper';
import Swipeout from 'react-native-swipeout';
import Ionicons from '@expo/vector-icons/Ionicons';
import templateUtils from '../Templates';

export default class InformativeContactsView extends React.Component {

  handleCardProfile = (item) => {
    this.props.navigation.navigate('CardProfile', { item: item });
  }

  renderRow(data) {
    let item = data.item;
    let cardID = (item.card <2) ? 2 : item.card;
    let images = this.props.images;
    var swipeButtons = this.props.swipeButtons;
    // console.log(item)
    // console.log(item.isPinned)
    // if (item.isPinned) {
    //   swipeButtons.left[0].text = "Unpin";
    // } else {
    //   swipeButtons.left[0].text = "Pin";
    // }
    // console.log(swipeButtons)

    if (images[item.user]) {
      return (
        <Swipeout
          left={swipeButtons.left}
          right={swipeButtons.right}
          autoClose={true}
          backgroundColor='transparent'
          onOpen={() => {this.props.onSwipe(item.user, item.isPinned)}}
        >
          <View style={{ height: 120, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 16 }}>
              <Text style={{ fontSize: 18 }}>{`${item.firstName} ${item.lastName}`}</Text>
              <Text style={{ fontSize: 13 }}>{item.profession}</Text>
            </View>
            <View style={{ flex: 3, marginRight: -70 }}>
              <TouchableOpacity style={styles.card} onPress={() => this.handleCardProfile(item)}>
                <Image source={{url: images[item.user].url}} style={styles.containerStyle}/>
              </TouchableOpacity>
            </View>
          </View>
        </Swipeout>
      )
    }

    return (
      <Swipeout
        left={swipeButtons.left}
        right={swipeButtons.right}
        autoClose={true}
        backgroundColor='transparent'
        onOpen={() => {this.props.onSwipe(item.user, item.isPinned)}}
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

  render() {
    let sections;
    if (this.props.pinnedContacts.length > 0) {
      if (this.props.unpinnedContacts.length > 0) {
        // if there are both pinned and unpinned contacts, show to sections
        sections = [{title: 'Pinned', data: this.props.pinnedContacts},
                    {title: 'Unpinned', data: this.props.unpinnedContacts}];
      } else {
        // if there are only pinned contacts, only show a section for pinned contacts (no section for unpinned)
        sections = [{title: 'Pinned', data: this.props.pinnedContacts}];
      }
    } else {
      // if there are no pinned contacts then just have a single section with no section header
      sections = [{data: this.props.unpinnedContacts}];
    }

    return (
      <SectionList
        renderItem={this.renderRow.bind(this)}
        renderSectionHeader={({section: {title}}) => (
          <View style={this.props.pinnedContacts.length > 0 ? styles.sectionHeaderBackground : styles.emptySectionHeader}>
            <Text style={styles.sectionHeader}>{title}</Text>
          </View>
        )}
        sections={sections}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={() => ( <View style={styles.seperator} /> )}
        style={{marginTop: 2, height:'100%'}}
      />
    );
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
  sectionHeaderBackground: {
    backgroundColor:'lightgrey',
    width:'100%',
    height:20
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize:15,
    marginLeft:10,
  },
  emptySectionHeader: {
    height:0,
  },
  seperator: {
    height: 1,
    backgroundColor: "#CED0CE"
  }
})
