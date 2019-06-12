import deckStyles from '../styles/DeckStyles';
import templateStyles from '../styles/TemplateStyles';
import { StyleSheet } from 'react-native';

const images = [
  require("../assets/images/templates/template2.png"),
  require("../assets/images/templates/template3.png"),
  require("../assets/images/templates/template4.png"),
  require("../assets/images/templates/template5.png"),
  require("../assets/images/templates/template6.png"),
  require("../assets/images/templates/template7.png"),
  require("../assets/images/templates/template8.png"),
  require("../assets/images/templates/template9.png"),
  require("../assets/images/templates/template10.png")
];


const templateUtils = {
  setImage: function (cardType) {
    return images[cardType - 2];
  },

  setStyle: function (cardType) {
    return StyleSheet.create(deckStyles[cardType - 2]);
  },

  setProfileStyle: function (cardType) {
    return StyleSheet.create(templateStyles[cardType - 2]);
  }
}

export default templateUtils;
