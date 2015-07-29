/* @flow */

'use strict';

var NavigationScreen  = require('./src/screen/NavigationScreen');
var React             = require('react-native');
var l                 = require('./src/lib/log');

var {
  AppRegistry,
} = React;

l.setScopes(['api.members', 'screen.members']);
AppRegistry.registerComponent('orleanstech', () => NavigationScreen);
