import React from 'react';

import { Platform } from 'react-native';

import { Icon } from 'react-native-elements';

import CardTemplate from '../components/CardTemplate';


// Profile screen that shows own card
export default class ProfileScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Profile',
      headerRight: (
        <Icon
          containerStyle={{paddingRight: 12}}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-share" : "md-share"}
          onPress={() => params.onShare}
          size={34}
          color='dodgerblue'
        />
      ),
    }
  };

  render() {
    return (
      <CardTemplate navigation={this.props.navigation} />
    );
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
