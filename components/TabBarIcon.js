import React from 'react';
import { Icon } from 'expo';
import { Text } from 'react-native';
import IconBadge from 'react-native-icon-badge';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <IconBadge
        MainElement={
          <Icon.Ionicons
            name={this.props.name}
            size={27}
            style={{ marginBottom: -8 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        }
        BadgeElement={<Text style={{ color: 'white' }}>1</Text>}
        Hidden={false}
      />
      // <Icon.Ionicons
      //   name={this.props.name}
      //   size={27}
      //   style={{ marginBottom: -8 }}
      //   color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      // />
    );
  }
}
