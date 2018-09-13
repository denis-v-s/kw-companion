import React from 'react';
import { StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Provider } from 'react-redux';
import store from './redux/store';

import AppNavigator from './AppNavigator';

import { StyleProvider } from 'native-base';
import getTheme from './native-base-theme/components';
import nodTheme from './native-base-theme/variables/nodTheme';

import Expo from 'expo'

export default class App extends React.Component {

  state = {
    loading: true
  }

  async componentWillMount() {
    await Expo.Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
    });
    this.setState({ loading: false });
  }
  
  render() {
    if (this.state.loading === true) {
      return <Expo.AppLoading />
    }
    return (
      <Provider store={store}>
        <StyleProvider style={getTheme(nodTheme)}>
          <AppNavigator style={styles.container} />
        </StyleProvider>
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
