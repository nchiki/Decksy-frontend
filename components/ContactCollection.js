import React from 'react';
import { FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View } from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';
import Swipeout from 'react-native-swipeout';
import Ionicons from '@expo/vector-icons/Ionicons';
import templateUtils from './Templates';

export default class ContactCollection extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      details: null,
    }
  }

  componentWillMount() {
    this.setState({
      details: this.props.contacts
    });
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'CardProfile',
    }
  };

  handleCardProfile = (item) => {
    this.props.navigation.navigate('CardProfile', { item: item });
  }

  renderRow = ({ item }) => (
    <Swipeout
      left={this.leftSwipeButtons}
      right={this.rightSwipeButtons}
      autoClose={true}
      backgroundColor='transparent'
    >
      <View style={{ height: 120, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1, alignItems: 'flex-start', marginLeft: 16 }}>
          <Text style={{ fontSize: 18 }}>{`${item.firstName} ${item.lastName}`}</Text>
          <Text style={{ fontSize: 13 }}>{item.profession}</Text>
        </View>
        <View style={{ flex: 3, marginRight: -70 }}>
          <TouchableOpacity style={styles.card} onPress={() => this.handleCardProfile(item)}>
            <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
              <View style={styles.containerStyle}>
                <View style={templateUtils.setStyle(item.card).titleText}>
                  <Text style={templateUtils.setStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
                </View>
                <View style={templateUtils.setStyle(item.card).user}>
                  <Text style={templateUtils.setStyle(item.card).company}>{item.company}</Text>
                  <Text style={templateUtils.setStyle(item.card).details}><Ionicons name='ios-call' size={10} /> {item.phoneNumber}{'\n'}
                        <Ionicons name='ios-mail' size={10} /> {item.email}</Text>
                </View>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </Swipeout>
  );

  renderFlatList = () => {
    console.log(item);
    console.log(item.card);
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

  deleteCard() {
    alert("TODO");
  }

  pinCard() {
    alert("TODO");
  }

  archiveCard() {
    alert("TODO");
  }

  render() {
    return (
      <FlatList
        data={this.props.contacts}
        renderItem={this.renderRow}
        keyExtractor={item => item.email}
        ItemSeparatorComponent={this.renderSeparator}
        style={{ marginTop: -2 }}
      />
    );
  }

  rightSwipeButtons = [
    {
      text: 'Archive',
      backgroundColor: 'dodgerblue',
      underlayColor: 'rgba(255, 255, 255, 1.0)',
      onPress: () => { this.archiveCard() }
    },
    {
      text: 'Delete',
      backgroundColor: 'red',
      underlayColor: 'rgba(255, 255, 255, 1.0)',
      onPress: () => { this.deleteCard() }
    },
  ];

  leftSwipeButtons = [
    {
      text: 'Pin',
      backgroundColor: 'orange',
      underlayColor: 'rgba(255, 255, 255, 1.0)',
      onPress: () => { this.pinCard() }
    },
  ];

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
