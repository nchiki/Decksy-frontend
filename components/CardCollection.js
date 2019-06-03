import React from 'react';
import {Button, View, Text, FlatList, StyleSheet } from 'react-native';
import { Divider, Card} from 'react-native-elements';

import users from '../users/Users'

export default class CardCollection extends React.Component{

  setImage = (cardType) => {
    let image = null;
      switch(cardType) {
        case 2:
                image = require("../assets/images/template2.png");
                break;
        case 3 :
                image = require("../assets/images/template3.png");
                break;
        case 4 :
                image = require("../assets/images/template4.png");
                break;
        case 5 :
                image = require("../assets/images/template5.png");
                break;
        case 6 : 
                image = require("../assets/images/template6.png");
                break;
        case 7 :        
                image = require("../assets/images/template7.png");
                break;
        case 8 :
                image = require("../assets/images/template8.png");
                break;
        case 9 :
                image = require("../assets/images/template9.png");
                break;
        case 10 : 
                image = require("../assets/images/template10.png");
                break;
      }
      return image;
  }

  setStyle = (cardType) => {
    let templateStyle = null;
      switch(cardType) {
        case 2:
                templateStyle = templateStyles.getStyle2();
                break;
        case 3 :
                templateStyle = templateStyles.getStyle3();
                break;
        case 4 :
                templateStyle = templateStyles.getStyle4();
                break;
        case 5 :
                templateStyle = templateStyles.getStyle5();
                break;
        case 6 : 
                templateStyle = templateStyles.getStyle6();
                break;
        case 7 :        
                templateStyle = templateStyles.getStyle7();
                break;
        case 8 :
                templateStyle = templateStyles.getStyle8();
                break;
        case 9 :
                templateStyle = templateStyles.getStyle9();
                break;
        case 10 : 
                templateStyle = templateStyles.getStyle10();
                break;
      }
      return templateStyle;
  }

  _getCards = ({u}) => (
    <ImageBackground source={this.setImage(u.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={this.setStyle(u.templateID).titleText}>
                      <Text style={this.setStyle(u.templateID).userText} >{`${u.firstName} ${u.lastName}`} </Text>
                  </View>
                  <View style={this.setStyle(u.templateID).user}>
                    <Text style={this.setStyle(u.templateID).company}>{u.company}</Text>
                    <Text style={this.setStyle(u.templateID).details}>{u.phoneNumber}{'\n'}{u.email}</Text>
                  </View>
                  </View>
                
    </ImageBackground>
  );

  _keyExtractor = (item, index) => item.name;

  render () {
    // onRefresh() and refreshing will be useful when we add new cards to our contacts
    return (
      <FlatList
        data={users}
        renderItem={this._getCards}
        keyExtractor={this._keyExtractor} contentContainerStyle={styles.list}
      />
    )
  }

}

const styles = StyleSheet.create({
  list: {
    justifyContent:'center',
    flexGrow:1
  },
  containerStyle: {
    width: 350,
    height: 200,
    backgroundColor: "#F5FCFF"
  },
  card: {
    width: 350,
    height: 200,
    backgroundColor: "white"
  },
  company: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'darkblue',
    justifyContent: 'center',
  },
  details: {
    right: -90,
    bottom: -35,
    fontSize: 15,
    color: 'darkblue'
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  }
});
