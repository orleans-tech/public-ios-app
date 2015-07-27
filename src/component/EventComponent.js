/* @flow */

'use strict';

var React                       = require('react-native');
var _                           = require('lodash');
var moment                      = require('moment-timezone');
var EventUpcomingRsvpComponent  = require('../component/EventUpcomingRsvpComponent');
var EventAddressComponent       = require('../component/EventAddressComponent');
var EventPastRsvpComponent      = require('../component/EventPastRsvpComponent');
var globalStyles                = require('../lib/globalStyles');
var I18n                        = require('../lib/I18n');
var log                         = require('../lib/log').logForScope('component.event');

var {
  PixelRatio,
  StyleSheet,
  Text,
  View,
} = React;

class EventComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var borderColor, rsvpDetails, nameTextStyle;

    if (this.props.event.status === 'upcoming') {
      nameTextStyle = { color: globalStyles.colors.orleansTechOrange };
      borderColor = globalStyles.colors.orleansTechOrange;
      rsvpDetails = <EventUpcomingRsvpComponent event={this.props.event} />;
    } else {
      borderColor = globalStyles.colors.grey;
      rsvpDetails = <EventPastRsvpComponent event={this.props.event} />;;
    }

    var date = moment(this.props.event.time)
      .tz('Europe/Paris')
      .format(I18n.t('component.event.date_format'));

    return (
      <View style={[styles.container, {borderColor: borderColor}]}>
        <Text style={[styles.nameText, nameTextStyle]}>
          {this.props.event.name}
        </Text>
        <View style={styles.detailsContainer}>
          <View style={styles.detailsRow}>
              <View>
                <Text style={styles.labelText}>
                  {I18n.t('component.event.details_row_label.date')}
                </Text>
              </View>
              <View style={styles.valueDetails}>
                <Text style={styles.dateText}>{date}</Text>
              </View>
              <View style={styles.labelRsvpContainer}>
                <Text style={styles.labelText}>
                  {I18n.t('component.event.details_row_label.participants')}
                </Text>
              </View>
              {rsvpDetails}
          </View>
          <View style={styles.detailsRow}>
              <View>
                <Text style={styles.labelText}>
                  {I18n.t('component.event.details_row_label.address')}
                </Text>
              </View>
              <EventAddressComponent
                style={styles.valueDetails}
                event={this.props.event} />
          </View>
        </View>
      </View>
    );
  }
}

EventComponent.propTypes = {
  event: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    backgroundColor: 'white'
  },
  detailsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  detailsRow: {
    flex: 1,
  },
  labelText: {
    fontSize: 10,
    color: globalStyles.colors.greyHard,
  },
  labelRsvpContainer: {
    marginTop: 7,
  },
  valueDetails: {
    flex: 1,
    flexWrap: 'wrap'
  },
  nameText: {
    fontFamily: globalStyles.fonts.default,
    color: globalStyles.colors.dark,
    fontSize: 16,
  },
  dateText: {
    fontFamily: globalStyles.fonts.default,
    color: globalStyles.colors.greyExtraHard,
  }
});

module.exports = EventComponent;
