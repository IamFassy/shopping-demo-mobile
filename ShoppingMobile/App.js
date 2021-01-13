import React, { Component } from 'react';
import { SafeAreaView, StatusBar, Text, View } from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Navigation from './source/Navigation/Navigation';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHome, faPercent, faShoppingCart, faSearch, faUser, faAlignRight, faChevronLeft, faCheck, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import Colors from './source/Utils/Colors';
import { Provider } from 'react-redux';
import { store, persistor } from './source/ReduxClasses/Store/Store';
import { PersistGate } from 'redux-persist/integration/react';

library.add(faHome, faPercent, faShoppingCart, faSearch, faUser, faAlignRight, faChevronLeft, faCheck, faChevronDown);

export class App extends Component {
  componentDidMount() {
    
    SplashScreen.hide();
  }
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={{ flex: 1 }}>
            <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
            <Navigation />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    )
  }
}

export default App
