import React from 'react';

import { Platform, View, Text } from 'react-native';

import { Icon } from 'react-native-elements';

import CardTemplate from '../components/CardTemplate';
import OptionsMenu from "react-native-options-menu";
import apiRequests from '../api_wrappers/BackendWrapper';


// Profile screen that shows own card
export default class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Profile',
      headerTitleStyle: {
        fontSize: 25
      },
      headerRight: (
        <OptionsMenu
          customButton={(
            <Icon
              containerStyle={{paddingRight: 12}}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-settings" : "md-settings"}
              size={33}
              color='dodgerblue'
            />
          )}
          destructiveIndex={1}
          options={["Edit details", "Sign out", "Cancel"]}
          actions={[() => params.changeSettings(), () => params.logOut(), () => {}]}
        />
      ),
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      changeSettings: () => this.changeSettings(),
      logOut: () => this.logOut(),
    });
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={{flex:1}}>
        <View style={{flex:3}}>
          <CardTemplate navigation={this.props.navigation} />
        </View>
        <View style={{flex:1, alignItems:'center'}}>
          <Text style={{fontSize:24}}>Your shortcode is:</Text>
          <Text style={{fontSize:30}}>{global.userID}</Text>
        </View>
      </View>
    );
  }

  changeSettings = async () => {
    const det = await apiRequests.getUserDetails(global.userID);
    this.props.navigation.navigate('EditDetailsScreen', {details: det});
  }

  logOut = () => {
    global.userID = 1;
    this.props.navigation.navigate('Login');
  }

  onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'React Native | A framework for building native apps using React',
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
}
