import React from 'react';
import {  FlatList, StyleSheet, Text, ImageBackground, View , Switch} from 'react-native';

import users from '../users/Users';
import templateUtils from './Templates';


export default class ContactCollection extends React.Component{

  constructor(props) {
    super(props);
    this.state = {
      _isMounted : false,
      details: null,
      displayValue: true
    }
  }

  
  _getContact1 = ({item}) => (
    <View style={{height:120, flexDirection: 'row', alignItems:'center'}}>
    
   <View style={{flex:1, alignItems:'center'}}><Text style={{fontSize:15}}>{item.name}</Text>
    <Text style={{fontSize:11}}>{item.subtitle}</Text>
    </View>
      <View style={{flex:3}}>
      <ImageBackground source={templateUtils.setImage(item.templateID)} style={styles.containerStyle}>
                  <View style={styles.containerStyle}>
                  <View style={templateUtils.setStyle(item.templateID).titleText}>
                      <Text style={templateUtils.setStyle(item.templateID).userText} >{`${item.name}`} </Text>
                  </View>
                  <View style={templateUtils.setStyle(item.templateID).user}>
                    <Text style={templateUtils.setStyle(item.templateID).company}>{item.company}</Text>
                    <Text style={templateUtils.setStyle(item.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
                  </View>
                  </View>
                
    </ImageBackground>
      </View> 
     </View>
);
_getContact2 = ({item}) => (
<View style={{height:120}}>
   <ImageBackground source={templateUtils.setImage(item.templateID)} style={styles.containerStyle}>
      <View style={styles.containerStyle}>
        <View style={templateUtils.setStyle(item.templateID).titleText}>
            <Text style={templateUtils.setStyle(item.templateID).userText} >{`${item.name}`} </Text>
        </View>
        <View style={templateUtils.setStyle(item.templateID).user}>
            <Text style={templateUtils.setStyle(item.templateID).company}>{item.company}</Text>
            <Text style={templateUtils.setStyle(item.templateID).details}>{item.phoneNumber}{'\n'}{item.email}</Text>
        </View>
      </View>
              
  </ImageBackground>
</View> 
   
);

  _keyExtractor = (item, index) => item.name;

  componentWillMount() {
    this.setState({
      _isMounted : true,
      details: this.props.contacts
    });
  }

  renderFlatList = () => {
    const users = this.state.details;
    if (users && users.length > 0) {
      return (
        <View style={{alignItems:'center'}}>
        {
          users.map((u, i) => {
            return (
              this._getContact(u, i),
              this.renderSeparator()
            );
          })
        }
        </View>
      )
    } else {
      return null;
    }
  }

  componentWillUnmount() {
    this.setState({_isMounted : false});
  }

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

  changeDisplay = () => {
    const displayValue = !this.state.displayValue;
    this.setState({displayValue  : displayValue});

  };

  render () {
    //if(this.props.displayMode == 'display1') {
      return (
          <FlatList
          data={users}
          renderItem={this._getContact1}
          keyExtractor={item => item.name}
          ItemSeparatorComponent={this.renderSeparator}
          />   
      );
    /*} else {
      return (
        <FlatList
        data={users}
        renderItem={this._getContact2}
        keyExtractor={item => item.name}
        ItemSeparatorComponent={this.renderSeparator}
        />
      );
    }*/
  }

}


const styles = StyleSheet.create({
  containerStyle: {
    width: 350,
    height: 200,
    transform: [{
      scale:0.5
    }],
  },
  containerBackStyle: {
    width: 350,
    height: 200,
  },
  user: {
    alignItems:'center',
    justifyContent: 'center'
  },
})









