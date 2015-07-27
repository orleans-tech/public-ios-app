/* @flow */

'use strict';

var React           = require('react-native');
var globalStyles    = require('../lib/globalStyles');
var I18n            = require('../lib/I18n');
var log             = require('../lib/log').logForScope('component.event_past_rsvp');

var {
  StyleSheet,
  Text,
  View,
} = React;

class EventPastRsvpComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={this.props.style}>
        <View style={styles.rsvpRow}>
          <Text style={[styles.rsvpType, styles.rsvpTypeGoing]}>
            <Text style={styles.rsvpTypeCount}>{this.props.event.yes_rsvp_count} </Text>
            {I18n.t('component.event_past_rsvp.going', {count: this.props.event.yes_rsvp_count})}
          </Text>
        </View>
      </View>
    );
  }
}

EventPastRsvpComponent.propTypes = {
  event: React.PropTypes.object.isRequired,
  style: View.propTypes.style,
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
});

module.exports = EventPastRsvpComponent;
