import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import { Divider, Card,  Button} from 'react-native-elements';

import { createStackNavigator, createAppContainer } from 'react-navigation';
import QRCode from 'react-native-qrcode';
import FlipCard from 'react-native-flip-card';
import LinksStack from '../navigation/TabNavigation';
const CardTypes = Object.freeze({"green":1, "blue":2, "red":3})

export default class CardTemplate extends React.Component {

  state = {
    cardType: null
  }

  onCardTypeRequested = (cardType, navigation) => {
    this.setState({cardType: cardType});
    setTimeout(() => this.cardForType(this.state.cardType, navigation), 20);
  }

  cardForType = (type, navigation) => {
    switch (type) {
      case CardTypes.green:
        navigation.push('CardScreen', {color: 'darkgreen'});
        break;
      case CardTypes.blue:
        navigation.push('CardScreen',{color: 'darkblue'});
        break;
      case CardTypes.red:
        navigation.push('CardScreen', {color: 'darkred'});
        break;
    }
  }

  render() {
  const navigation = this.props.navigation;
    return (

      <View style={{flex:1}}>
          <View style={{alignItems:'center'}}><FlipCard friction={6}
                   perspective={1000}
                   flipHorizontal={true}
                   flipVertical={false}
                   flip={false}
                   clickable={true}>
                  <Card title='name' titleStyle={{color:'darkblue', fontSize: 30}} containerStyle={styles.containerStyle}>
                   <View style={styles.user}>

                   </View>

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

          <View style={styles.buttonRowContainer}>
            <Button title="Green" buttonStyle={styles.buttonContainer} titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.green, navigation)}/>
            <Button title="Blue" buttonStyle={styles.buttonContainer} titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.blue, navigation)}/>
            <Button title="Red" buttonStyle={styles.buttonContainer} titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.red, navigation)}/>

          </View>
        </View>


    );
  }
}


const styles = StyleSheet.create({

  buttonRowContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    top: 40,
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

{/*const RootStack = createStackNavigator(
  {
    CardScreen: {screen : BusinessCard},
    TemplateScreen: {screen: CardTemplate},
  },
  {
    initialRouteName: 'Home',
  }
);*/}
