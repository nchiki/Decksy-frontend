import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';

import QRCodeScanner from 'react-native-qrcode-scanner';
import Permissions from 'react-native-permissions';
import { RNCamera } from 'react-native-camera';
import { withNavigationFocus } from 'react-navigation';

export default class QRCodeScannerScreen extends Component {
  onSuccess = (e) => {
    Linking
      .openURL(e.data)
      .catch(err => console.error('An error occured', err));
  } 

  takePicture = async function() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
     // console.log(data.uri);
    }
  };

  render() {
    const { isFocused } = this.props
    return (
      <View style={styles.container}>
        {isFocused &&
          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            style={styles.preview}
            type={RNCamera.Constants.Type.back}
            flashMode={RNCamera.Constants.FlashMode.on}
          />
        }
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> SNAP </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
    // Permissions.request('camera').then(response => {
    //   // Response is one of: 'authorized', 'denied', 'restricted', or 'undetermined'
    //   this.setState({ photoPermission: response });
    //   alert("Hi")
    // });
    // alert("Test")
    // return (
    //   <QRCodeScanner
    //     onRead={this.onSuccess}
    //     topContent={
    //       <Text style={styles.centerText}>
    //         Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
    //       </Text>
    //     }
    //     bottomContent={
    //       <TouchableOpacity style={styles.buttonTouchable}>
    //         <Text style={styles.buttonText}>OK. Got it!</Text>
    //       </TouchableOpacity>
    //     }
    //   />
    // );
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
