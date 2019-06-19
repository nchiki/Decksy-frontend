import React, { Component } from 'react';

import { ScrollView, Text, TextInput, View, Button, Alert, TouchableHighlight } from 'react-native';

import styles from '../styles/Styles';
import apiRequests from '../api_wrappers/BackendWrapper';

export default class EditDetailsScreen extends Component {

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
    title: 'Edit Details',
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
    apiRequests.setUserDetails(this.state.userID, this.state.firstName, this.state.lastName, this.state.phoneNumber, this.state.email, this.state.company, this.state.profession, this.state.cardID);
    this.props.navigation.goBack();
  }

  render() {
    const details = this.props.navigation.getParam('details', 'NULL');
    const spacing = 10;
    return (
      <ScrollView style={{ padding: 10, flex: 1 }}>
        <View style={{ flex: 5 }} />
        <View style={{ flex: 1, marginTop: 15 }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.firstName}
            placeholder={details.firstName}
            onChangeText={(firstname) => this.setState({ firstName: firstname })}
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.lastName}
            placeholder={details.lastName}
            onChangeText={(lastname) => this.setState({ lastName: lastname })}
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.phoneNumber}
            placeholder={details.phoneNumber}
            onChangeText={(phonenumber) => this.setState({ phoneNumber: phonenumber })}
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.company}
            placeholder={details.company}
            onChangeText={(company) => this.setState({ company: company })}
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.profession}
            placeholder={details.profession}
            onChangeText={(profession) => this.setState({ profession: profession })}
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.email}
            placeholder={details.email}
            onChangeText={(email) => this.setState({ email: email })}
            autoCorrect={false}
            keyboardType="email-address"
            autoCapitalize="none"
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing }}>
          <TextInput
            style={styles.loginInputs}
            value={this.state.password}
            placeholder="Password"
            onChangeText={(password) => this.setState({ password: password })}
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            textContentType="password"
          />
        </View>
        <View style={{ flex: 1, marginTop: spacing + 4, alignItems: 'center' }}>
          <TouchableHighlight onPress={() => this.handleSubmit()} underlayColor='#2970FF'>
            <View style={{ alignItems: 'center', backgroundColor: '#2970FF', width: 100, height: 40, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 30 }}>Save</Text>
            </View>
          </TouchableHighlight>
        </View>
        <View style={{ flex: 4 }} />
      </ScrollView>
    );
  }
}
