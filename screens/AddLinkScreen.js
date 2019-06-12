import React, { Component } from 'react';

import { ScrollView, Text, Image, StyleSheet, TextInput, View, Button, Alert, TouchableHighlight } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';
import { ReactComponent as Logo } from '../assets/images/github-logo.svg';
import { tsMethodSignature } from '@babel/types';


export default class AddLinkScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            linkType: null,
            linkValue: null,
            linkURL: null,
        }
    }

    static navigationOptions = {
        title: 'Add Link',
        headerTitleStyle: {
            fontSize: 25
        },
    };

    componentDidMount() {
        const { navigation } = this.props;
        const type = this.props.navigation.getParam('linkType', 'NULL');
        this.setState({ linkType: type });
        if (type == 'Github') {
            this.setState({ linkURL: "https://www.github.com/" });
        } else if (type == 'Linkedin') {
            this.setState({ linkURL: "https://www.linkedin.com/" });
        } else {
            this.setState({ linkURL: "" });
        }
    }


    handleSubmit = async () => {
        const finalLink = this.state.linkURL + this.state.linkValue;
        apiRequests.addLink(global.userID, this.state.linkType, finalLink);
        this.props.navigation.goBack();
    }


    render() {
        return (
            <ScrollView>
                <View style={buttons.buttonStyles}>
                    <TextInput
                        value={this.state.linkValue}
                        placeholder="Profile Name"
                        onChangeText={(link) => this.setState({ linkValue: link })}
                        autoCorrect={false}
                        autoCapitalize="none"
                    />
                </View>
                <Button title="Submit" onPress={() => this.handleSubmit()} underlayColor='blue' />
            </ScrollView>
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
