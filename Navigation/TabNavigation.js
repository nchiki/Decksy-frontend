import React from 'react';

import { Text, View } from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';
import ProfileScreen from '../screens/ProfileScreen';
import HomeScreen from '../screens/HomeScreen';

import { Ionicons } from '@expo/vector-icons';

// Using ionicons to display different icons, here is the sixe/color of those
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

//Styling, can show number of notifications on each screen (useful for messages)
//Now simply shows 3 as badge in menu and nothing on profile

const HomeIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
  return <IconWithBadge {...props} badgeCount={3} />;
};
const ProfileIconWithBadge = props => {
  // You should pass down the badgeCount in some other ways like context, redux, mobx or event emitters.
return <IconWithBadge  {...props} name={'ios-person'}/>;
};


// Design of the botton tab, which returns and highlights the correspondent icon
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;
  if (routeName === 'Home') {
    iconName = `ios-information-circle${focused ? '' : '-outline'}`;
    IconComponent = HomeIconWithBadge;
  } else if (routeName === 'Profile') {
    iconName = `ios-options${focused ? '' : '-outline'}`;
    IconComponent = ProfileIconWithBadge;
  }

  // You can return any component that you like here
  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

// Creating the app container (botton tab) and mapping to relevant screens
export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: { screen: HomeScreen},
      Profile: { screen: ProfileScreen },
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

