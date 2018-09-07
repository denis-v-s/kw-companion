import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import store from './redux/store';

import AppNavigator from './AppNavigator';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <AppNavigator style={styles.container} />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Constants.statusBarHeight,
  },
});
