import React from 'react';
import {FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';

import users from '../users/Users';

import templateUtils from './Templates';


export default class ContactCollection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      details: null,
    }
  }

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

  _getContact = ({item}) => (
    <View style={{height:120, flexDirection: 'row', alignItems:'center'}} >
    <View style={{flex:1, alignItems:'center'}}><Text style={{fontSize:15}}>{item.name}</Text>
    <Text style={{fontSize:11}}>{item.subtitle}</Text>
    </View>
      <View style={{flex:3}}>
      <TouchableOpacity style={styles.card} 
      onPress= {()=> this.handleCardProfile(item)}>
      <ImageBackground source={templateUtils.setImage(item.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateUtils.setStyle(item.templateID).titleText}>
                      <Text style={templateUtils.setStyle(item.templateID).userText} >{`${item.name}`} </Text>
                  </View>
                  <View style={templateUtils.setStyle(item.templateID).user}>
                    <Text style={templateUtils.setStyle(item.templateID).company}>{item.company}</Text>
                    <Text style={templateUtils.setStyle(item.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
                  </View>
                  </View>
    </ImageBackground>
    </TouchableOpacity>
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
  card:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
  }
})









