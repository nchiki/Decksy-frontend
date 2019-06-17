import React, { Component } from 'react';
import { Camera, BarCodeScanner, Permissions } from 'expo';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableOpacity,
  Linking,
  View,
} from 'react-native';
import { withNavigationFocus } from 'react-navigation';
import Dialog from "react-native-dialog";

import apiRequests from '../api_wrappers/BackendWrapper';

export default class QRCodeScannerScreen extends Component {

  state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
  };

  constructor(props) {
    super(props)
    this.state = {requestDialogVisible: false };
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Scan QR Code',
      headerTitleStyle: {
        fontSize: 25
      }
    }
  };

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  adding = false;

  handleAddUser = (url, withRequest) => {

    /* We're already executing this function */
    if (this.adding) {
      return;
    }
    this.adding = true;

    let elems = url.split('/');

    let userID = parseInt(elems[elems.length - 1]);

    if (withRequest) {
      apiRequests.addRequest(userID, global.userID);
    }
    apiRequests.addCard(userID, global.userID);
    let cb = this.props.navigation.getParam('cb', null);
    if (cb) {
      setTimeout(() => {
        cb();
        this.adding = false;
      }, 20);
    }
    this.props.navigation.navigate("CollectedCards");
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Dialog.Container visible={this.state.requestDialogVisible}>
          <Dialog.Title>Add with request</Dialog.Title>
          <Dialog.Description>Would you like to add them back?</Dialog.Description>
          <Dialog.Button label="No" onPress={() => {this.handleAddUser(this.state.scannedData, false)}} bold={true} />
          <Dialog.Button label="Yes" onPress={() => {this.handleAddUser(this.state.scannedData, true)}} />
        </Dialog.Container>
        <Camera
         style={styles.camera}
         type={this.state.type}
         barCodeScannerSettings={{barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr]}}
         onBarCodeScanned={((obj) => {
            this.setState({
              scannedData: obj.data,
              requestDialogVisible: true});
            // this.handleAddUser(obj.data);
            // this.props.navigation.navigate("CollectedCards");
         })}
        >
          <View style={styles.view} />
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
  },
  view: {
    flex: 1,
    backgroundColor: 'transparent',
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  }
});
