import React from 'react';
import { Text, Button, View, Image, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import Grid from 'react-native-grid-component';
import templateUtils from '../Templates';
import Ionicons from '@expo/vector-icons/Ionicons';
import apiRequests from '../../api_wrappers/BackendWrapper';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  links: 'website.com',
  phoneNumber: 99999999,
}

export default class CollectionSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: "",
            selected:[],
            contacts: [],
            images: []
          }
      }
    
      static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          title: 'Login',
          headerTitleStyle: {
            fontSize: 25
          },
          headerRight: (
            <Button
              title="Save"
              onPress={() => {
                params.save()
              }}
            />
          ),
        }
      };
    

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
        save:  () => this.save()
    })
    const title =  navigation.getParam('tag', 'NULL');
    const contacts = navigation.getParam('contacts', 'NULL');
    const images = navigation.getParam('images', 'NULL');
    this.setState({images:images, contacts: contacts, title: title});
    //this.render();
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
        console.log(item.user)
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
  save = async (navigation) => {
      let selected = this.state.selected;
    for(let i = 0; i < selected.length; i++) {
        const item = selected[i];
        let contactTags = item.tags;
        if( !contactTags) {
            contactTags = [];
            contactTags.push(this.state.title);
            apiRequests.addTag(global.userID, item.user, contactTags)
        
        } else if (!contactTags.some(v => (v.toLowerCase() === this.state.title.toLowerCase()))){
            contactTags.push(this.state.title);
            apiRequests.addTag(global.userID, item.user, contactTags)
        }
    }
  }

  handleSelected = async (item) => {
    let selected = this.state.selected;
    if(selected.some(i => (i.user && i.user === item.user ))) {
        const index = selected.indexOf(item.user);
        selected.splice(index, 1);
    } else {
        selected.push(item);
    }
    this.setState({selected : selected});
  }

  renderPlaceholder = () => {
    <View style={{flex:1}}>
        <View style={styles.containerStyle}>
        </View>
    </View>
  }

  render() {
    let contacts = this.props.navigation.getParam('contacts', 'NULL');
    if(contacts == 'NULL') {
        contacts = [];
    }
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

})