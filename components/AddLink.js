import React from 'react';
import { View, Text, TouchableOpacity, Modal, Button, StyleSheet, FlatList, TextInput } from 'react-native';
import { SocialIcon } from 'react-native-elements';


export default class AddLink extends React.Component {

  state = {
    github: false,
    linkedin: false,
    portfolio: false,
    selected: 'default'
  }

  constructor() {
    super();
  }

  componentDidMount() {
  }

  render() {

    if (!this.props.visible) {
      return null;
    }

    this.setAvailableLinks();

    let availableLinks = [];
    if (!this.state.github) {
      availableLinks.push('GitHub');
    }
    if (!this.state.linkedin) {
      availableLinks.push('LinkedIn');
    }
    if (!this.state.portfolio) {
      availableLinks.push('Portfolio');
    }
    return (
      <Modal
        visible={this.state.modalVisible}
        animationType={'fade'}
        onRequestClose={this.closeModal}
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={{paddingBottom: 20, paddingTop: 20, fontSize: 30}}>Add a Link</Text>

              <FlatList
                data={availableLinks}
                renderItem={this.renderAddLinkRow.bind(this)}
                ItemSeparatorComponent={() => ( <View style={{height: 10, backgroundColor: 'white'}}/> )}
                keyExtractor={i => i}
              />

            <TextInput
              style={{padding:30, fontSize: 25}}
              placeholder={(this.state.selected == 'Portfolio') ? 'URL' : 'Username'}
              onChangeText={(inp) => this.setState({curValue: inp})}
              autoCompleteType='off'
              autoCorrect={false}
            />
            <View style={{ flexDirection: 'row', justifyContent: 'space-around'}}>
              <TouchableOpacity
                style={styles.bigBlueButton}
                onPress={this.props.onClose}
              >
                <Text style={{ fontSize: 20, color: 'white' }}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.bigBlueButton}
                onPress={() => this.props.onAdd(this.state.selected, this.state.curValue)}
              >
                <Text style={{ fontSize: 20, color: 'white' }}>Add Link</Text>
              </TouchableOpacity>

            </View>
          </View>
        </View>
      </Modal>
    );
  }

  renderAddLinkRow = (link) => {
    let bg = 'white';

    if (this.state.selected == link.item) {
      bg = 'lightgrey'
    }

    return (
      <TouchableOpacity onPress={() => this.setState({selected: link.item})}>
        <View style={{backgroundColor: bg, padding: 10, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <SocialIcon
            type={(link.item == 'Portfolio') ? 'rss' : link.item.toLowerCase()}
            iconSize={20}
            style={{width: 30, height: 30}}
            light={(link.item == 'Portfolio') ? true : false}
          />
          <Text style={{ fontSize: 20}}>{ link.item } </Text>
        </View>
      </TouchableOpacity>
    );
  }

  /* We're not using set state because we don't want to cause a render op */
  setAvailableLinks = () => {
    for (let link of this.props.links) {
      switch (link.name){
        case 'Github':
          this.state.github = true;
          break;
        case 'Linkedin':
          this.state.linkedin = true;
          break;
        default:
          this.state.portfolio = true;
      }
    }
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
    paddingLeft: 20,
    paddingRight: 20
  },
  innerContainer: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#2970ff',
    borderWidth: 3,
    borderRadius: 5,
  },
  bigBlueButton: {
    margin: 10,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#2970FF',
    alignItems: 'center',
    justifyContent: 'center'
  }
});
