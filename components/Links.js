import React from 'react';
import { Platform, View, Text, Modal, Button, StyleSheet, FlatList } from 'react-native';
import { Icon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import apiRequests from '../api_wrappers/BackendWrapper';

export default class Links extends React.Component {

  constructor() {
    super()
  }

  state = {
    links: [],
    modalVisible: true
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
      <View style={{ flex: 2, alignItems: 'center', marginTop: 40 }}>
        { this.renderModal() }
        <View style={{flex: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={{ fontSize: 24 }}>Your links</Text>
          { (this.state.links.length < 3) && this.renderAddButton() }
        </View>
        <FlatList
          data={this.state.links}
          renderItem={this.renderLinkRow}
        />
      </View>
    );
  }

  renderLinkRow = (link) => {

    return(
      <Swipeout
        right={[{text:'Delete'}]}
      >
        <View>
          <Text> {JSON.stringify (link)} </Text>
        </View>
      </Swipeout>
    );
  }

  renderAddButton = () => {
    return (
      <Icon
        containerStyle={{ paddingRight: 12 }}
        type="ionicon"
        name={Platform.OS === "ios" ? "ios-add" : "md-add"}
        size={39}
        color='dodgerblue'
        onPress={() => this.setState({ modalVisible: true })}
      />
    );
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
