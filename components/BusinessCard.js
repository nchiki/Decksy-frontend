import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground} from 'react-native';
import { Divider, Card,  Button} from 'react-native-elements';
import apiRequests from '../api_wrappers/BackendWrapper';

import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
import templateStyles from '../styles/TemplateStyles';


const ID =2;
export default class BusinessCard extends React.Component{
   
    constructor() {
        super();
        this.state = {
          inputValue: '',
          // Default Value of the TextInput
          valueForQRCode: '',
          // Default value for the QR Code
          saved: false,
          templateID : 8
          };
        }


    onChangeRequested = async (color) => {
      apiRequests.setUserCard(ID, 1, color);
      setTimeout(() => this.setState({saved: true}), 20);
    }


      
    render(){
      console.log(this.state.templateID);
      const template= this.state.templateID;
      const image = require("../assets/images/template9.png");
      const u = this.props.navigation.getParam('details', 'NO-ID');
      const color = this.props.navigation.getParam('color', 'NO-ID');
      const templateStyle = templateStyles.getStyle9();
      
      console.log(templateStyle);

    if(this.state.saved) {
      return (
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
          <Text style={{fontSize:30, fontWeight:'bold'}}>
            Saved!
          </Text>
        </View>
      )
    } else {
      return (
        // implemented without image with header
        <View style={{flex:1, alignItems:'center'}}>
          <View>
            <CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
              <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                <ImageBackground source={image} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateStyle.titleText}>
                      <Text style={templateStyle.userText} >{`${u.firstName} ${u.lastName}`} </Text>
                  </View>
                  <View style={templateStyle.user}>
                    <Text style={templateStyle.company}>{u.company}</Text>
                    <Text style={templateStyle.details}>{u.phoneNumber}{'\n'}{u.email}</Text>
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
            <Button
              title="Save"
              buttonStyle={styles.buttonContainer}
              titleStyle={{color:'white'}}
              onPress={() => this.onChangeRequested(color)}
            />
          </View>
        </View>
      );
    }
  }
}
  const styles = StyleSheet.create({
    cardContainer:{
      top:20,
      width: 350,
      height: 200,
      alignItems:'center',
      justifyContent:'center',
      alignContent:'center',
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
    },
    buttonContainer: {
      top:-70,
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
    containerBackStyle:{
      width: 350,
      height: 200,
      borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white'
    },
    
  })

  