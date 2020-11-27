import React, { useState, useEffect } from 'react';
import { Image, Pressable, Linking } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import CheckIfLoggedIn from '../../secrets/status';
import StoreCredentials from '../../secrets/store';
import ExtractInfo from '../../secrets/extract';

// Style
import { navigatorStyle, buttons } from '../../layout';

// Routes
import Home from './Home';
import Post from './Post';
import Category from './Category';

// page
import Login from '../Login';

// Assets
import { PlusButton } from '../../assets/static';

const Stack = createStackNavigator();

const MainRoutes = ({ navigation }) => {
  // state to check if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [isClicked, setIsClicked] = useState(false);

  // fetch user id, token, name, email, picture
  const handleOpenURL = (event) => {
    // extract content from url
    const data = ExtractInfo(event.url);
    if (!data) {
      return;
    }

    // store credentials and login state:{true}
    StoreCredentials(
      data.user_id,
      data.token,
      data.name,
      data.email,
      data.picture
    );
    setIsLoggedIn(true);
  };

  useEffect(() => {
    CheckIfLoggedIn().then((status) => {
      if (status) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
    Linking.addEventListener('url', handleOpenURL);
    return () => {
      Linking.removeEventListener('url', handleOpenURL);
    };
  }, [isLoggedIn]);

  // hide the login component
  const handleClose = (value) => {
    console.log('handleClose -> value', value);
    setIsClicked(false);
  };

  return (
    <>
      {/* Login component */}
      {/* will pop up if user is not logged in */}
      {isClicked && !isLoggedIn && (
        <Login handleClose={handleClose} cancelBtnVisibility />
      )}

      {/* main content */}
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            title: false,
            headerStyle: navigatorStyle.pageHeader,
            headerRight: () => (
              <Pressable
                onPress={() => {
                  CheckIfLoggedIn().then((status) => {
                    if (status) navigation.navigate('SelectCategory');
                    else {
                      setIsClicked(true);
                    }
                  });
                }}
              >
                <Image
                  source={PlusButton}
                  style={[buttons.small, buttons.plus]}
                />
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="Post"
          component={Post}
          options={{
            title: false,
            headerStyle: navigatorStyle.pageHeader,
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            title: false,
            headerStyle: navigatorStyle.pageHeader,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default MainRoutes;
