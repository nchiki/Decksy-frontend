import deckStyles from '../styles/DeckStyles';
import templateStyles from '../styles/TemplateStyles';
import { StyleSheet } from 'react-native';

const images = [
  require("../assets/images/template2.png"),
  require("../assets/images/template3.png"),
  require("../assets/images/template4.png"),
  require("../assets/images/template5.png"),
  require("../assets/images/template6.png"),
  require("../assets/images/template7.png"),
  require("../assets/images/template8.png"),
  require("../assets/images/template9.png"),
  require("../assets/images/template10.png")
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
