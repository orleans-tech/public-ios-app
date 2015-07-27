/* @flow */

'use strict';

var _ = require('lodash');

var debug = false;
var scopes = [];

var startDebug = function() {
  debug = true;
};

var endDebug = function() {
  debug = false;
};

var setScopes = function(pScopes) {
  scopes = pScopes;
};

var isScopeEnabled = function(scope) {
  var s = _.filter(scopes, function(val) {
    return val === scope;
  });
  return !_.isEmpty(s);
};

var log = function(scope, message, ...props) {
  if (debug || isScopeEnabled(scope)) {
    console.log(scope + ' ' + message, ...props);
  }
};

var logForScope = function(scope) {
  return function(message, ...props) {
    log(scope, message, ...props);
  };
};

module.exports = {
  log: log,
  startDebug: startDebug,
  endDebug: endDebug,
  setScopes: setScopes,
  logForScope: logForScope
};
