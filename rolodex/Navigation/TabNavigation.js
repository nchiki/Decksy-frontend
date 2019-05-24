import React from 'react';
import { Text, View, StyleSheet} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import { Ionicons } from '@expo/vector-icons';

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
       <Ionicons name={`ios-add-circle`} size={30} color={'powderblue'} />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Settings!</Text>
      </View>
    );
  }
}
class IconWithBadge extends React.Component {
  render() {
    const { name, badgeCount, color, size } = this.props;
    return (
      <View style={{ width: 24, height: 24, margin: 5 }}>
        <Ionicons name={name} size={size} color={color} />
        {badgeCount > 0 && (
          <View
            style={{
              position: 'absolute',
              right: -6,
              top: -3,
              backgroundColor: 'red',
              borderRadius: 6,
              width: 12,
              height: 12,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{ color: 'white', fontSize: 10, fontWeight: 'bold' }}>
              {badgeCount}
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};
const SettingsIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
return <IconWithBadge  {...props} name={'ios-options'}/>;
};


const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Settings') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
    IconComponent = SettingsIconWithBadge;
  }

  // You can return any component that you like here!
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen },
      Settings: { screen: SettingsScreen },
    },
    {
      defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) =>
          getTabBarIcon(navigation, focused, tintColor),
      }),
      tabBarOptions: {
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
      },
    }
  )
);
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
                right: 20,
                top: 40,
  }
});