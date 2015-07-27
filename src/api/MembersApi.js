/* @flow */

'use strict';

var http          = require('superagent');
var _             = require('lodash');
var Configuration = require('../lib/Configuration');
var log           = require('../lib/log').logForScope('api.members');

var MembersApi = {

  getList(offset): Promise {
    return new Promise((resolve, reject) => {

      var url = `${Configuration.baseUrl}/2/members?offset=${offset}&format=json&order=name&photo-host=public&group_urlname=${Configuration.groupUrl}&page=20&sign=true&key=${Configuration.apiKey}`;

      log('getList() for %s', url);

      http.get(url)
          .accept('application/json')
          .set('Content-Type', 'application/json')
          .end(function(err, res) {
              if (err) {
                  log('getList() err');
                  log(err);
                  return reject(err);
              }

              if (res.statusType === 4) {
                  log('getList() 4xx');
                  log(res.body);
                  return reject(res.body);
              }

              return resolve(res.body.results);
          });

    });
  },

};

module.exports = MembersApi;
