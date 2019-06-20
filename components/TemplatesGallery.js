import React from 'react';
import { Text, View, StyleSheet,Platform, TouchableOpacity, ImageBackground} from 'react-native';
import { Icon } from 'react-native-elements';
import Grid from 'react-native-grid-component';
import apiRequests from '../api_wrappers/BackendWrapper';
import templateUtils from './Templates';
import BusinessCard from './BusinessCard';
import Ionicons from '@expo/vector-icons/Ionicons';

const u = {
  firstName: 'FIRST',
  lastName: 'LAST',
  company: 'COMPANY',
  email: 'NAME@EMAIL.COM',
  links: 'website.com',
  phoneNumber: 99999999,
}

export default class TemplatesGallery extends React.Component {
  state = {
    userID: 1,
    cardType: 2,
    details: u,
    image: require("../assets/images/templates/template2.png"),
    templateStyle: templateUtils.setProfileStyle(2),
    selected: null
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      title: 'Templates',
      headerTitleStyle: {
        fontSize: 25
      },
      headerRight: (
            <Icon
              containerStyle={{ paddingRight: 12 }}
              type="ionicon"
              name={Platform.OS === "ios" ? "ios-checkmark" : "md-checkmark"}
              size={41}
              color='dodgerblue'
              onPress={params.save}
            />

      )
  };
}

  componentDidMount() {
    const details = this.props.navigation.getParam('details', 'NULL');
    this.setState({details: details});
    const { navigation } = this.props;
    navigation.setParams({
        save:  () => this.save(navigation)
    })
  }

  renderPlaceholder = () => {
    <View style={{flex:1}}>
        <View style={styles.containerStyle}>
        </View>
    </View>
  }

  _renderItem = (item) => {
    const image = templateUtils.setImage(item);
    const templateStyle = templateUtils.setStyle(item);
    const det = global.details;
    let backgroundColor = 'white';
    if(this.state.selected && this.state.selected == item) {
      backgroundColor = 'red';
    }
    return (
      <View style={{flex:1, margin:1, backgroundColor:backgroundColor}}>
    <TouchableOpacity style={styles.card} onPress={() =>
      this.setState({selected: item})}>
            <ImageBackground source={image} style={[styles.containerStyle, {borderWidth:1,borderColor:backgroundColor}]}>
              <View style={styles.containerStyle}>
                <View style={templateStyle.titleText}>
                  <Text style={templateStyle.userText} >{`${det.firstName} ${det.lastName}`} </Text>
                </View>
                <View style={templateStyle.user}>
                  <Text style={templateStyle.company}>{det.company}</Text>
                  <Text style={templateStyle.details}><Ionicons name='ios-call' size={10} /> {det.phoneNumber}{'\n'}
                        <Ionicons name='ios-mail' size={10} /> {det.email}</Text>
                </View>
              </View>
            </ImageBackground>
    </TouchableOpacity>
    </View>
    )
  }

  save = async () => {
    /* If there's no template selected then ignore it */
    if (!this.state.selected) {
      this.props.navigation.goBack();
      return;
    }

    console.log('fromLogin (gallery) is: ' + global.fromLogin)
    apiRequests.setCard(global.userID, this.state.selected);
    global.details.card = this.state.selected;
    let details = global.details;
    this.setState({ saved: true, details: details });

    let cb = this.props.navigation.getParam('cb', null);

    if (cb) {
      setTimeout(cb, 20);
    }

    this.props.navigation.goBack();
  }

  setTemplate = () => {
    const image = templateUtils.setImage(this.state.cardType);
    const templateStyle = templateUtils.setProfileStyle(this.state.cardType);
    this.setState({ image: image, templateStyle: templateStyle })
  }


  render() {
    return (
         <Grid style={styles.list} renderItem={this._renderItem}
         data={[2,3,4,5,6,7,8,9,10]}
         renderPlaceholder = {this.renderPlaceholder}
         keyExtractor={item => item}
         numColumns={2}/>

    );

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
