import React from 'react';
import { AlertIOS, Platform, View, Text, Modal, TouchableOpacity, Button, StyleSheet, FlatList, Picker, TextInput } from 'react-native';
import { Icon, SocialIcon } from 'react-native-elements';
import Swipeout from 'react-native-swipeout';
import Dialog from "react-native-dialog";
import apiRequests from '../api_wrappers/BackendWrapper';
import AddLink from './AddLink';


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
        <AddLink
          visible={this.state.modalVisible}
          onClose={() => this.setState({modalVisible: false})}
          links={this.state.links}
          onAdd={this.submitAddLink}
        />
        <View style={{flex: 0, flexDirection: 'row', justifyContent: 'space-around'}}>
          <View><Text style={{ fontSize: 24, color: '#2970FF' }}>Your links: </Text></View>
          { (this.state.links.length < 3) && this.renderAddButton() }
        </View>
        <View style={{flex: 1, marginTop: 20, borderTopWidth: 1, borderColor: 'grey'}}>
          { this.state.links.map((link) => this.renderLinkRow(link)) }

        </View>
      </View>
    );
  }

  submitAddLink = (selected, value) => {
    let name = selected;
    let url = value;

    if (name == "GitHub") {
      name = "Github";
      url = `https://www.github.com/${value}`;
    }else if (name == "LinkedIn"){
      name = "Linkedin";
      url = `https://www.linkedin.com/in/${value}`;
    }

    let link = {
        user: global.userID,
        name: name,
        value: url,
        link: -1
    };

    /* Update the link id whenever it's ready */
    apiRequests.addLink(global.userID, name, url).then((resp) => {
      global.details.links.push(resp.link);
      link.link = resp.link;
    })

    this.state.links.push(link);
    this.setState({modalVisible: false});
  }

  deleteLinkPress = async (link) => {
    console.log(`deleting ${link}`);
    apiRequests.removeLink(link.link);

    let newLinks = [];
    for (let l of global.details.links) {
      if (l != link.link) {
        newLinks.push(l);
      }
    }

    global.details.links = newLinks;

    let allLinks = [];
    for (let l of this.state.links) {
      if (l.link != link.link) {
        allLinks.push(l);
      }
    }

    this.setState({links: allLinks});
  }

  editLinkPress = (link) => {
    console.log(`editing ${JSON.stringify(link)}`);

    if (Platform.OS != 'ios') {
      console.log('Siike you thought?')
      return;
    }

    AlertIOS.prompt('Update Link',
      null,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: (newVal) => this.updateLinkValue(link, newVal)
        }
      ],
      'plain-text',
      link.value
    );
  }

  updateLinkValue = async (link, value) => {
    link.value = value;

    apiRequests.editLink(link.link, link.name, link.value);

    this.forceUpdate();
  }

  renderLinkRow = (link) => {
    let name = "Portfolio";

    if (link.name == "Linkedin") {
      name = "LinkedIn";
    }else if (link.name == "Github") {
      name = "GitHub";
    }

    return (
      <Swipeout
        right={[
          {
            text:'Edit',
            backgroundColor: '#2970FF',
            onPress: () => this.editLinkPress(link)
          },
          {
            text:'Delete',
            backgroundColor: '#FF453A',
            onPress: () => this.deleteLinkPress(link)
          }
        ]}
        key={link.link}
        style={{
          backgroundColor: 'white',
          borderColor: 'grey',
          borderBottomWidth: 1
        }}
      >
        <View style={{padding: 5,flex: 0, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
          <SocialIcon
            type={(name == 'Portfolio') ? 'rss' : name.toLowerCase()}
            style={{width: 45, height: 45}}
            iconSize={30}
            light={(name == 'Portfolio') ? true : false}
          />

          <Text style={{ fontSize: 20 }}> { name } </Text>

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
        onPress={() => this.setState({modalVisible: true})}
      />
      </TouchableOpacity>
    );
  }

}
