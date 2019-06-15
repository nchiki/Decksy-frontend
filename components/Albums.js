import React from 'react';
import {View,Text, Platform, SegmentedControlIOS} from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';

import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
import templateStyles from '../styles/TemplateStyles';
import { Icon } from "react-native-elements";
import { FlatList } from 'react-native-gesture-handler';


export default class Albums extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      albums: [{
        name:'event',
        date:'date',
        time:'time',
      }]

    }
  }

    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          title: 'Albums',
          headerTitleStyle: {
            fontSize: 25
          },
          headerLeft: (
                <Icon
                  containerStyle={{ paddingLeft: 12 }}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-calendar" : "md-calendar"}
                  size={39}
                  color='dodgerblue'
                  onPress={()=> alert('hi')}
                />
              
          ),
          headerRight: (
                <Icon
                  containerStyle={{ paddingRight: 12 }}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                  size={39}
                  color='dodgerblue'
                  onPress={()=> alert('hi')}
                />
              
          )
      };
    }

    handleAlbum = (name) => {
      alert('todo');
    }

    _getAlbums = ({item}) => (
      <View style={{height:120, flexDirection: 'row', alignItems:'center'}}>
        <View style={{flex:1, alignItems:'flex-start', marginLeft:16}}>
          <Text style={{fontSize:18}}>{`${item.name}`}</Text>
          <Text style={{fontSize:13}}>{item.profession}</Text>
        </View>
        <View style={{flex:3, marginRight:-70, width: 200, height: 200, backgroundColor: 'red'}}>
         
        </View>
      </View>
    );
  
  

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            backgroundColor: "#CED0CE",
          }}
        />
      );
    };
  

    render() {
      return(
      <FlatList
      data={this.state.albums}
      renderItem={this._getAlbums}
      keyExtractor={item => item.name}
      ItemSeparatorComponent={this.renderSeparator}
      />
      )
    }
}