/* @flow */

'use strict';

var React                 = require('react-native');
var update                = React.addons.update;
var RefreshableListView   = require('react-native-refreshable-listview');
var _                     = require('lodash');
var MembersApi            = require('../api/MembersApi');
var HeaderComponent       = require('../component/HeaderComponent');
var MemberComponent       = require('../component/MemberComponent');
var globalStyles          = require('../lib/globalStyles');
var I18n                  = require('../lib/I18n');
var log                   = require('../lib/log').logForScope('screen.members');

var {
  ListView,
  StyleSheet,
  Text,
  View,
} = React;

class MembersScreen extends React.Component {

  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => {
      return r1.id !== r2.id;
    }});

    this.state = {
      dataSource: ds.cloneWithRows([]),
      members: [],
      isInitialLoading: true,
      isLoading: false,
      offset: 0,
    };
  }

  componentDidMount(): void {
    log('componentDidMount() start ');
    this.loadMembers(this.state.offset);
  }

  loadMembers(offset): Promise {
    log('MembersApi() start ' + offset);
    return new Promise((resolve, reject) => {
        this.setState(update(this.state, {
          isLoading: {$set: true},
        }), () => {
          resolve();
        });
      })
      .then(() => {
        return new Promise((resolve, reject) => {
          MembersApi
            .getList(offset)
            .then((members) => {
              log('MembersApi Success', members);
              log('MembersApi %s members found', members.length);

              let nextState;
              if (offset === 0) {
                nextState = update(this.state, {
                  members: {$set: members}
                });
              } else {
                nextState = update(this.state, {
                  members: {$push: members}
                });
              }

              this.setState(update(nextState, {
                dataSource: {$set: this.state.dataSource.cloneWithRows(nextState.members)},
                isInitialLoading: {$set: false},
                isLoading: {$set: false},
                offset: {$set: offset},
              }), () => {
                return resolve();
              });

            }, () => {
              log('MembersApi error');
              reject();
            });
        });
      });
  }

  pullToRefresh(): Promise {
    log('pullToRefresh() start ');
    return this.loadMembers(0);
  }

  renderMember(member: Object): Object {
    return <MemberComponent
        key={member.id}
        member={member} />;
  }

  onEndReached(): void {
    log('', this.state);
    if (this.state.isLoading || this.state.isInitialLoading) {
      return;
    }
    this.loadMembers(this.state.offset + 1);
  }

  renderMembers(): Object {
    return <RefreshableListView
      dataSource={this.state.dataSource}
      renderRow={this.renderMember}
      loadData={this.pullToRefresh.bind(this)}
      ignoreInertialScroll={true}
      automaticallyAdjustContentInsets={false}
      onEndReached={this.onEndReached.bind(this)}
      refreshDescription={I18n.t('screen.members.refresh_listview')}
    />;
  }

  render(): Object {
    return (
      <View style={styles.container}>
        <HeaderComponent />
        <View style={styles.contentContainer}>
          {this.renderMembers()}
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
  }
});

module.exports = MembersScreen;
