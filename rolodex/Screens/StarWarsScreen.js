import React from 'react';
import { StyleSheet, Text, SafeAreaView, View, Image, Button, ActivityIndicator, Alert } from 'react-native';

import { FontAwesome } from '@expo/vector-icons'
import { Images, Metrics, Colors } from '../Themes'
import StarWarsCard from '../Components/StarWarsCard'

export default class StarWarsScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {

       const drawerOptions = {
          drawerLabel: 'Star Wars',
          drawerIcon: ({ tintColor }) => (
            <FontAwesome
              name='fighter-jet'
              color={tintColor}
              size={Metrics.icons.small}
            />
          ),
        }

       return drawerOptions;
    };

    state = { //default state
      jedi: {
        name: 'Unknown',
        gender: 'Unknown',
        birthYear: 'N/A',
        height: 'N/A',
        weight: 'N/A',
        hairColor: 'N/A',
        eyeColor: 'N/A',
        skinColor: 'N/A',
      },
      buttonText: 'Show me your ID Card!',
      loading: false,
    }

    showCard = () => {
      this.getJedi();
    }

    //async/await - ES6
    async getJedi() {
      try {

        this.setState({loading: true});

        let randomNumber = Math.floor(Math.random() * 88) + 1;
        let response = await fetch(`https://swapi.co/api/people/${randomNumber}`);
        let responseJson = await response.json();

        //console.log(responseJson);

        //cleaning up our response...
        let cleanObject = responseJson;
        cleanObject.hairColor = responseJson.hair_color;
        cleanObject.skinColor = responseJson.skin_color;
        cleanObject.eyeColor = responseJson.eye_color;
        cleanObject.birthYear = responseJson.birth_year;
        cleanObject.weight = responseJson.mass;

        this.setState({loading: false, jedi: cleanObject})

      } catch (error) {
        console.error(error);
      }
    }

    render() {

      //conditional rendering
      if(this.state.loading) {
        return (
          <View style={styles.container}>
            <ActivityIndicator />
          </View>
        );
      }

      return (
        <View style={styles.container}>

           <StarWarsCard jedi={this.state.jedi} />

           <Button
              title={this.state.buttonText}
              onPress={this.showCard}/>

        </View>
      );

    }

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.snow,
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }
  });
