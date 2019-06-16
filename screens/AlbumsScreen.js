import React from 'react';
import {View,Text, Platform, StyleSheet,TouchableOpacity} from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';
import Dialog from "react-native-dialog";

import templateStyles from '../styles/TemplateStyles';
import { Icon} from "react-native-elements";
import Grid from 'react-native-grid-component';



export default class AlbumsScreen extends React.Component {



    state = {
      albums : [{
        name:'event',
        date:'date',
        time:'time',
      }],
      createAlbumVisible:false,

    }
  

  componentDidMount () {
    const { navigation } = this.props;
    navigation.setParams({
      handleCreateAlbum: this.handleCreateAlbum,
      
    });
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
                  onPress={()=> params.handleCreateAlbum()}
                />
              
          )
      };
    }

    handleCreateAlbum= () => {
      this.setState({createAlbumVisible : true})
    }

    handleCancel = () => {
      this.setState({createAlbumVisible : false})
    }

    handleAlbum = (name) => {
      let albums = this.state.albums;
      const newCollection = {
        name:name,
        date: '',
        time:'',
      }
      albums.push(newCollection)
      console.log(albums);
      this.setState({albums: albums, createAlbumVisible : false})
      this.render();
    }

    handleOpenCollection = (item) => {
      this.props.navigation.navigate('Album', { tag: item.name });
    }

    _renderAlbum = (item) => (
      <View style={{flex:1, margin:0.5, alignItems:'center'}}>
          <TouchableOpacity style={{width:100, height:100}} onPress={()=>this.handleOpenCollection(item)}>   
            <Text style={{width: 150,fontSize:28, textAlign: 'center'}}>{`${item.name}`}</Text>
            <Text style={{width: 150, fontSize:23, textAlign: 'center'}}>{item.date}</Text>
          </TouchableOpacity>   
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
        <View style={{flex:1}}>
         
           <Dialog.Container visible={this.state.createAlbumVisible}>
            <Dialog.Title>New Collection</Dialog.Title>
            <Dialog.Description>Enter the name of the new collection:</Dialog.Description>
            <Dialog.Input onChangeText={(inputText) => alert(inputText)} />
            <Dialog.Button label="Cancel" onPress={this.handleCancel} bold={true} />
            <Dialog.Button label="Create" onPress={this.handleAlbum} />
          </Dialog.Container>
        
          <View style={{flex:1}}>
          <Grid style={styles.list} renderItem={this._renderAlbum}
          data={this.state.albums}
          keyExtractor={item => item}
          numColumns={2}/> 
          </View>
        </View>
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
