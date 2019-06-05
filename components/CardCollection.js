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
  );

  _keyExtractor = (item, index) => {
    return (item.email);
  }

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
        style={{marginTop:10}}
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
