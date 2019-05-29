import React from 'react'; 
import { AppRegistry, FlatList, StyleSheet, Text, View } from 'react-native';
import { List, ListItem } from 'react-native-elements';

import contacts from '../users/Contacts'


export default class ContactCollection extends React.Component{

    _getContact = ({item}) => (
        <ListItem
        roundAvatar
        title={item.name}
        subtitle={item.subtitle}
        rightAvatar={{ source : {uri:item.avatar_url}}}
        />
    );

    _keyExtractor = (item, index) => item.name;

    render () {
    return (
        <FlatList
            data={contacts}
            renderItem={this._getContact}
            keyExtractor={item => item.name}
        />
    );
    }
}