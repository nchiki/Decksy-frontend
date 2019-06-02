import React, { Component } from 'react';
import { AppRegistry, Button, FlatList, StyleSheet, TouchableOpacity, Text, Image, View } from 'react-native';
import { List, ListItem, Divider, Card, CardItem } from 'react-native-elements';


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
        <View style={{flex:3}} >
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
        </View> 
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