import React, { Component } from 'react';

import { Camera, BarCodeScanner, Permissions } from 'expo';
import apiRequests from '../api_wrappers/BackendWrapper';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import { withNavigationFocus } from 'react-navigation';

export default class QRCodeScannerScreen extends Component {

  state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  adding = false;

  handleAddUser = (url) => {

    /* We're already executing this function */
    if (this.adding) {
      return;
    }

    this.adding = true;
    let elems = url.split('/');
    console.log(`elems: ${elems}`);
    let userId = parseInt(elems[elems.length - 1]);
    console.log(`userID: ${userId}`);
    apiRequests.addCard(userId, global.userID);
    let cb = this.props.navigation.getParam('cb', null);
    if (cb) {
      setTimeout(() => {
        cb();
        this.adding = false;
      }, 20);
    }

  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Camera
         style={{ flex: 1 }}
         type={this.state.type}
         barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],}}
         onBarCodeScanned={((obj) => {
            this.handleAddUser(obj.data);
            this.props.navigation.navigate("CollectedCards");
         })}
        >
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
          </View>
        </Camera>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  }
});
// const styles = StyleSheet.create({
//   centerText: {
//     flex: 1,
//     fontSize: 18,
//     padding: 32,
//     color: '#777',
//   },
//   textBold: {
//     fontWeight: '500',
//     color: '#000',
//   },
//   buttonText: {
//     fontSize: 21,
//     color: 'rgb(0,122,255)',
//   },
//   buttonTouchable: {
//     padding: 16,
//   },
// });

// import React, { Component } from 'react';
//
// import addUserToContacts from '../api_wrappers/BackendWrapper';
//
// import { QRCodeScanner } from 'react-native-qrcode-scanner';
// import { Alert, Text, TouchableOpacity } from 'react-native';
//
// export default class QRCodeScannerScreen extends Component {
//   render() {
//     return (
//       // <Text>Hello!</Text>
//       // <QRCodeScanner onRead={(qrCode) => alert(`QR Code Scanned! (${qrCode})`)} />
//       <QRCodeScanner
//         onRead={alert("YAY!")}
//         topContent={
//           <Text>
//             Go to <Text>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
//           </Text>
//         }
//         bottomContent={
//           <TouchableOpacity>
//             <Text>OK. Got it!</Text>
//           </TouchableOpacity>
//         }
//       />
//       // <QRCodeScanner onRead={(qrCode) => addUserToContacts(this.userID, qrCode)} />
//     );
//   }
// }
