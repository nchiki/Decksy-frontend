import React from 'react';
import { Icon } from 'expo';
import { Text, StyleSheet } from 'react-native';
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
            style={styles.icon}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        }
        BadgeElement={<Text style={styles.badgeElement}>1</Text>}
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

const styles = StyleSheet.create({
  badgeElement: {
    color: 'white',
    marginRight: 0,
  },
  icon: {
    marginBottom: -8
  },
});
