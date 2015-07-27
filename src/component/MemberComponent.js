/* @flow */

'use strict';

var React           = require('react-native');
var _               = require('lodash');
var globalStyles    = require('../lib/globalStyles');
var log             = require('../lib/log').logForScope('component.member');

var {
  PixelRatio,
  Image,
  StyleSheet,
  Text,
  View,
} = React;

class MemberComponent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderProfilePicture(): ?Object {
    if (_.isEmpty(this.props.member.photo)) {
      return null;
    }

    return <View style={styles.profilePictureContainer}>
        <Image
          source={{uri: this.props.member.photo.thumb_link}}
          style={styles.profilePicture} />
      </View>;
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderProfilePicture()}
        <Text style={styles.name}>
          {this.props.member.name}
        </Text>
      </View>
    );
  }
}

MemberComponent.propTypes = {
  member: React.PropTypes.object.isRequired
};

var styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    marginBottom: 5,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 10,
    borderWidth: 1 / PixelRatio.get(),
    borderRadius: 5,
    borderColor: globalStyles.colors.greyHard,
    backgroundColor: 'white'
  },
  profilePictureContainer: {
    width: 30,
    marginRight: 10,
  },
  profilePicture: {
    width: 30,
    height: 30,
  },
  name: {
    flex: 1,
    flexWrap: 'wrap',
    alignSelf: 'center',
    justifyContent: 'center',
    fontFamily: globalStyles.fonts.default,
  }
});

module.exports = MemberComponent;
