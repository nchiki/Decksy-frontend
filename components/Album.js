
import React from 'react';
import { Alert, ScrollView, StyleSheet, ImageBackground, Text, View, TextInput, Platform, Linking } from 'react-native';
import { Icon, Button } from 'react-native-elements';
import Dialog from "react-native-dialog";
import call from 'react-native-phone-call';
import apiRequests from '../api_wrappers/BackendWrapper';
import OptionsMenu from "react-native-options-menu";
import email from 'react-native-email';
import templateUtils from '../components/Templates';
import Ionicons from '@expo/vector-icons/Ionicons';
import { SocialIcon } from 'react-native-elements';


export default class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: null,
      cards: []
    }
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    const tag = params.tag;
    return {
      title: tag,
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <Icon
          containerStyle={{ paddingLeft: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
          size={39}
          color='dodgerblue'
          onPress={() => params.showTimeLine()}
        />
      ),
      headerRight: (
        <Icon
          containerStyle={{ paddingRight: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          size={39}
          color='dodgerblue'
          onPress={() => params.handleAdd()}
        />
      ),
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const tag = navigation.getParam('tag', 'NO-ID');
    this.setState({
      tag: tag,
    })
    navigation.setParams({
      handleAdd: () => this.handleAddCard(),
      showTimeLine: () => this.showTimeLine(),
    });

  }


  async handleAddCard() {

  }


  showTimeLine = () => {
    this.props.navigation.navigate('TimeLineScreen');
  }


  render() {
    let { navigation } = this.props;
    let tag = navigation.getParam('tag', 'NO-ID');
    return (
      <View style={{ flex: 1 }}>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    borderColor: 'white',
    alignItems: 'center',
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
  },
  MainContainer: {
    flex: 1,
    marginTop: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0F7FA',
  }
});

