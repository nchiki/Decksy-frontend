import React from 'react';
import {FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';

import users from '../users/Users';

import templateUtils from './Templates';

const templateID = 4;
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

  // CHANGE templateID TO item.templateID WHEN API REQUEST RETURNS TEMPLATE ID TOO
  _getContact = ({item}) => (
    <View style={{height:120, flexDirection: 'row', alignItems:'center'}}>
      <View style={{flex:1, alignItems:'left', marginLeft:16}}>
        <Text style={{fontSize:18}}>{`${item.firstName} ${item.lastName}`}</Text>
        <Text style={{fontSize:13}}>{item.profession}</Text>
      </View>
      <View style={{flex:3, marginRight:-70}}>
        <TouchableOpacity style={styles.card} onPress= {() => this.handleCardProfile(item)}>
          <ImageBackground source={templateUtils.setImage(templateID)} style={styles.containerStyle}>
            <View style={styles.containerStyle}>
              <View style={templateUtils.setStyle(templateID).titleText}>
                  <Text style={templateUtils.setStyle(templateID).userText} >{`${item.firstName} ${item.lastName}`} </Text>
              </View>
              <View style={templateUtils.setStyle(templateID).user}>
                <Text style={templateUtils.setStyle(templateID).company}>{item.company}</Text>
                <Text style={templateUtils.setStyle(templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
              </View>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );

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
          data={this.props.contacts}
          renderItem={this._getContact}
          keyExtractor={item => item.firstName}
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
