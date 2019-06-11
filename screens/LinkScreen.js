import React, { Component } from 'react';

import { ScrollView, Text, Image, TextInput, View, Button, Alert, TouchableHighlight } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';
import { ReactComponent as Logo } from '../assets/images/github-logo.svg';


export default class LinkScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: null,
            email: null,
            firstName: null,
            lastName: null,
            phoneNumber: null,
            links: [],
            company: null,
            profession: null,
            cardID: null
        }
    }

    static navigationOptions = {
        title: 'Edit Links',
        headerTitleStyle: {
            fontSize: 25
        },
    };


    componentDidMount() {
        const { navigation } = this.props;
        const details = navigation.getParam('details', 'NULL');
        this.setState({
            userID: details.user,
            email: details.email,
            firstName: details.firstName,
            lastName: details.lastName,
            phoneNumber: details.phoneNumber,
            links: details.links,
            company: details.company,
            profession: details.profession,
            cardID: details.card
        })
    }

    handleSubmit = async () => {
        this.props.navigation.goBack();
    }


    render() {
        const details = this.props.navigation.getParam('details', 'NULL');
        const spacing = 10;
        return (
            <TouchableHighlight onPress={() => this.handleSubmit()} underlayColor='blue'>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                    <Logo />
                    <Text> Hello world! </Text>
                </View>
            </TouchableHighlight>
        );
    }
}
