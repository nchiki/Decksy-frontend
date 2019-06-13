import React, { Component } from 'react';

import { ScrollView, Text, Image, StyleSheet, TextInput, View, Button, Alert, TouchableHighlight } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';

export default class LinkScreen extends Component {

    constructor(props) {
        super(props);
    }

    static navigationOptions = {
        title: 'Edit Links',
        headerTitleStyle: {
            fontSize: 25
        },
    };

    handleGithubLink = () => {
        this.props.navigation.navigate('AddLink', { linkType: 'Github' });
    }

    handleLinkedInLink = () => {
        this.props.navigation.navigate('AddLink', { linkType: 'Linkedin' });
    }

    handlePersonalLink = () => {
        this.props.navigation.navigate('AddLink', { linkType: 'Personal' });
    }


    render() {
        const details = this.props.navigation.getParam('details', 'NULL');
        const spacing = 10;
        return (
            <View>
                <Button
                    title="Add a Github Link"
                    onPress={() => {
                        this.handleGithubLink()
                    }}
                />
                <Button
                    title="Add a LinkedIn Link"
                    onPress={() => {
                        this.handleLinkedInLink()
                    }}
                />
                <Button
                    title="Add a Link to a personal website/portfolio"
                    onPress={() => {
                        this.handlePersonalLink();
                    }}
                />
            </View>
        );
    }
}

const buttons = StyleSheet.create({

    buttonStyles: {
        width: '80%',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    }
})
