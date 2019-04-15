import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Button } from 'react-native';
import { withOAuth } from 'aws-amplify-react-native';

class FacebookSignInButton extends Component {
  static propTypes = {
    children: PropTypes.string
  };

  static defaultProps = {
    children: 'Sign in with Facebook'
  };

  render() {
    return (
      <Button title={this.props.children} onPress={this.props.facebookSignIn} />
    );
  }
}

export default withOAuth(FacebookSignInButton);
