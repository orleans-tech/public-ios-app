/* @flow */

'use strict';

var React           = require('react-native');
var _               = require('lodash');
var update          = React.addons.update;
var EventsScreen    = require('./EventsScreen');
var MembersScreen   = require('./MembersScreen');
var I18n            = require('../lib/I18n');
var globalStyles    = require('../lib/globalStyles');
var log             = require('../lib/log').logForScope('screen.navigation');

var {
  TabBarIOS,
  Text,
  View,
} = React;

class NavigationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 'events',
    };
  }

  render() {
    return (
      <View style={{ flex:1 }}>
        <TabBarIOS
          tintColor={'white'}
          barTintColor={globalStyles.colors.greyBar}>
          <TabBarIOS.Item
            title={I18n.t('screen.navigation.events_bar_name')}
            selected={this.state.selectedTab === 'events'}
            icon={require('image!TabbarEvents')}
            onPress={() => {
              this.setState(update(this.state, {
                selectedTab: {$set: 'events'},
              }));
            }}>
            <EventsScreen />
          </TabBarIOS.Item>
          <TabBarIOS.Item
            title={I18n.t('screen.navigation.members_bar_name')}
            selected={this.state.selectedTab === 'members'}
            icon={require('image!TabbarMembers')}
            onPress={() => {
              this.setState(update(this.state, {
                selectedTab: {$set: 'members'},
              }));
            }}>
            <MembersScreen />
          </TabBarIOS.Item>
        </TabBarIOS>
      </View>
    );
  }

}

module.exports = NavigationScreen;
