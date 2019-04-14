import Amplify, { Auth, Hub } from 'aws-amplify';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import autobind from 'autobind-decorator';
import { Button, Text, View } from 'react-native';
import { createDeepLinkingHandler } from 'react-native-deep-link';
import { withOAuth } from 'aws-amplify-react-native';
import { authorize } from 'react-native-app-auth';
import awsExports from '../aws-exports';

let token = null;

Amplify.configure(awsExports);
const withDeepLinking = createDeepLinkingHandler([
  {
    name: 'demo:',
    routes: [
      {
        expression: '/demo',
        callback: ({ query }) => {
          console.log('query', query);
          if (query.token) token = query.token;
        }
      }
    ]
  }
]);

@autobind
class App extends Component {
  async componentDidMount() {
    if (token) {
      console.log('token', token);
      Auth.federatedSignIn('Facebook', {
        token
      });
    }
    Hub.listen('auth', (...props) => {
      console.log('props', props);
    });
    /* const user = await Auth.currentAuthenticatedUser();
     * console.log('user', user); */
  }

  async handlePress() {
    /* Auth.federatedSignIn({ provider: 'Facebook' }); */
    /* this.props.facebookSignIn(); */
    const result = await authorize({
      clientId: '347407809315096',
      redirectUrl: 'http://localhost:3000',
      scopes: ['email'],
      serviceConfiguration: {
        authorizationEndpoint: 'https://www.facebook.com/v3.2/dialog/oauth',
        tokenEndpoint: 'https://graph.facebook.com/v3.2/oauth/access_token'
      }
    });
  }

  async handleGetSession() {
    const session = await Auth.currentSession();
    console.log('session', session);
  }

  render() {
    return (
      <View>
        <Text>React Native AWS Cognito Demo</Text>
        <Button title="Sign in with Facebook" onPress={this.handlePress} />
        <Button title="Get Session" onPress={this.handleGetSession} />
      </View>
    );
  }
}

export default withDeepLinking(withOAuth(App));
