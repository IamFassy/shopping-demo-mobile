import React, { Component } from 'react';
import { StatusBar, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './source/Navigation/Navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPercent, faShoppingCart, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import Colors from './source/Utils/Colors';

library.add(faHome, faPercent, faShoppingCart, faSearch, faUser);

export class App extends Component {
  componentDidMount() {
    // do stuff while splash screen is shown
    // After having done stuff (such as async tasks) hide the splash screen
    SplashScreen.hide();
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
        <Navigation />
      </View>
    )
  }
}

export default App
