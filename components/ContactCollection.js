import React, { Fragment } from 'react';
import { AppRegistry, Button, FlatList, StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { List, ListItem, Divider, Card, CardItem } from 'react-native-elements';
import users from '../users/Users'; 
import CardProfile from '../screens/CardProfileScreen'; 
import { BrowserRouter, Route, } from 'react-router-dom'


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
      <View style={{flex:3}} >
        <TouchableOpacity style={styles.card} 
        onPress= {()=> this.handleCardProfile(item)}>
          <Card title={item.name} titleStyle={{color:item.color, fontSize: 30}} containerStyle={styles.containerStyle}>
              <View style={styles.user}>
                <Text style={cardStyles(item.color).company}>{item.company}</Text>
                <Text style={cardStyles(item.color).details}>{item.phoneNumber}{"\n"}{item.email}</Text>
              </View>
              <Divider style={{ backgroundColor: item.color, width: 10, bottom: 40}} />
              <Divider style={{ backgroundColor: item.color, width: 30, bottom: 30}} />
              <Divider style={{ backgroundColor: item.color, width: 50, bottom: 20}} />
              <Divider style={{ backgroundColor: item.color, width: 70, bottom: 10}} />
              <Divider style={{ backgroundColor: item.color, width: 90}} />
              <Divider style={{ backgroundColor: item.color, width: 110, bottom: -10}}/>
              <Divider style={{ backgroundColor: item.color, width: 130, bottom: -20}} />
              <Divider style={{ backgroundColor: item.color, width: 150, bottom: -30}} />
          </Card>
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

