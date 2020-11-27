import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import EStyleSheet from 'react-native-extended-stylesheet';
import { SafeAreaView, StatusBar, Linking } from 'react-native';
import Toast from 'react-native-simple-toast';
import Routes from './routes';
import { containers } from './layout';
import Login from './pages/Login';
import StoreCredentials from './secrets/store';
import RetrieveCredentials from './secrets/retrieve';

EStyleSheet.build();

const link = {
  prefixes: ['offbeat://'],
};

const App = () => {
  // state to check if user is logged in or not
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  // // fetch user id, token, name, email, picture
  // handleOpenURL = (event) => {
  //   console.log("Explore -> event", event.url)
  //   // extract content from url
  //   let url = event.url;

  //   if (url == "") {
  //     Toast.show(`Something went wrong!`);
  //     return;
  //   }

  //   let user_id, token
  //   let regex = /[?&]([^=#]+)=([^&#]*)/g, match
  //   while (match = regex.exec(url)) {
  //     // getting values here
  //     console.log(match[1], match[2])
  //     if (match[1] == "refresh_token") {
  //       token = match[2]
  //     } else if (match[1] == "user_id") {
  //       user_id = match[2]
  //     }
  //   }

  //   if (user_id == "" || token == "") {
  //     Toast.show(`Something went wrong!`);
  //     return;
  //   }

  //   // store credentials and login state:{true}
  //   StoreCredentials(user_id, token);
  // }

  // useEffect(() => {

  //   // check if user logged in
  //   // RetrieveCredentials()
  //   // .then(status => {
  //   //   if (status) {
  //   //     setIsLoggedIn(true);
  //   //   }
  //   });

  //   //Linking.addEventListener('url', handleOpenURL);

  //   return () => {
  //     //Linking.removeEventListener('url', handleOpenURL);
  //   };
  // }, []);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={containers.topSafeArea} />
      <SafeAreaView style={containers.safeArea}>
        {/* <Login /> */}
        {/* {!isLoggedIn && <Login />} */}

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
