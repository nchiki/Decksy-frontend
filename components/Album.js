
import React from 'react';
import { StyleSheet,Image,  View, Platform, Text,TouchableOpacity} from 'react-native';
import { Icon } from 'react-native-elements';
import apiRequests from '../api_wrappers/BackendWrapper';
import Grid from 'react-native-grid-component';



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
        color='dodgerblue'
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
    const listItems = (contacts.map(async (cont) => {
      const id = Number.parseInt(cont.user, 10);
      const det = await apiRequests.getUserDetails(id);    
      if (det.card == 1) {
        const pic = await apiRequests.getCardImage(id);
        images[id] = pic

      }
      return det
    }));
    const items = await Promise.all(listItems);
    this.props.navigation.navigate('CollectionSelection', {tag: this.state.tag, contacts: items, images:images })
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
    let backgroundColor = 'white';
    if(this.state.selected && this.state.selected.some(i => (i.user && i.user === item.user ))) {
      backgroundColor = 'grey';
    }
    if(!item.card) {
        return ( null )
    }
    if(item.card == 1) {
        
        return (
        <View style={{flex:1, margin:1, backgroundColor:backgroundColor}}>
            <TouchableOpacity style={styles.card} onPress={() => this.handleSelected(item)}>
                <Image source={{url: images[item.user].url}} style={styles.containerStyle}/>
            </TouchableOpacity>
        </View>
        )
      }
    return (
      <View style={{flex:1, margin:1, backgroundColor:backgroundColor}}>
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
    
   return (
      <Grid style={styles.list} renderItem={this._renderItem}
      data={contacts}
      keyExtractor={item => item.user}
      renderPlaceholder={this.renderPlaceholder}
      numColumns={2}/>

    );
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
