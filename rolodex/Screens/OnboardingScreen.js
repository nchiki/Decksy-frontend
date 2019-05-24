import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import PropTypes from 'prop-types';

import { Images, Metrics } from '../Themes'
import Onboarding from 'react-native-onboarding-swiper';

export default class OnboardingScreen extends React.Component {

  static propTypes = {
      onDone: PropTypes.func.isRequired
  };

  _onDone = () => {
    if (this.props.onDone) {
      this.props.onDone();
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Onboarding
          showSkip={false}
          onDone= {this._onDone}
          pages={[
            {
              backgroundColor: '#fff',
              image: <Image style={styles.contentImage} source={Images.phone} />,
              title: 'Navigation is fun!',
              subtitle: 'In this demo, you will get to see different navigators in action.',
            },
            {
              backgroundColor: '#fff',
              image: <Image style={styles.contentImage} source={Images.wireframeBlank} />,
              title: 'Stacks, Tabs, and Drawers',
              subtitle: 'You are about to unlock the potential of having unlimited screens.',
            },
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentImage: {
    height: Metrics.images.logo,
    width: Metrics.images.logo,
    borderRadius: 15
  }
});
