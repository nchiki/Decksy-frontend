import React, { Fragment } from 'react';
import { AppRegistry, Button, FlatList, StyleSheet, ImageBackground, TouchableOpacity, Text, Image, View, TextInput } from 'react-native';
import { List, ListItem, Divider, Card, CardItem } from 'react-native-elements';
import users from '../users/Users';
import CardProfile from '../screens/CardProfileScreen';

import templateUtils from '../components/Templates';

export default class CardProfileScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      text: null,
      templateID: 4,
    }
  }


  static navigationOptions = ({navigation}) => {
    const { params = {} } = navigation.state;
    const firstName = params.item.firstName;
     return {
      title: `${firstName}\'${firstName.endsWith("s") ? "" : "s"} Card`,
      headerTitleStyle: {
        fontSize: 25
      },
      headerLeft: (
        <Button
          onPress={() => {
            saveNotes(navigation);
            navigation.navigate("CollectedCards", this.state)}}
          title="Info"
          color="#fff"
        />
      ),
    }
  };

  saveNotes = async(navigation) => {
    const item = navigation.getParam('item', 'NO-ID');
    console.log(this.props.userID); 
    console.log(item.userID);
    apiRequests.setNote(this.props.userID, item.userID, this.state.text);
  }

  getNotes = async() => {
    const note = await apiRequests.getNote(this.props.userID, item.userID);
    return note;
  }

  render() {
    const { navigation } = this.props;
    const item = navigation.getParam('item', 'NO-ID');
    const defaultText= this.getNotes(); 
    this.setState({text: defaultText}); 
    return (
      <View style={{flex:1}}>
        <View style={{marginTop:30}} alignItems='center'>
          <ImageBackground source={templateUtils.setImage(this.state.templateID)} style={styles.containerStyle}>
            <View style={styles.containerStyle}>
              <View style={templateUtils.setProfileStyle(this.state.templateID).titleText}>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).userText} >{`${item.firstName} ${item.lastName}`} </Text>
              </View>
              <View style={templateUtils.setProfileStyle(this.state.templateID).user}>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).company}>{item.company}</Text>
                <Text style={templateUtils.setProfileStyle(this.state.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
              </View>
            </View>
          </ImageBackground>
        </View>
        <View style={{backgroundColor: 'lightyellow', marginTop:25, marginLeft: 20, marginRight: 20}}>
          <Text style={{fontSize:24, textAlign:'center' }}>Notes:</Text>
          <TextInput style={{fontSize:15}} defaultValue={defaultText}
          onChangeText={(text) => {
            this.setState({text}); 
          }
        }/>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  containerStyle: {
    borderRadius: 10,
    //borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
    width: 350,
    height: 200,
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  },
  card:{
    alignItems:'center',
    justifyContent:'center',
    alignContent:'center'
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
    right: -85,
    bottom: -35,
    fontSize: 15,
    color: color
  }
})
