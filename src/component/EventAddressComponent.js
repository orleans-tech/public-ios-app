/* @flow */

'use strict';

var React         = require('react-native');
var globalStyles  = require('../lib/globalStyles');
var log           = require('../lib/log').logForScope('component.event_address');

var {
  StyleSheet,
  Text,
  View,
} = React;

class EventAddressComponent extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={[this.props.style, styles.container]}>
        <Text style={styles.nameAddressText}>{this.props.event.venue.name}</Text>
        <Text style={styles.addressText}>{this.props.event.venue.address_1}</Text>
        <Text style={styles.addressText}>{this.props.event.venue.city}</Text>
      </View>
    );
  }
}

EventAddressComponent.propTypes = {
  event: React.PropTypes.object.isRequired,
  style: View.propTypes.style,
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'column'
  },
  nameAddressText: {
    fontFamily: globalStyles.fonts.defaultSemiBold,
  },
  addressText: {
    fontFamily: globalStyles.fonts.default,
  }
});

module.exports = EventAddressComponent;
