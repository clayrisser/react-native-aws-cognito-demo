import Amplify, { Auth, Hub } from 'aws-amplify';
import { Linking } from 'react-native';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createDeepLinkingHandler } from 'react-native-deep-link';
import Home from './Home';
import awsExports from '../aws-exports';
import createStore from './createStore';
import { loadUser } from './actions/user';

const store = createStore();
Amplify.configure(awsExports);

const withDeepLinking = createDeepLinkingHandler([
  {
    name: 'demo:',
    routes: [
      {
        expression: '/demo/',
        callback: async () => {
          const res = Hub.listen('auth', ({ payload: { event, data } }) => {
            switch (event) {
              case 'signIn':
                store.dispatch(loadUser(data));
                break;
            }
          });
          const handle = await Auth._handleAuthResponse(
            await Linking.getInitialURL()
          );
        }
      }
    ]
  }
]);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Home />
      </Provider>
    );
  }
}

export default withDeepLinking(App);
