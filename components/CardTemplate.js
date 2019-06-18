import React from 'react';
import { View, Text,Platform, TouchableOpacity, ImageBackground } from 'react-native';
import { Card, Button } from 'react-native-elements';
import { LinearGradient } from 'expo';
import CardFlip from 'react-native-card-flip';
import apiRequests from '../api_wrappers/BackendWrapper';
import templateStyles from '../styles/TemplateStyles';
import QRCode from 'react-native-qrcode';
import templateUtils from './Templates';
import BusinessCard from './BusinessCard';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  phoneNumber: 99999999,
}

export default class CardTemplate extends React.Component {
  state = {
    userID: 1,
    cardType: 2,
    details: u,
    image: require("../assets/images/templates/template2.png"),
    templateStyle: templateUtils.setProfileStyle(2),
    saved: false,
    picture: null
  }

  componentDidMount() {
    if(global.fromLogin) {
      this.setState({details: global.details, cardType: global.details.card, picture:global.picture})
    }
    setTimeout(() => this.setTemplate(), 20);
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.cancelled) {
      const data = new FormData();

      data.append("card", {
        name: 'businessCard',
        type: result.type,
        uri:
          Platform.OS === "android" ? result.uri : result.uri.replace("file://", "")
      });


      data.append("user", global.userID);
      apiRequests.addCardImage(data);
      apiRequests.setCard(global.userID, 1);
      this.setState({ saved: true, picture: result.uri });
    }
  }


  setTemplate = () => {
    const image = templateUtils.setImage(this.state.cardType);
    const templateStyle = templateUtils.setProfileStyle(this.state.cardType);
    this.setState({ image: image, templateStyle: templateStyle });
  }

  render() {
    console.log('fromLogin is: ' + global.fromLogin);
    const image = this.state.image;
    const u = this.state.details;
    const templateStyle = this.state.templateStyle;
    const saved = this.state.saved;
    if (saved || global.fromLogin) {
      return (
        <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>

          <View style={{ flex: 3 }}>
            <BusinessCard image={image} details={u} templateStyle={templateStyle} picture={this.state.picture}/>
          </View>

        </View>
      )
    } else {
      return (
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View style={{
            flex:1,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 5}}
          >
            <TouchableOpacity style={styles.buttonSaveContainer} onPress={() => this.showGallery()}>
              <Text style={{ fontWeight: 'bold' }}> Gallery </Text>
            </TouchableOpacity>
            <View style={{width:250}}/>
              <TouchableOpacity style={styles.buttonContainer} onPress={this._pickImage}>
                <Ionicons name='ios-qr-scanner' size={26} />
              </TouchableOpacity>
            </View>

            <View style={{ flex: 3 }}>
              <BusinessCard image={image} details={u} templateStyle={templateStyle} picture={this.state.picture}/>
            </View>
        </View>
      );
    }
  }
}
