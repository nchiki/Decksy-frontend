import React from 'react';
import {Button, View, Text, FlatList, StyleSheet } from 'react-native';
import { Divider, Card} from 'react-native-elements';


import users from '../users/Users'

export default class CardCollection extends React.Component{
    _getCards = ({item}) => (

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
    );
    _keyExtractor = (item, index) => item.name;
  
render () {
    

    // onRefresh() and refreshing will be useful when we add new cards to our contacts
    return (
        <FlatList data={users}
        renderItem={this._getCards}
        keyExtractor={this._keyExtractor} contentContainerStyle={styles.list}/>
      
      
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