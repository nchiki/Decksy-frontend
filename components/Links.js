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
    links: [],
    modalVisible: false,
    github: false,
    linkedin: false,
    portfolio: false
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
      <View style={{ flex: 2, top: 80 }}>
        { this.renderModal() }
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View><Text style={{ fontSize: 24, color: '#2970FF' }}>Your links: </Text></View>
          { (this.state.links.length < 3) && this.renderAddButton() }
        </View>
        <FlatList
          data={this.state.links}
          renderItem={this.renderLinkRow}
          keyExtractor={i => i}
          ItemSeparatorComponent={() => ( <View style={{height: 15, backgroundColor: 'white'}}/> )}
        />
      </View>
    );
  }

  renderLinkRow = (link) => {
    return (
      <Swipeout
        right={[{text:'Delete'}]}
      >
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
          <Text> { JSON.stringify (link) } </Text>

        </View>
      </Swipeout>
    );
  }

  renderAddButton = () => {
    return (
      <TouchableOpacity style={{backgroundColor:'#2970FF', height:30, width: 30, borderRadius: 8, justifyContent:'center'}} onPress={() => this.setState({ modalVisible: true })}>
      <Icon
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={30}
        color='white'
        onPress={this.addLink}
      />
      </TouchableOpacity>
    );
  }

  addLink = () => {
    this.setState({modalVisible: true});
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
            <Text>Add a Link</Text>
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
