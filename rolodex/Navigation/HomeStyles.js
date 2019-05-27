import React from 'react';
import {Image, Modal, Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import { createBottomTabNavigator, createAppContainer } from 'react-navigation';

//Styles of the views of home screen
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
                right: 20,
                top: 40,
  },
  leftTop: {
    position: 'absolute',
                left: 20,
                top: 40,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
    height: 400,
    width: 200
  },
  innerContainer: {
    position: 'absolute',
    left: 10,
    top: 30,
  },
  checkContainer: {
    position: 'absolute',
    right: 20,
    top: 20,
  },
  modalAddContainer: {

    justifyContent: 'center',
    backgroundColor: 'powderblue',
    height: 400,
    width: 200,
    alignSelf:'flex-end'
  },
  bigTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
})
export default styles;