import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import FacebookSignInInButton from './components/FacebookSignInButton';

class Home extends Component {
  static propTypes = {
    user: PropTypes.object.isRequired
  };

  render() {
    return (
      <View>
        <Text>React Native AWS Cognito Demo</Text>
        <FacebookSignInInButton />
        <Text>Username: {this.props.user.username}</Text>
      </View>
    );
  }
}

export default connect(state => ({
  user: state.user
}))(Home);
