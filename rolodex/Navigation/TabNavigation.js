import React from 'react';

import { Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';

function DisplayFilters() {
        return(
          <View>
          <CheckBox
                center
                title='Software'
                checked={this.state.checked}
              />
              <CheckBox
                center
                title='Business'
                checked={this.state.checked}
              />
              <CheckBox
                center
                title='Finance'
                checked={this.state.checked}
              />
              <CheckBox
                center
                title='Hardware'
                checked={this.state.checked}
              /></View>
        );
}
// Home screen that will show the deck of business cards
class HomeScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = { count: 0,
      barVisible: false ,
    filtersChecked: new Map()} 
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));
  }

  setBarVisible(visible) {
    this.setState({
      barVisible: visible
    });
  }


  closeModal() {
    this.setState({
      barVisible: false
    });
  }

  onPress = () => {
    this.setBarVisible(!this.state.barVisible);
    console.log('hello');
    
  }


//<Filter name={item.name} checked={this.state.filtersChecked.get(item.name)} onChange={() => this.handleChange()} />
                     
  // Icons for adding and filtering
  render() {
    return (
      <View>
      <View style={{height:80, backgroundColor:'azure'}}>
        <View style={styles.container}>
          <Ionicons name={`ios-add-circle`} size={30} color={'powderblue'} /> 
        </View>
        <View style={styles.leftTop}>
        <TouchableOpacity onPress={this.onPress}>
          <Ionicons name={'ios-options'}size={30} color={'black'}/>
        </TouchableOpacity>
        </View>
      </View>
      {/*Adding a modal that would display the different filters */}
      <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.barVisible}
          onRequestClose={() => this.closeModal()}
          >
            <View style={styles.modalContainer}>
              <View style={styles.checkContainer}>
                <TouchableOpacity onPress={() => this.closeModal()}>
                  <Ionicons name={'ios-checkmark'}size={50} color={'white'}/>
                </TouchableOpacity>
              </View>
              <View style={styles.innerContainer}>
                <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Select filters:</Text>
              </View>
              <View>
              <DisplayFilters />
              </View>
            </View>
          </Modal>
      </View>
    );
  }
}

// Profile screen that shows own card 
class ProfileScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text>Welcome!</Text>
      </View>
    );
  }
}

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

//Styles of the views of home screen
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
                right: 20,
                top: 40,
  },
  leftTop: {
    position: 'absolute',
                left: 20,
                top: 40,
                
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    height: 400,
    width: 200
  },
  innerContainer: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  checkContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  }
});