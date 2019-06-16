import React from 'react';
import { View, Text, Platform, StyleSheet, SegmentedControlIOS } from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';

import QRCode from 'react-native-qrcode';
import CardFlip from 'react-native-card-flip';
import templateStyles from '../styles/TemplateStyles';
import { Icon } from "react-native-elements";
import Grid from 'react-native-grid-component';


export default class Albums extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      albums: [{
        name: 'event',
        date: 'date',
        time: 'time',
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
          onPress={() => params.showTimeLine()}
        />

      ),
      headerRight: (
        <Icon
          containerStyle={{ paddingRight: 12 }}
          type="ionicon"
          name={Platform.OS === "ios" ? "ios-add" : "md-add"}
          size={39}
          color='dodgerblue'
          onPress={() => alert('hi')}
        />

      )
    };
  }

  componentDidMount = () => {
    const { navigation } = this.props;
    navigation.setParams({
      showTimeLine: () => this.showTimeLine(),
    });
  }

  showTimeLine = () => {
    this.props.navigation.navigate('TimeLineScreen');
  }

  handleAlbum = (item) => {
    alert('todo');
  }

  _renderAlbum = (item) => (
    <View style={{ width: 180, height: 180, alignItems: 'center', justifyContent: 'center' }}>

      <Text style={{ fontSize: 18, textAlign: 'center' }}>{`${item.name}`}</Text>
      <Text style={{ fontSize: 13, textAlign: 'center' }}>{item.date}</Text>

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
    console.log(this.state.albums)
    return (
      <Grid style={styles.list} renderItem={this._renderAlbum}
        data={this.state.albums}
        keyExtractor={item => item.name}
        numColumns={2} />
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  containerStyle: {
    width: 350,
    height: 200,
    transform: [{
      scale: 0.5
    }],
  },
  containerBackStyle: {
    width: 350,
    height: 200,
  },
  user: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center'
  }

})
