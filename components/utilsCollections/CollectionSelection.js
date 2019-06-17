import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import Grid from 'react-native-grid-component';
import templateUtils from '../Templates';
import Ionicons from '@expo/vector-icons/Ionicons';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  links: 'website.com',
  phoneNumber: 99999999,
}

export default class CollectionSelection extends React.Component {
  state = {
    details: u,
    image: require("../../assets/images/templates/template2.png"),
    templateStyle: templateUtils.setStyle(2),
    selected:[],
    contacts: [],
    images: []
  }

  componentDidMount() {
    const { navigation } = this.props;
    const contacts = navigation.getParam('contacts', 'NULL');
    const images = navigation.getParam('images', 'NULL');
    this.setState({images:images, contacts: contacts});
  }

  _renderItem = (item) => {
    let backgroundColor = 'white';
    if(this.state.selected && this.state.selected == item) {
      backgroundColor = 'powderblue';
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
      this.setState({selected: item});
      this.handleSelected()}}>
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
    //apiRequests.setCard(global.userID, this.state.cardType);
    //const det = await apiRequests.getUserDetails(global.userID);
    //this.setState({ saved: true, details: det });
  }

  handleSelected = async () => {
    // api call for setting the tag to that card
    // once clicking on save button the album will render all cards with the tag 
    // equal to the name of the album
  }

  setTemplate = () => {
    //const image = templateUtils.setImage(this.state.cardType);
    //const templateStyle = templateUtils.setStyle(this.state.cardType);
    //this.setState({ image: image, templateStyle: templateStyle })
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
         keyExtractor={item => item}
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