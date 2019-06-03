import {createStackNavigator, createAppContainer} from 'react-navigation';
import CardProfileScreen from '../screens/CardProfileScreen';
import ContactCollection from '../components/ContactCollection';

export default createStackNavigator(
  {
    Contacts: ContactCollection,
    CardProfile: CardProfileScreen,
  },
  {
    initialRouteName: 'Contacts'
  }
);