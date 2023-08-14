
import React from 'react';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import App from './App';
import {name as appName} from './app.json';
import configureStore from './src/redux/store';
import {LogBox} from 'react-native';

const store = configureStore();

const ReduxApp = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

AppRegistry.registerComponent(appName, () => ReduxApp);
LogBox.ignoreLogs([
  'ViewPropTypes will be removed',
  'new NativeEventEmitter',
  'ColorPropType will be removed',
]);
