import React from 'react';
import { SectionList, StyleSheet, Text, View, Button, Alert } from 'react-native';

export default class CollectedCardsScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={getCards()}
          renderItem={({item}) => <Button style={styles.item} onPress={() => {Alert.alert(`You tapped on ${item}!`);}} title={item} />}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor={(item, index) => index}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingTop: 22
  },
  sectionHeader: {
    paddingTop: 2,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 2,
    fontSize: 14,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
    textAlign: 'left',
  },
}) 

function getCards() {
  return [
    {title: 'D', data: ['Devin']},
    {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
  ];
}
