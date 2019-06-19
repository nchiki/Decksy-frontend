import React from 'react';
import {View, Image,Text, Platform, StyleSheet,TouchableOpacity} from 'react-native';
import apiRequests from '../api_wrappers/BackendWrapper';
import Dialog from "react-native-dialog";
import Swiper from 'react-native-deck-swiper'
import templateStyles from '../styles/TemplateStyles';
import { Icon} from "react-native-elements";
import Grid from 'react-native-grid-component';



export default class AlbumsScreen extends React.Component {

    state = {
      albums : [],
      createAlbumVisible:false,
      deleteVisible : false,
    }


  componentDidMount () {
    const { navigation } = this.props;
    navigation.setParams({
      handleCreateAlbum: this.handleCreateAlbum,
      deleteAlbums : this.deleteAlbums,
      saveState : this.saveState,
    });
    this.setState({albums: global.tags})
  }
    static navigationOptions = ({ navigation }) => {
        const { params = {} } = navigation.state;
        return {
          title: 'Collections',
          headerTitleStyle: {
            fontSize: 25
          },
          headerLeft: (
            
                <Icon
                  containerStyle={{ paddingLeft: 12 }}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-trash" : "md-trash"}
                  size={31}
                  color='#2970FF'
                  onPress={()=> params.deleteAlbums()}
                />
          ),
          headerRight: (
                <Icon
                  containerStyle={{ paddingRight: 12 }}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-add" : "md-add"}
                  size={41}
                  color='#2970FF'
                  onPress={()=> params.handleCreateAlbum()}
                />

          )
      };
    }

   

    saveState = () => {
      setTimeout( () => this.setState({deleteVisible: false}), 20);
      
    }
    handleCreateAlbum= () => {
      this.setState({createAlbumVisible : true})
    }

    handleCancel = () => {
      this.setState({createAlbumVisible : false})
    }

    handleAlbum = () => {
      let name = this.state.newCollection;
      let albums = this.state.albums;
      albums.push(name);
      this.setState({albums: albums, createAlbumVisible : false})
      this.render();
    }

    handleOpenCollection = async (item) => {
      if(this.state.deleteVisible) {
        setTimeout(() => this.delete(item), 20);
      
      } else {
      let images = [];
      let contacts = [];
      const allcontacts = await apiRequests.getUserContacts(global.userID);
      for(let j = 0; j < allcontacts.length; j++) {
        const id = Number.parseInt(allcontacts[j].user, 10);
        if(allcontacts[j].tags && allcontacts[j].tags.length > 0) {

          if (allcontacts[j].tags.some(v => (v.toLowerCase() === item.toLowerCase()))){
            contacts.push(allcontacts[j]);
          }
        }
        if (allcontacts[j].card == 1) {
          const pic = await apiRequests.getCardImage(id);
          images[id] = pic
        }
      }
      this.props.navigation.navigate('Album', { tag: item, contacts: contacts, images: images });
    }
    }

    renderPlaceholder = () => {
      <View style={{flex:1}}>
          <View style={styles.containerStyle}>
          </View>
      </View>
    }

    _renderAlbum = (item) => {
      let conditionalButton = null;
      if (this.state.deleteVisible) { 
       conditionalButton = 
        <Icon
                  containerStyle={{
                    borderRadius: 20,
                    height: 30,
                    width: 30,
                    backgroundColor: 'red',
                    position: 'absolute',
                    left: 170,
                    right: 0,
                    top: 0,
                    bottom: 0, alignItems:'center', justifyContent:'center' }}
                  type="ionicon"
                  name={Platform.OS === "ios" ? "ios-close" : "md-close"}
                  size={30}
                  color='white'
                  onPress={()=> this.delete(item)}
                />
      }
      return (
        <View style={{width: 200, height: 150, margin:1}}>
          
      <View style={{width: 200, height: 150, alignItems:'center', justifyContent:'center', backgroundColor: '#2970FF'}}>
        { conditionalButton}
 
          <TouchableOpacity style={styles.card} onPress={()=> this.handleOpenCollection(item)}>

            <Text style={{fontSize:20, textAlign: 'center', color: 'white', fontWeight: 'bold'}}>{`${item}`}</Text>

          </TouchableOpacity>
      </View>
      </View>
    );
    }


    delete = async (item) => {
      const albums = this.state.albums;
      const indexAlbum = albums.indexOf(item);
      const allcontacts = await apiRequests.getUserContacts(global.userID);
      for(let j = 0; j < allcontacts.length; j++) {
        const id = Number.parseInt(allcontacts[j].user, 10);
        if(allcontacts[j].tags && allcontacts[j].tags.length > 0) {
          if (allcontacts[j].tags.some(v => (v.toLowerCase() === item.toLowerCase()))){
            const tags = allcontacts[j].tags;
            const index = tags.indexOf(item);
            tags.splice(index, 1);
            apiRequests.addTag(global.userID, id, tags);
          }
        }
      }
      albums.splice(indexAlbum, 1);
      this.setState({albums: albums});
    }


    deleteAlbums = () => {
      let newVisible = !this.state.deleteVisible;
      setTimeout(()=> this.setState({deleteVisible : newVisible}), 20);
      
    }


    render() {
      let mainScreen;
      if (this.state.albums.length == 0) {
      mainScreen = (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 25, color: 'grey'}}>You have no collections</Text>
          <Text style={{fontSize: 15, color: 'grey', marginTop: 12, textAlign: 'center', width: "90%"}}>Create one by tapping the + button in the top-right corner</Text>
        </View>
      )
    } else {
        mainScreen = ( <View style={{flex:1}}>
        <Grid style={styles.list} renderItem={this._renderAlbum}
        data={this.state.albums}
        renderPlaceholder = {this.renderPlaceholder}
        keyExtractor={item => item}
        numColumns={2}/>
        </View>
      )
    }
      return (
        <View style={{flex:1, alignContent:'center', justifyContent: 'center', alignItems: 'center'}}>

           <Dialog.Container visible={this.state.createAlbumVisible}>
            <Dialog.Title>New Collection</Dialog.Title>
            <Dialog.Description>Enter the name of the new collection:</Dialog.Description>
            <Dialog.Input onChangeText={(inputText) => this.setState({newCollection: inputText})} />
            <Dialog.Button label="Cancel" onPress={this.handleCancel} bold={true} />
            <Dialog.Button label="Create" onPress={this.handleAlbum} />
          </Dialog.Container>
          {mainScreen}

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
    alignContent: 'center',
    width: 200, height: 150
  }

})
