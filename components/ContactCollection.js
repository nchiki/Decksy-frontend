import React from 'react';
import {  FlatList, StyleSheet, Text, ImageBackground, View } from 'react-native';

import users from '../users/Users';
import deckStyles from '../styles/DeckStyles';


export default class ContactCollection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      details: null,
    }
  }

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
                templateStyle = deckStyles.getStyle2();
                break;
        case 3 :
                templateStyle = deckStyles.getStyle3();
                break;
        case 4 :
                templateStyle = deckStyles.getStyle4();
                break;
        case 5 :
                templateStyle = deckStyles.getStyle5();
                break;
        case 6 : 
                templateStyle = deckStyles.getStyle6();
                break;
        case 7 :        
                templateStyle = deckStyles.getStyle7();
                break;
        case 8 :
                templateStyle = deckStyles.getStyle8();
                break;
        case 9 :
                templateStyle = deckStyles.getStyle9();
                break;
        case 10 : 
                templateStyle = deckStyles.getStyle10();
                break;
      }
      
      return templateStyle;
  }

  _getContact = ({item}) => (
    <View style={{height:120, flexDirection: 'row', alignItems:'center'}}>
    
   <View style={{flex:1, alignItems:'center'}}><Text style={{fontSize:15}}>{item.name}</Text>
    <Text style={{fontSize:11}}>{item.subtitle}</Text>
    </View>
      <View style={{flex:3}}>
      <ImageBackground source={this.setImage(item.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={this.setStyle(item.templateID).titleText}>
                      <Text style={this.setStyle(item.templateID).userText} >{`${item.name}`} </Text>
                  </View>
                  <View style={this.setStyle(item.templateID).user}>
                    <Text style={this.setStyle(item.templateID).company}>{item.company}</Text>
                    <Text style={this.setStyle(item.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
                  </View>
                  </View>
                
    </ImageBackground>
      </View> 
     </View>
);


  _keyExtractor = (item, index) => item.name;

  componentWillMount() {
    this.setState({
      _isMounted : true,
      details: this.props.contacts
    });
  }

  renderFlatList = () => {
    const users = this.state.details;
    if (users && users.length > 0) {
      return (
        <View style={{alignItems:'center'}}>
        {
          users.map((u, i) => {
            return (
              this._getContact(u, i),
              this.renderSeparator()
            );
          })
        }
        </View>
      )
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    this.setState({_isMounted : false});
  }

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE",
        }}
      />
    );
  };

  render () {
    return (
      <FlatList
        data={users}
        renderItem={this._getContact}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
      />
    );
  }

}


const styles = StyleSheet.create({
  containerStyle: {
    width: 350,
    height: 200,
    transform: [{
      scale:0.5
    }],
  },
  containerBackStyle: {
    width: 350,
    height: 200,
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  },
})









/*
  <Card title={item.name} titleStyle={{color:item.colour, fontSize: 30}} containerStyle={styles.containerStyle}>
  <View style={styles.user}>
  <Text style={styles.company}>{item.company}</Text>
  <Text style={styles.details}>{item.phoneNumber}{"\n"}{item.email}</Text>
  </View>
  <Divider style={{ backgroundColor: item.colour, width: 10, bottom: 40}} />
  <Divider style={{ backgroundColor: item.colour, width: 30, bottom: 30}} />
  <Divider style={{ backgroundColor: item.colour, width: 50, bottom: 20}} />
  <Divider style={{ backgroundColor: item.colour, width: 70, bottom: 10}} />
  <Divider style={{ backgroundColor: item.colour, width: 90}} />
  <Divider style={{ backgroundColor: item.colour, width: 110, bottom: -10}}/>
  <Divider style={{ backgroundColor: item.colour, width: 130, bottom: -20}} />
  <Divider style={{ backgroundColor: item.colour, width: 150, bottom: -30}} />
  </Card>
  }}}
  />*/
