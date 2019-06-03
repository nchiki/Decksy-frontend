import React, { Fragment } from 'react';
import { AppRegistry, Button, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';
import { List, ListItem, Divider, Card, CardItem } from 'react-native-elements';
import users from '../users/Users';
import CardProfile from '../screens/CardProfileScreen';

import templateUtils from '../components/Templates';


export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      details: null,
    }
  }

    
  static navigationOptions =
  {
    title: 'CardProfile',
  };

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    return (
        <View style={{flex:1}} alignItems='center' >
          <ImageBackground source={templateUtils.setImage(item.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateUtils.setProfileStyle(item.templateID).titleText}>
                      <Text style={templateUtils.setProfileStyle(item.templateID).userText} >{`${item.name}`} </Text>
                  </View>
                  <View style={templateUtils.setProfileStyle(item.templateID).user}>
                    <Text style={templateUtils.setProfileStyle(item.templateID).company}>{item.company}</Text>
                    <Text style={templateUtils.setProfileStyle(item.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
                  </View>
                  </View>
            </ImageBackground>
          </View> 
    );
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  },
  card:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
  }
})

const cardStyles = (color) => StyleSheet.create({
  company: {
    fontSize: 25,
    fontWeight: 'bold',
    color: color,
    justifyContent: 'center',
  },
  details: {
    right: -85,
    bottom: -35,
    fontSize: 15,
    color: color
  }
})