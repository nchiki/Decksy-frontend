import React from 'react';
import {View, Text, FlatList, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';

import templateUtils from './Templates';
import Ionicons from '@expo/vector-icons/Ionicons';


export default class CardCollection extends React.Component{

 
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'CardProfile',
    }
  };

  handleCardProfile = (item) =>
  {
     this.props.navigation.navigate('CardProfile', {item: item});
  }
  _getCards = ({item}) => (
    <TouchableOpacity style={styles.card} 
      onPress= {()=> this.handleCardProfile(item)}>
        <ImageBackground source={templateUtils.setImage(item.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateUtils.setProfileStyle(item.templateID).titleText}>
                      <Text style={templateUtils.setProfileStyle(item.templateID).userText} >{item.name} </Text>
                  </View>
                  <View style={templateUtils.setProfileStyle(item.templateID).user}>
                    <Text style={templateUtils.setProfileStyle(item.templateID).company}>{item.company}</Text>
                    <Text style={templateUtils.setProfileStyle(item.templateID).details}><Ionicons name='ios-call' size={10}/> {item.phoneNumber}{'\n'}
                    <Ionicons name='ios-mail' size={10}/> {item.email}</Text>
                  </View>
                  </View>
        </ImageBackground>
        </TouchableOpacity>
  );

  _keyExtractor = (item, index) => item.name;

  renderSeparator = () => {
        return (
          <View
            style={{
              height: 15,
              backgroundColor: 'white',
            }}
          />
        );
      };

  render () {
    // onRefresh() and refreshing will be useful when we add new cards to our contacts
    return (
      <FlatList
        data={this.props.contacts}
        renderItem={this._getCards}
        keyExtractor={this._keyExtractor} 
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={this.renderSeparator}
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
              
        });
