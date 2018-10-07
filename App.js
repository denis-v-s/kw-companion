import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import store from './redux/store';

import AppNavigator from './AppNavigator';
import Expo from 'expo'

export default class App extends React.Component {

  state = {
    loading: true
  }

  async componentWillMount() {
    this.setState({ loading: false });
  }

  render() {
    if (this.state.loading === true) {
      return <Expo.AppLoading />
    }
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
