import React from 'react';
import { FlatList, StyleSheet, ImageBackground, TouchableOpacity, Platform, Text, Image, View } from 'react-native';
import { Icon } from "react-native-elements";
import Ionicons from '@expo/vector-icons/Ionicons';
import apiRequests from '../api_wrappers/BackendWrapper';

// Home screen that will show the deck of business cards
export default class RequestsScreen extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            details: null,
        }
    }

    static navigationOptions = {
      title: 'Requests',
      headerTitleStyle: {
        fontSize: 25
      },
    };

    componentWillMount = async () => {
        let contacts = [];
        const { navigation } = this.props;
        const requests = navigation.getParam('requests', 'NULL');
        for (let i = 0; i < requests.length; i++) {
            let request = requests[i];
            let contact = this.getDetails(request);
            contacts.push(contact);
        }
        const items = await Promise.all(contacts);
        setTimeout(() => this.setState({
            details: items
        }), 20);
    }

    getDetails = async (request) => {
        let contact = await apiRequests.getUserDetails(request.from);
        return contact;
    }


    handleAddRequest = async (user) => {

        const { navigation } = this.props;
        const requests = navigation.getParam('requests', 'NULL');
        var indexRequest = null;
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].from == user.user) {
                indexRequest = i;
                break;
            }
        }
        const request = requests[indexRequest].request;
        apiRequests.acceptRequest(request);


        var index = this.state.details.indexOf(user);
        const newDetails = [].concat(this.state.details);
        newDetails.splice(index, 1);
        setTimeout(() => this.setState({
            details: newDetails
        }), 20);
        this.render();
    }

    handleRemoveRequest = async (user) => {
        const { navigation } = this.props;
        const requests = navigation.getParam('requests', 'NULL');
        var indexRequest = null;
        for (let i = 0; i < requests.length; i++) {
            if (requests[i].from == user.user) {
                indexRequest = i;
                break;
            }
        }
        const request = requests[indexRequest].request;

        apiRequests.removeRequest(request);

        var index = this.state.details.indexOf(user);
        const newDetails = [].concat(this.state.details);
        newDetails.splice(index, 1);
        setTimeout(() => this.setState({
            details: newDetails
        }), 20);
        this.render();
    }

    renderRow = ({ item }) => (
        <View style={{ height: 120, flexDirection: 'row', alignItems: 'center', marginRight: 20 }}>
            <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 16 }}>
                <Text style={{ fontSize: 18 }}>{`${item.firstName} ${item.lastName}`}</Text>
                <Text style={{ fontSize: 13 }}>{item.profession}</Text>
            </View>
            <Icon
                type="ionicon"
                name={Platform.OS === "ios" ? "ios-checkmark-circle" : "md-checkmark-circle"}
                onPress={() => this.handleAddRequest(item)}
                size={40}
                color='dodgerblue'
            />
            <Icon
                type="ionicon"
                containerStyle={{ paddingLeft: 20 }}
                name={Platform.OS === "ios" ? "ios-close-circle" : "md-close-circle"}
                onPress={() => this.handleRemoveRequest(item)}
                size={40}
                color='dodgerblue'
            />
        </View>
    );

    renderFlatList = () => {
        const users = this.state.details;
        if (users && users.length > 0) {
            return (
                <View style={{ alignItems: 'center' }}>
                    {
                        users.map((u, i) => {
                            return (
                                this.renderRow(u, i),
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

    render() {

        return (
            <FlatList
                data={this.state.details}
                renderItem={this.renderRow}
                keyExtractor={item => item.email}
                ItemSeparatorComponent={this.renderSeparator}
                style={{ marginTop: -2 }}
            />
        );
    }
}

const styles = StyleSheet.create({
    containerStyle: {
        width: 350,
        height: 200,
        transform: [{
            scale: 0.5
        }],
    },
    containerBackStyle: {
        width: 350,
        height: 200,
    },
    user: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center'
    }
})
