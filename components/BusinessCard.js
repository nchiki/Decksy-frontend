import React from 'react';
import {Image, View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { Divider, Card, Button } from 'react-native-elements';
import apiRequests from '../api_wrappers/BackendWrapper';

import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
import templateStyles from '../styles/TemplateStyles';


const ID = 2;
export default class BusinessCard extends React.Component {

  constructor() {
    super();
    this.state = {
      inputValue: '',
      // Default Value of the TextInput
      valueForQRCode: '',
      // Default value for the QR Code
      saved: false,
      image: null,
      templateStyle: null,
      links: [],
      picture: null
    };
  }



  onChangeRequested = async (color) => {
    setTimeout(() => this.setState({ saved: true }), 20);
  }

  resolveLinks = async () => {
    //const link = await apiRequests.getLink(this.props.details.links[0]);
    for (let i = 0; i < this.props.details.links.length; i++) {
      const link = apiRequests.getLink(this.props.details.links[i]);
      // console.log(link);
      // console.log(link.name);
      // console.log(link.value);
      this.state.links.push({ name: link.name });
    }
  }

  /*  var linkName = [];
     for (let i = 0; i < this.state.links.length; i++) {
       linkName.push(
         <Text key={i}>
           {'\n'}{this.state.links[i]}
         </Text>
       )
     }
     return linkName;
   }
   */
displayCard(props) {
  const u = props.details;
    //this.resolveLinks();
    //console.log(this.state.links[0]);
   let image = props.image;
    const templateStyle = props.templateStyle;
    if(props.picture) {
      image= props.picture;
      return (
        <Image source={{ uri: image }} style={{ width: 350, height: 200 }} />
      )
    } else {
    return (
      <ImageBackground source={image} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                    <View style={templateStyle.titleText}>
                      <Text style={templateStyle.userText} >{`${u.firstName} ${u.lastName}`} </Text>
                    </View>
                    <View style={templateStyle.user}>
                      <Text style={templateStyle.company}>{u.company}</Text>
                      <Text style={templateStyle.details}>{u.phoneNumber}{'\n'}{u.email}{'\n'}{this.state.links.pop()}</Text>
                    </View>
                  </View>

    </ImageBackground>
    )
    }
}

  render() {
    // const u = this.props.navigation.getParam('details', 'NO-ID');
    // const image = this.props.navigation.getParam('image', 'NO-ID');
    // const templateStyle = this.props.navigation.getParam('templateStyle', 'NO-ID');

    const u = this.props.details;
    //this.resolveLinks();
    //console.log(this.state.links[0]);
    const image = this.props.image;
    const templateStyle = this.props.templateStyle;

    if (this.state.saved) {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ fontSize: 30, fontWeight: 'bold' }}>
            Saved!
          </Text>
        </View>
      )
    } else {
      return (
        // implemented without image with header
        <View style={{ flex: 1, alignItems: 'center' }}>
          <View>
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
              <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                {this.displayCard(this.props)}
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                <Card title='Scan' titleStyle={{ color: 'darkblue', fontSize: 30 }} containerStyle={styles.containerBackStyle}>
                  <QRCode
                    value={this.state.valueForQRCode}
                    //Setting the value of QRCode
                    size={100}
                    //Size of QRCode
                    bgColor="#000"
                    //Backgroun Color of QRCode
                    fgColor="#fff"
                  //Front Color of QRCode
                  />
                </Card>
              </TouchableOpacity>
            </CardFlip>
          </View>
          <View style={styles.buttonRowContainer}>
 
          </View>
        </View>
      );
    }
  }
}
const styles = StyleSheet.create({
  cardContainer: {
    top: 20,
    width: 350,
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },
  buttonRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    top: -70,
    width: 100,
    backgroundColor: 'darkblue'
  },
  containerStyle: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  containerBackStyle: {
    width: 350,
    height: 200,
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
  },

})
