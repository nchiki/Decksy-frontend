import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Divider, Card} from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import FlipCard from 'react-native-flip-card';
import QRCode from 'react-native-qrcode';
         
const users = [
  {
    name: 'Mr. Roberts',
    company: 'Facebook',
    field: 'Software',
    phoneNumber: '073004889',
    email:'roberts@email.com'
  },
  ]

  
  export default class BusinessCard extends React.Component{

    constructor() {
      super();
      this.state = {
        inputValue: '',
        // Default Value of the TextInput
        valueForQRCode: '',
        // Default value for the QR Code
        };
      } 

    render(){
      return(
             // implemented without image with header
             <View style={{alignItems:'center'}}>
            {
               users.map((u, i) => {
                 return (
                  <View key={i}><FlipCard friction={6}
                  perspective={1000}
                  flipHorizontal={true}
                  flipVertical={false}
                  flip={false}
                  clickable={true}>
                 <Card title={u.name} titleStyle={{color:'darkblue', fontSize: 30}} containerStyle={styles.containerStyle}>
                  <View style={styles.user}>
                    <Text style={styles.company}>{u.company}</Text>
                    <Text style={styles.details}>{u.phoneNumber}{"\n"}{u.email}</Text>
                  </View>
                  <Divider style={{ backgroundColor: 'darkblue', width: 10, bottom: 40}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 30, bottom: 30}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 50, bottom: 20}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 70, bottom: 10}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 90}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 110, bottom: -10}}/>
                  <Divider style={{ backgroundColor: 'darkblue', width: 130, bottom: -20}} />
                  <Divider style={{ backgroundColor: 'darkblue', width: 150, bottom: -30}} />
                  
                  </Card>
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
                  </FlipCard>
                  </View>
                 );
               })
             }
           
           </View>
      )
    }
    
  }

  const styles = StyleSheet.create({
    containerStyle: {
      width: 350,
      height: 200,
    },
    containerBackStyle: {
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
      right: -85,
      bottom: -35,
      fontSize: 15,
      color: 'darkblue'
    }
  })