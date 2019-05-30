import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Divider, Card,  Button} from 'react-native-elements';
import apiRequests from '../api_wrappers/BackendWrapper';

import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
const CardTypes = Object.freeze({"green":1, "blue":2, "red":3})

const u = {
  name: 'Mr. Roberts',
  company: 'Facebook',
  field: 'Software',
  phoneNumber: '073004889',
  email:'roberts@email.com',
  color: ''
}

export default class BusinessCard extends React.Component{

    constructor() {
        super();
        this.state = {
          inputValue: '',
          // Default Value of the TextInput
          valueForQRCode: '',
          // Default value for the QR Code
          saved: false
          };
        }


    onChangeRequested = async (color) => {
      u.color = color;
      console.log(u.color);
      apiRequests.setUserCard(1, 1, color);
      setTimeout(() => this.setState({saved: true}), 20);
    }

    render(){
      const color = this.props.navigation.getParam('color', 'NO-ID');
      
        if(this.state.saved) {
          return (
            <View style={{flex:1, alignItems:'center', justifyContent:'center'}}><Text style={{fontSize:30, fontWeight:'bold'}}>
              Saved!</Text></View>
          )

        } else {
          return (
          
             // implemented without image with header
             <View style={{flex:1, alignItems:'center'}}>
          <View><CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
          <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                  <Card title={u.name} titleStyle={{color:color, fontSize: 30}} containerStyle={styles.containerStyle}>
                   <View style={styles.user}>
                     <Text style={cardStyles(color).company}>{u.company}</Text>
                     <Text style={cardStyles(color).details}>{u.phoneNumber}{'\n'}{u.email}</Text>
                   </View>
                   <Divider style={{ backgroundColor: color, width: 10, bottom: 40}} />
                   <Divider style={{ backgroundColor: color, width: 30, bottom: 30}} />
                   <Divider style={{ backgroundColor: color, width: 50, bottom: 20}} />
                   <Divider style={{ backgroundColor: color, width: 70, bottom: 10}} />
                   <Divider style={{ backgroundColor: color, width: 90}} />
                   <Divider style={{ backgroundColor: color, width: 110, bottom: -10}}/>
                   <Divider style={{ backgroundColor: color, width: 130, bottom: -20}} />
                   <Divider style={{ backgroundColor: color, width: 150, bottom: -30}} />

    

                   </Card>
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
            onPress={() => this.onChangeRequested(color)
            }
            
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
      alignContent:'center'
    },
    card:{
      alignItems:'center',
      justifyContent:'center',
      alignContent:'center'
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
      width: 350,
      height: 200,
    },
    containerBackStyle:{
      width: 350,
      height: 200,
    },
    user: {
      alignItems:'center',
      justifyContent: 'center'
    },

    company: {
      fontSize: 25,
      fontWeight: 'bold',
      color: 'darkblue',
      justifyContent: 'center',
    },
    details: {
      right: -90,
      bottom: -35,
      fontSize: 15,
      color: 'darkblue'
    }
  })

  const cardStyles = (color) => StyleSheet.create({
    company: {
      fontSize: 25,
      fontWeight: 'bold',
      color: color,
      justifyContent: 'center',
    },
    details: {
      right: -90,
      bottom: -35,
      fontSize: 15,
      color: color
    }
  });
