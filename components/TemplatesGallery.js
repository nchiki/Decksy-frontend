import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Button } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import apiRequests from '../api_wrappers/BackendWrapper';
import templateUtils from './Templates';
import BusinessCard from './BusinessCard';
import Ionicons from '@expo/vector-icons/Ionicons';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  links: 'website.com',
  phoneNumber: 99999999,
}

export default class TemplatesGallery extends React.Component {
  state = {
    userID: 1,
    cardType: 2,
    details: u,
    image: require("../assets/images/templates/template2.png"),
    templateStyle: templateUtils.setProfileStyle(2),
    selected: null
  }

  componentDidMount() {
    const { navigation } = this.props;
    const details = navigation.getParam('details', 'NULL');
    this.setState({details: details});
  }

  _renderItem = (item) => {
    console.log(item + ': ' + backgroundColor);
    const image = templateUtils.setImage(item);
    const templateStyle = templateUtils.setStyle(item);
    const det = this.state.details;
    let backgroundColor = 'white';
    if(this.state.selected && this.state.selected == item) {
      backgroundColor = 'powderblue';
    }
    return (
      <View style={{flex:1, margin:1, backgroundColor:backgroundColor}}>
    <TouchableOpacity style={styles.card} onPress={() => {
      this.setState({selected: item});
      this.handleSelected()}}>
            <ImageBackground source={image} style={styles.containerStyle}>
              <View style={styles.containerStyle}>
                <View style={templateStyle.titleText}>
                  <Text style={templateStyle.userText} >{`${det.firstName} ${det.lastName}`} </Text>
                </View>
                <View style={templateStyle.user}>
                  <Text style={templateStyle.company}>{det.company}</Text>
                  <Text style={templateStyle.details}><Ionicons name='ios-call' size={10} /> {det.phoneNumber}{'\n'}
                        <Ionicons name='ios-mail' size={10} /> {det.email}</Text>
                </View>
              </View>
            </ImageBackground>
    </TouchableOpacity>
    </View>
    )
  }
  save = async (navigation) => {
    apiRequests.setCard(global.userID, this.state.cardType);
    const det = await apiRequests.getUserDetails(global.userID);
    this.setState({ saved: true, details: det });
  }

  handleSelected = async () => {
    apiRequests.setCard(global.userID, this.state.selected);
  }

  setTemplate = () => {
    const image = templateUtils.setImage(this.state.cardType);
    const templateStyle = templateUtils.setProfileStyle(this.state.cardType);
    this.setState({ image: image, templateStyle: templateStyle })
  }



  render() {
    return (
         <Grid style={styles.list} renderItem={this._renderItem}
         data={[2,3,4,5,6,7,8,9,10]}
         keyExtractor={item => item}
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
