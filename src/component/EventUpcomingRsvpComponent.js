/* @flow */

'use strict';

var React           = require('react-native');
var _               = require('lodash');
var update          = React.addons.update;
var moment          = require('moment-timezone');
var globalStyles    = require('../lib/globalStyles');
var I18n            = require('../lib/I18n');
var log             = require('../lib/log').logForScope('component.event_upcoming_rsvp');

var {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} = React;

class EventUpcomingRsvpComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <View style={styles.rsvpRow}>
          <Text style={[styles.rsvpType, styles.rsvpTypeGoing]}>
            {I18n.t('component.event_upcoming_rsvp.going')}
          </Text>
          <Text style={styles.rsvpTypeCount}>
            {this.props.event.yes_rsvp_count}
          </Text>
        </View>
        <View style={styles.rsvpRow}>
          <Text style={[styles.rsvpType, styles.rsvpTypeWaitingList]}>
            {I18n.t('component.event_upcoming_rsvp.waiting_list')}
          </Text>
          <Text style={styles.rsvpTypeCount}>
            {this.props.event.waitlist_count}
          </Text>
        </View>
        <View style={styles.rsvpRow}>
          <Text style={[styles.rsvpType, styles.rsvpTypeLimit]}>
            {I18n.t('component.event_upcoming_rsvp.available')}
          </Text>
          <Text style={styles.rsvpTypeCount}>
            {this.props.event.rsvp_limit - this.props.event.yes_rsvp_count}
          </Text>
        </View>
      </View>
    );
  }
}

EventUpcomingRsvpComponent.propTypes = {
  event: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  rsvpRow: {
    flexDirection: 'row',
  },
  rsvpType: {
    width: 110,
    fontSize: 10,
  },
  rsvpTypeCount: {
    fontSize: 10,
  },
  rsvpTypeGoing: {
    color: globalStyles.colors.green,
  },
  rsvpTypeLimit: {
    color: globalStyles.colors.greyExtraHard,
  },
  rsvpTypeWaitingList: {
    color: globalStyles.colors.orange,
  }
});

module.exports = EventUpcomingRsvpComponent;
