import React from 'react';

import styles from '../styles/Styles';

import { Modal, Text, View, TouchableOpacity, SectionList, Button, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from 'react-native-elements';
import CardCollection from './CardCollection';

// Home screen that will show the deck of business cards
export default class HomeScreen extends React.Component {

  static navigationOptions = {
    title: 'Cards',
    headerLeft: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Filter"
      />
    ),
    headerRight: (
      <Button
        onPress={() => alert('This is a button!')}
        title="Add"
      />
    ),
  };
  
  constructor(props) {
    super(props);
    this.state = { count: 0,
      barVisible: false , addVisible: false,
    filtersChecked: new Map()} 
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const item = e.target.name;
    const isChecked = e.target.checked;
    this.setState(prevState => ({ filtersChecked: prevState.filtersChecked.set(item, isChecked) }));
  }

  setBarVisible(visible) {
    this.setState({
      barVisible: visible,
      addVisible: false
    });
  }

  setAddOptionsVisible(visible) {
    this.setState({
      barVisible: false,
      addVisible: visible
    });
  }

  closeModal() {
    this.setState({
      barVisible: false
    });
  }

  closeAddModal() {
    this.setState({
      addVisible : false
    })
  }

  onFiltersPress = () => {
    this.setBarVisible(!this.state.barVisible); 
  }

  onAddPress = () => {
    this.setAddOptionsVisible(!this.state.addVisible); 
  }

//<Filter name={item.name} checked={this.state.filtersChecked.get(item.name)} onChange={() => this.handleChange()} />
                     
  // Icons for adding and filtering
  render() {
    return (
      <View>
        <View style={{height:80, backgroundColor:'azure'}}>
          <View style={styles.container}>
            <TouchableOpacity onPress={this.onAddPress}>
              <Ionicons name={`ios-add-circle`} size={30} color={'powderblue'} /> 
            </TouchableOpacity>
          </View>
          <View style={styles.leftTop}>
            <TouchableOpacity onPress={this.onFiltersPress}>
              <Ionicons name={'ios-options'} size={30} color={'black'}/>
            </TouchableOpacity>
          </View>
        </View>
        {/*Adding a modal that would display the different filters */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.barVisible}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.checkContainer}>
              <TouchableOpacity onPress={() => this.closeModal()}>
                <Ionicons name={'ios-checkmark'}size={50} color={'white'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
              <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Select filters:</Text>
            </View>
            <View>
              <DisplayFilters />
            </View>
          </View>
        </Modal>

        <Modal
          animationType="slide"
          transparent={true}
          visible={this.state.addVisible}
          onRequestClose={() => this.closeAddModal()}
        >
          <View style={styles.modalAddContainer}>
            <View style={styles.checkContainer}>
              <TouchableOpacity onPress={() => this.closeAddModal()}>
                <Ionicons name={'ios-checkmark'}size={50} color={'white'}/>
              </TouchableOpacity>
            </View>
            <View style={styles.innerContainer}>
              <Text style={{color:'white', fontWeight: 'bold', fontSize: 18}}>Add:</Text>
            </View>
          </View>
        </Modal>

        <View>
          <CardCollection />
        </View>
      </View>
    );
  }
}

function DisplayFilters() {
  return(
    <View>
      <CheckBox
        center
        title='Software'
        checked={this.state.checked}
      />
      <CheckBox
        center
        title='Business'
        checked={this.state.checked}
      />
      <CheckBox
        center
        title='Finance'
        checked={this.state.checked}
      />
      <CheckBox
        center
        title='Hardware'
        checked={this.state.checked}
      />
    </View>
  );
}

function getCards() {
  return [
    {title: 'D', data: ['Devin']},
    {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
  ];
}

