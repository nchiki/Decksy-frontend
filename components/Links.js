import React from 'react';
import { Platform, View, Text, Modal,TouchableOpacity, Button, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Dialog from "react-native-dialog";
import apiRequests from '../api_wrappers/BackendWrapper';


export default class Links extends React.Component {

  constructor() {
    super()
  }

  state = {
    links: [null, null, null],
    modalVisible: false,
    gitlabVisible: false,
    linkedInVisible : false,
    personalVisible : false,
    personal: 'per',
    gitlab: 'git',
    linkedin: 'lin'
  }

  async componentDidMount() {
    /* Get all the link details */
    let allLinks = [];
    for (let l of global.details.links) {
      allLinks.push(await apiRequests.getLink(l));
    }

    this.setState({links: allLinks});
  }

  render() {
    return (
      <View style={{ flex: 2, top: 100 }}>
        { this.renderModal() }
        {this.renderDialogs()}
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View><Text style={{ fontSize: 24, color: '#2970FF' }}>Your links: </Text></View>
          
        </View>
        <FlatList
          data={[this.state.gitlab, this.state.linkedin, this.state.personal]}
          renderItem={({item, index}) => this.renderLinkRow(item, index)}
          keyExtractor={i => i}
          ItemSeparatorComponent={() => ( <View style={{height: 15, backgroundColor: 'white'}}/> )}
        />
      </View>
    );
  }

  renderLinkRow = (link, index) => {
    if(index == 0) {
    return(
      <Swipeout
        right={[{text:'Delete'}]}
        
      >
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text> Github: {(link != 'git')? JSON.stringify (link) : "no links"} </Text>
          
          { this.renderAddGitlabButton() }

        </View>
      </Swipeout>
    );
    }
    if(index == 1) {
      return(
        <Swipeout
          right={[{text:'Delete'}]}
          
        >
         <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
            <Text> LinkedIn: {(link != 'lin')? JSON.stringify (link) : "no links"} </Text>
            { this.renderAddLinkedInButton() }
        </View>
        </Swipeout>
      );
      }
    if(index == 2) {
    return(
    <Swipeout
      right={[{text:'Delete'}]}
    >
   <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
      <Text> Personal: {(link != 'per')? JSON.stringify (link) : 'no links'} </Text>
      { this.renderAddPersonalButton() }
        </View>
    </Swipeout>
    );
    }
  }

  renderAddButton = () => {
    return (
      <TouchableOpacity style={{backgroundColor:'#2970FF', height:30, width: 30, borderRadius: 8, justifyContent:'center'}} onPress={() => this.setState({ modalVisible: true })}>
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={30}
        color='white'
        
      />
      </TouchableOpacity>
    );
  }

  renderAddGitlabButton = () => {
    return (
      <TouchableOpacity style={{backgroundColor:'#2970FF', height:30, width: 30, borderRadius: 8, justifyContent:'center'}} onPress={() => this.setState({ gitlabVisible: true })}>
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={27}
        color='white'
        
      />
      </TouchableOpacity>
    );
  }

  renderAddLinkedInButton = () => {
    return (
      <TouchableOpacity style={{backgroundColor:'#2970FF', height:30, width: 30, borderRadius: 8, justifyContent:'center'}} onPress={() => this.setState({ linkedInVisible: true })}>
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={27}
        color='white'
        
      />
      </TouchableOpacity>
    );
  }

  renderAddPersonalButton = () => {
    return (
      <TouchableOpacity style={{backgroundColor:'#2970FF', height:30, width: 30, borderRadius: 8, justifyContent:'center'}} onPress={() => this.setState({ personalVisible: true })}>
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={27}
        color='white'
        
      />
      </TouchableOpacity>
    );
  }

  renderDialogs = () => {
    <View style={{flex:1}}>
    <Dialog.Container visible={this.state.GitlabVisible}>
          <Dialog.Title>Gitlab</Dialog.Title>
          <Dialog.Description>Enter gitlab account:</Dialog.Description>
          <Dialog.Input onChangeText={(inputText) => this.setState({ gitlab: inputText })} />
          <Dialog.Button label="Cancel" onPress={this.handleCancelGit} bold={true} />
          <Dialog.Button label="Save" onPress={this.handleSaveGitlab} />
    </Dialog.Container>
    <Dialog.Container visible={this.state.linkedInVisible}>
    <Dialog.Title>LinkedIn</Dialog.Title>
      <Dialog.Description>Enter gitlab account:</Dialog.Description>
      <Dialog.Input onChangeText={(inputText) => this.setState({ linkedin: inputText })} />
      <Dialog.Button label="Cancel" onPress={this.handleCancelLinkedin} bold={true} />
      <Dialog.Button label="Save" onPress={this.handleSaveLinkedin} />
    </Dialog.Container>
    <Dialog.Container visible={this.state.personalVisible}>
      <Dialog.Title>Personal</Dialog.Title>
      <Dialog.Description>Enter personal website:</Dialog.Description>
      <Dialog.Input onChangeText={(inputText) => this.setState({ personal: inputText })} />
      <Dialog.Button label="Cancel" onPress={this.handleCancelPersonal} bold={true} />
      <Dialog.Button label="Save" onPress={this.handleSavePersonal} />
    </Dialog.Container>
    </View>
  }

  handleCancelGit = () => {
      this.setState({gitlabVisible : false})
  }
  handleCancelLinkedin= () => {
      this.setState({linkedInVisible : false})
  }
  handleCancelPersonal = () => {
      this.setState({personalVisible : false})
  }
  

  handleSaveGitlab = () => {
      apiRequests.addLink(global.userID, 'gitlab', this.state.gitlab)
  }

  handleSaveLinkedin = () => {
    apiRequests.addLink(global.userID, 'linkedin', this.state.linkedin)
  }

  handleSavePersonal = () => {
    apiRequests.addLink(global.userID, 'personal', this.state.personal)
  }

  renderModal = () => {
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'slide'}
        onRequestClose={this.closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text>Fuck me daddy </Text>
            <Button
              onPress={this.closeModal}
              title="Close Me"
            />
          </View>
        </View>
      </Modal>
    );
  }

  closeModal = () => {
    this.setState({modalVisible: false})
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    marginTop: '25%',
    marginBottom: '25%',
    marginLeft: '25%',
    marginRight: '25%'
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#2970ff',
    borderWidth: 3,
    borderRadius: 5
  },
});
