import deckStyles from '../styles/DeckStyles';
import templateStyles from '../styles/TemplateStyles';

const templateUtils = {
  setImage: function (cardType) {
    const images = [require("../assets/images/template2.png"), require("../assets/images/template3.png"),
    require("../assets/images/template4.png"), require("../assets/images/template5.png"),
    require("../assets/images/template6.png"), require("../assets/images/template7.png"),
    require("../assets/images/template8.png"), require("../assets/images/template9.png"),
    require("../assets/images/template10.png")]
    return images[cardType - 2];
  },

  setStyle: function (cardType) {
    const styles = [deckStyles.getStyle2(), deckStyles.getStyle3(), deckStyles.getStyle4(), deckStyles.getStyle5(),
    deckStyles.getStyle6(), deckStyles.getStyle7(), deckStyles.getStyle8(), deckStyles.getStyle9(),
    deckStyles.getStyle10()];
    console.log("cardType:");
    console.log(cardType);
    return styles[cardType - 2];
  },

  setProfileStyle: function (cardType) {
    const styles = [templateStyles.getStyle2(), templateStyles.getStyle3(), templateStyles.getStyle4(), templateStyles.getStyle5(),
    templateStyles.getStyle6(), templateStyles.getStyle7(), templateStyles.getStyle8(), templateStyles.getStyle9(),
    templateStyles.getStyle10()];
    return styles[cardType - 2];
  }
}

export default templateUtils;
