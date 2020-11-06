import 'react-native-gesture-handler';
import React from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView, StatusBar } from 'react-native';
import Routes from './routes';
import { containers } from './layout';

EStyleSheet.build();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={containers.topSafeArea} />
      <SafeAreaView style={containers.safeArea}>
        <Routes />
      </SafeAreaView>
    </>
  );
};

export default App;

module.hot.accept(() => {
  EStyleSheet.clearCache();
  EStyleSheet.build(); // force style re-calculation
});
