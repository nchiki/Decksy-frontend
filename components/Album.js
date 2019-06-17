
import React from 'react';
import { StyleSheet, View, Platform} from 'react-native';
import { Icon } from 'react-native-elements';
import apiRequests from '../api_wrappers/BackendWrapper';




export default class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: null,
      contacts: []
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
      headerRight: (
        <Icon
        containerStyle={{ paddingRight: 12 }}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={39}
        color='dodgerblue'
        onPress={()=> params.handleAdd()}
      />
      ),
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const tag = navigation.getParam('tag', 'NO-ID');
    let contacts = navigation.getParam('contacts', 'NULL');
    if (contacts == 'NULL') { contacts = []}
    this.setState({
      tag: tag,
      contacts : contacts
    })
    navigation.setParams({
      handleAdd: () => this.handleAddCardToCollection(),
    });
   
  }


  async handleAddCardToCollection() {
    let images = [];
    const contacts = await apiRequests.getUserContacts(global.userID);
    const listItems = (contacts.map(async (cont) => {
      const id = Number.parseInt(cont.user, 10);
      const det = await apiRequests.getUserDetails(id);    
      if (det.card == 1) {
        const pic = await apiRequests.getCardImage(id);
        images[id] = pic
        console.log('there is a card for:' + id)
      }
      return det
    }));
    const items = await Promise.all(listItems);
    this.props.navigation.navigate('CollectionSelection', {tag: this.state.tag, contacts: items, images:images })
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
