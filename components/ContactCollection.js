import React from 'react'; 
import { AppRegistry, FlatList, StyleSheet, Text, Image, View } from 'react-native';
import { List, ListItem, Divider, Card, CardItem } from 'react-native-elements';
import users from '../users/Users'

export default class ContactCollection extends React.Component{

    _getContact = ({item}) => (
        <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.subtitle}
        rightIcon={
            <View >
              <Image style={{width: 50, height: 50}} source={require('./blue_card.png')} />
            </View>
          }     
         />
    );

    _keyExtractor = (item, index) => item.name;

    render () {
    return (
        <FlatList
            data={users}
            renderItem={this._getContact}
            keyExtractor={item => item.name}
        />
    );
    }
}


const styles = StyleSheet.create({
    containerStyle: {
      width: 350,
      height: 200,
    },
    containerBackStyle: {
      width: 350,
      height: 200,
    },
    user: {
      alignItems:'center',
      justifyContent: 'center'
    },
  
    company: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'darkblue',
      justifyContent: 'center',
    },
    details: {
      right: -85,
      bottom: -35,
      fontSize: 15,
      color: 'darkblue'
    }
  })








/*
  <Card title={item.name} titleStyle={{color:'darkblue', fontSize: 30}} containerStyle={styles.containerStyle}>
  <View style={styles.user}>
  <Text style={styles.company}>{item.company}</Text>
  <Text style={styles.details}>{item.phoneNumber}{"\n"}{item.email}</Text>
  </View>
  <Divider style={{ backgroundColor: 'darkblue', width: 10, bottom: 40}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 30, bottom: 30}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 50, bottom: 20}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 70, bottom: 10}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 90}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 110, bottom: -10}}/>
  <Divider style={{ backgroundColor: 'darkblue', width: 130, bottom: -20}} />
  <Divider style={{ backgroundColor: 'darkblue', width: 150, bottom: -30}} />
  </Card>
  }}}
  />*/