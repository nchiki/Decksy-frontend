import React from 'react';
import {View,Image, Text, SectionList, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';

import templateUtils from '../Templates';
import Ionicons from '@expo/vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout';

export default class VisualContactsView extends React.Component{

  handleCardProfile = (item) => {
    this.props.navigation.navigate('CardProfile', {item: item});
  }

  _getCards({item}){
    let images = this.props.images;

    if(item.card == 1) {
        return (
        <View style={{shadowOffset:{ width: 5, height: 5}, shadowColor: 'black', shadowOpacity: 0.4, shadowRadius: 8}}>
          <Swipeout
          left={this.props.swipeButtons.left}
          right={this.props.swipeButtons.right}
          autoClose={true}
          backgroundColor='transparent'
          onOpen={() => {this.props.onSwipe(item.user, item.isPinned)}}
          >
            <TouchableOpacity style={styles.card} onPress={() => this.handleCardProfile(item)}>
              <Image source={{url: images[item.user].url}} style={styles.containerStyle}/>
            </TouchableOpacity>
          </Swipeout>
        </View>
        )
      }
  return (
    <View style={{shadowOffset:{ width: 5, height: 5}, shadowColor: 'black', shadowOpacity: 0.4, shadowRadius: 8}}>
        
    <Swipeout
      left={this.props.swipeButtons.left}
      right={this.props.swipeButtons.right}
      autoClose={true}
      backgroundColor='transparent'
      onOpen={() => {this.props.onSwipe(item.user, item.isPinned)}}
    >
      <TouchableOpacity
        style={styles.card}
        onPress= {()=> this.handleCardProfile(item)}
      >
        <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
        
          <View style={styles.containerStyle}>
            <View style={templateUtils.setProfileStyle(item.card).titleText}>
              <Text style={templateUtils.setProfileStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
            </View>
            <View style={templateUtils.setProfileStyle(item.card).user}>
              <Text style={templateUtils.setProfileStyle(item.card).company}>{item.company}</Text>
              <Text style={templateUtils.setProfileStyle(item.card).details}><Ionicons name='ios-call' size={10}/> {item.phoneNumber}{'\n'}
              <Ionicons name='ios-mail' size={10}/> {item.email}</Text>
            </View>
          </View>
         
        </ImageBackground>
        
      </TouchableOpacity>
      
    </Swipeout>
    </View>
  )
}

  render () {
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
        renderItem={this._getCards.bind(this)}
        renderSectionHeader={({section: {title}}) => (
          <Text style={this.props.pinnedContacts.length > 0 ? styles.sectionHeader : styles.emptySectionHeader}>{title}</Text>
        )}
        sections={sections}
        keyExtractor={(item, index) => item.email}
        ItemSeparatorComponent={() => ( <View style={{height: 15, backgroundColor: 'white'}}/> )}
        style={{marginTop:8}}
        contentContainerStyle={styles.list}
      />
    )
  }

}

const styles = StyleSheet.create({
  list: {
    alignItems: 'center',
    justifyContent:'center',
    flexGrow:1
  },
  containerStyle: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize:15,
    backgroundColor:'lightgrey'
  },
  emptySectionHeader: {
    height:0,
  },
});
