import React from 'react';
import { View, StyleSheet, TouchableOpacity} from 'react-native';
import { Card,  Button} from 'react-native-elements';
import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
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
          <View><CardFlip style={styles.cardContainer} ref={(card) => this.card = card}>
          <TouchableOpacity style={styles.card} onPress={() => this.card.flip()} >
                  <Card title='name' titleStyle={{color:'darkblue', fontSize: 30}} containerStyle={styles.containerStyle}>
                   <View style={styles.user}>

                   </View>

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
              title="Green"
              buttonStyle={styles.buttonContainer}
              titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.green, navigation)}/>
            <Button
              title="Blue"
              buttonStyle={styles.buttonContainer}
              titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.blue, navigation)}/>
            <Button
              title="Red"
              buttonStyle={styles.buttonContainer}
              titleStyle={{color:'white'}}
              onPress={() => this.onCardTypeRequested(CardTypes.red, navigation)}/>
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

