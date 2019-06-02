import React from 'react';
import { View,Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Card,  Button} from 'react-native-elements';

import CardFlip from 'react-native-card-flip';
import apiRequests from '../api_wrappers/BackendWrapper';
import Ionicons from '@expo/vector-icons/Ionicons';
import templateStyles from '../styles/TemplateStyles';
import QRCode from 'react-native-qrcode';

const u = {
    firstName : 'FIRST' ,
    lastName: 'LAST',
    company : 'COMPANY',
    email : 'NAME@EMAIL:COM',
    phoneNumber : 99999999,
}
export default class CardTemplate extends React.Component {

  state = {
    cardType: 4,
    details: u,
    image : require("../assets/images/template4.png"),
    templateStyle : templateStyles.getStyle4()
  }

  onCardTypeRightRequested = () => {
    let cardType = this.state.cardType + 1;
    if(cardType > 10) {
        cardType = 2;
    }
    this.setState({cardType: cardType});
    setTimeout(() => this.setTemplate(), 20);
  }
  onCardTypeLeftRequested = () => {
    let cardType = this.state.cardType - 1;
    if(cardType < 2) {
        cardType = 10;
    }
    this.setState({cardType: cardType});
    setTimeout(() => this.setTemplate(), 20);
  }

  save = async (navigation) => {
    const det = await apiRequests.getUserDetails(2);
    apiRequests.setUserCard(ID, this.state.cardType, null);
    const image = this.state.image;
    const templateStyle = this.state.templateStyle;
    navigation.push('CardScreen', {templateStyle: templateStyle, image: image, details:det});   
  }

  setTemplate = () => {
    let image = null;
    let templateStyle = null;
      switch(this.state.cardType) {
        case 2:
                image = require("../assets/images/template2.png");
                templateStyle = templateStyles.getStyle2();
                break;
        case 3 :
                image = require("../assets/images/template3.png");
                templateStyle = templateStyles.getStyle3();
                break;
        case 4 :
                image = require("../assets/images/template4.png");
                templateStyle = templateStyles.getStyle4();
                break;
        case 5 :
                image = require("../assets/images/template5.png");
                templateStyle = templateStyles.getStyle5();
                break;
        case 6 : 
                image = require("../assets/images/template6.png");
                templateStyle = templateStyles.getStyle6();
                break;
        case 7 :        
                image = require("../assets/images/template7.png");
                templateStyle = templateStyles.getStyle7();
                break;
        case 8 :
                image = require("../assets/images/template8.png");
                templateStyle = templateStyles.getStyle8();
                break;
        case 9 :
                image = require("../assets/images/template9.png");
                templateStyle = templateStyles.getStyle9();
                break;
        case 10 : 
                image = require("../assets/images/template10.png");
                templateStyle = templateStyles.getStyle10();
                break;
      }
      this.setState({image : image, templateStyle: templateStyle})
  }

  render() {
    const image = this.state.image;
    const u = this.state.details;
    const templateStyle = this.state.templateStyle;
    return (
<View style={{flex:1, alignItems:'center'}}>
          <View style= {{top:100}}>
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
              <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                <ImageBackground source={image} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateStyle.titleText}>
                      <Text style={templateStyle.userText} >{`${u.firstName} ${u.lastName}`} </Text>
                  </View>
                  <View style={templateStyle.user}>
                    <Text style={templateStyle.company}>{u.company}</Text>
                    <Text style={templateStyle.details}><Ionicons name='ios-call' size={10}/> {u.phoneNumber}{'\n'}
                    <Ionicons name='ios-mail' size={10}/> {u.email}</Text>
                  </View>
                  </View>
                
                </ImageBackground>
              </TouchableOpacity>
              <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                <Card title='Scan' titleStyle={{color:'darkblue', fontSize: 30}} containerStyle={styles.containerBackStyle}>
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
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onCardTypeLeftRequested()}>
              <Ionicons name='ios-arrow-dropleft' size={26}/> 
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonSaveContainer} onPress={() => this.save(this.props.navigation)}>
              <Text style={{fontWeight:'bold'}}> Save </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonContainer} onPress={() => this.onCardTypeRightRequested()}>
              <Ionicons name='ios-arrow-dropright' size={26}/> 
            </TouchableOpacity>
          </View>
        </View>
      );
    }
}


  const styles = StyleSheet.create({
    cardContainer:{
      top:20,
      width: 350,
      height: 200,
      alignItems:'center',
      justifyContent:'center',
      
      borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
    },
    card:{
      alignItems:'center',
      justifyContent:'center',
      alignContent:'center',
      borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
    },
    buttonRowContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding:5,
    },
    buttonContainer: {
      margin: 5,
    },
    buttonSaveContainer: {
        margin: 5,
        height:30,
        width: 60,
        borderWidth:2,
        alignItems: 'center',
        justifyContent: 'center'
    },
    containerStyle: {
      borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
      alignItems: 'center',
      width: 350,
      height: 200,
    },
    containerBackStyle:{
      width: 350,
      height: 200,
      borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
    },
    
  })
          

