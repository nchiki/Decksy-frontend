
import React from 'react';
import { StyleSheet,Image,ImageBackground,  View, Platform, Text,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import templateUtils from './Templates';
import apiRequests from '../api_wrappers/BackendWrapper';
import Grid from 'react-native-grid-component';
import Ionicons from '@expo/vector-icons/Ionicons';


export default class Album extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tag: null,
      contacts: [],
      images: []
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
        color='#2970FF'
        onPress={()=> params.handleAdd()}
      />
      ),
    }
  };

  componentDidMount() {
    const { navigation } = this.props;
    const tag = navigation.getParam('tag', 'NO-ID');
    let contacts = navigation.getParam('contacts', []);
    let images = navigation.getParam('images', []);
    this.setState({
      tag: tag,
      contacts : contacts, 
      images : images
    })
    navigation.setParams({
      handleAdd: () => this.handleAddCardToCollection(),
    });
   
  }

  handleSelected = (item) => {
    this.props.navigation.navigate('CardProfile', {item: item});
  }

  async handleAddCardToCollection() {
    let images = [];
    const contacts = await apiRequests.getUserContacts(global.userID);
    for(let j = 0; j < contacts.length; j++) {
      const id = Number.parseInt(contacts[j].user, 10);
      if (contacts[j].card == 1) {
        const pic = await apiRequests.getCardImage(id);
        images[id] = pic;
      }
    }
    this.props.navigation.navigate('CollectionSelection', {tag: this.state.tag, contacts: contacts, images:images, selected: this.state.contacts, updateSelected: this.updateSelected })
  }

  updateSelected = (items) => {
    this.setState({contacts: items});
    this.render();
  }

  renderPlaceholder = () => {
    <View style={{flex:1}}>
        <View style={styles.containerStyle}>
        </View>
    </View>
  }

  _renderItem = (item) => {
    const images = this.props.navigation.getParam('images', 'NULL');
    //const images = this.state.images;
    
   
    if(!item.card) {
        return ( null )
    }
    if(item.card == 1) {
        
        return (
        <View style={{flex:1, margin:1}}>
            <TouchableOpacity style={styles.card} onPress={() => this.handleSelected(item)}>
                <Image source={{url: images[item.user].url}} style={styles.containerStyle}/>
            </TouchableOpacity>
        </View>
        )
      }
    return (
    <View style={{flex:1, margin:1}}>
    <TouchableOpacity style={styles.card} onPress={() => {
      this.handleSelected(item)}}>
             <ImageBackground source={templateUtils.setImage(item.card)} style={styles.containerStyle}>
        
        <View style={styles.containerStyle}>
          <View style={templateUtils.setStyle(item.card).titleText}>
            <Text style={templateUtils.setStyle(item.card).userText} >{`${item.firstName} ${item.lastName}`} </Text>
          </View>
          <View style={templateUtils.setStyle(item.card).user}>
            <Text style={templateUtils.setStyle(item.card).company}>{item.company}</Text>
            <Text style={templateUtils.setStyle(item.card).details}><Ionicons name='ios-call' size={10}/> {item.phoneNumber}{'\n'}
            <Ionicons name='ios-mail' size={10}/> {item.email}</Text>
          </View>
        </View>
       
      </ImageBackground>
    </TouchableOpacity>
    </View>
    )
  }

  
  render() {
    let { navigation } = this.props;
    let tag = navigation.getParam('tag', 'NO-ID');
    let contacts = navigation.getParam('contacts', []);
    let mainScreen;
    if (this.state.contacts.length == 0) {
      mainScreen = (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, color: 'grey'}}>You have no cards in the collection</Text>
          <Text style={{fontSize: 15, color: 'grey', marginTop: 12, textAlign: 'center'}}>Add one by tapping the + button in the top-right corner</Text>
        </View>
      )
    } else {
        mainScreen = ( 
        <Grid style={styles.list} renderItem={this._renderItem}
          data={contacts}
          keyExtractor={item => item.user}
          renderPlaceholder={this.renderPlaceholder}
          numColumns={2}/>
     
      )
    }
   return mainScreen;
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,

  },
  containerStyle: {
    width: 350,
    height: 200,
    transform: [{
      scale: 0.5
    }],
  },
  containerBackStyle: {
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
  }
});
