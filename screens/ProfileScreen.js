import React from 'react';

import { Platform, View, Text } from 'react-native';

import { Icon } from 'react-native-elements';

import CardTemplate from '../components/CardTemplate';


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
    const { navigation } = this.props;
    const userID = navigation.getParam('userID', 'NO ID SET');
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
