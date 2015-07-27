/* @flow */

'use strict';

var React                 = require('react-native');
var update                = React.addons.update;
var RefreshableListView   = require('react-native-refreshable-listview');
var _                     = require('lodash');
var EventsApi             = require('../api/EventsApi');
var EventComponent        = require('../component/EventComponent');
var HeaderComponent       = require('../component/HeaderComponent');
var globalStyles          = require('../lib/globalStyles');
var I18n                  = require('../lib/I18n');
var log                   = require('../lib/log').logForScope('screen.events');

var {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

class EventsScreen extends React.Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1.id !== r2.id;
    }});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      events: [],
      isInitialLoading: true,
    };
  }

  componentDidMount(): void {
    this.loadEvents();
  }

  loadEvents(): Promise {
    return new Promise((resolve, reject) => {
      EventsApi
        .getList()
        .then((events) => {
          log('EventsApi Success', events);

          if (_.isEmpty(events)) {
              log('EventsApi no event found');

              this.setState(update(this.state, {
                dataSource: {$set: this.state.dataSource.cloneWithRows([])},
                events: {$set: []},
                isInitialLoading: {$set: false},
              }), () => {
                return resolve();
              });

            } else {
              log('EventsApi %s events found', events.length);

              this.setState(update(this.state, {
                dataSource: {$set: this.state.dataSource.cloneWithRows(events)},
                events: {$set: events},
                isInitialLoading: {$set: false},
              }), () => {
                return resolve();
              });
            }
        }, () => {
          log('EventsApi error');
          reject();
        });
    });
  }

  renderEvent(event: Object): Object {
    return <EventComponent
      key={event.id}
      event={event} />
  }

  renderEvents(): Object {
    return <RefreshableListView
      dataSource={this.state.dataSource}
      renderRow={this.renderEvent}
      loadData={this.loadEvents}
      ignoreInertialScroll={true}
      automaticallyAdjustContentInsets={false}
      refreshDescription={I18n.t('screen.events.refresh_listview')}
    />;
  }

  render(): Object {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <View style={styles.contentContainer}>
          {this.renderEvents()}
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    marginBottom: globalStyles.size.tabbarHeight,
    backgroundColor: globalStyles.colors.greyLight,
  },
});

module.exports = EventsScreen;
