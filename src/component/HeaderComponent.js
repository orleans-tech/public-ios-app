/* @flow */

'use strict';

var React                         = require('react-native');
var _                             = require('lodash');
var update                        = React.addons.update;
var NavigatorNavigationBarStyles  = require('NavigatorNavigationBarStyles');
var log                           = require('../lib/log').logForScope('component.header');

var {
  Image,
  PixelRatio,
  StyleSheet,
  Text,
  View,
} = React;

class HeaderComponent extends React.Component {

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.orleansTechLogoContainer}>
          <Image
            source={require('image!OrleansTech')}
            style={styles.orleansTechLogo} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: NavigatorNavigationBarStyles.General.TotalNavHeight,
    borderBottomColor: 'rgba(0, 0, 0, 0.5)',
    borderBottomWidth: 1 / PixelRatio.get(),
  },
  orleansTechLogoContainer: {
    flex: 1,
    marginTop: 17,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  orleansTechLogo: {
    height: 25,
    width: 225,
  }
});

module.exports = HeaderComponent;
