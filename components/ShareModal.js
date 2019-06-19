import React from 'react';
import QRCode from 'react-native-qrcode';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, FlatList, TextInput, Image } from 'react-native';
import { Icon } from 'react-native-elements';

const sharingImage = require('../assets/images/qrcodescanner.png');

export default class ShareModal extends React.Component {

  render() {

    if (!this.props.visible) {
      return null;
    }

    return (
      <Modal
        visible={this.props.visible}
        animationType={'slide'}
        onRequestClose={this.closeModal}
        transparent={false}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
                <View style={{flexDirection: 'row', alignSelf: 'flex-end', marginTop: -40, paddingTop: -40}}>
                  <TouchableOpacity onPress={this.props.modalClose}>
                    <Icon
                      type='ionicon'
                      name='ios-close'
                      size={45}
                      color='grey'
                      />
                  </TouchableOpacity>
                </View>
                <Text style={{fontSize: 30, paddingBottom: 10}}>Your shortcode is : {global.userID} </Text>
                <View style={{alignItems: 'center', paddingTop: 0, marginTop: 0, paddingBottom: 100}}>
                  <QRCode
                    value={`https://rolodex.tk/api/user/view/${global.userID}`}
                    //Setting the value of QRCode
                    size={175}
                    //Size of QRCode
                    bgColor="#000"
                    //Backgroun Color of QRCode
                    fgColor="#fff"
                  //Front Color of QRCode
                    />
                </View>
                <Image source={sharingImage} style={{ height: 200 }} resizeMode="contain"/>
                <Text style={{fontSize: 22}}>Let the other person scan your QR code either through the Decksy App or on their camera application!</Text>

          </View>
        </View>
      </Modal>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20
  },
  innerContainer: {
    alignItems: 'center',
    padding: 40
  },
  bigBlueButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2970FF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
