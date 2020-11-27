import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ImageBackground,
  Pressable,
  AppState,
} from 'react-native';
import {
  CallToCardBg,
  TestPicture,
  TextureBackground,
} from '../../assets/static';
import { profileStyle, buttons } from '../../layout';
import Login from '../Login';
import CheckIfLoggedIn from '../../secrets/status';
import UserDetails from '../../secrets/userDetails';

// import { Container } from './styles';

const Profile = () => {
  const [user, setUser] = useState({});

  // state to check if user is logged in or not
  const [isLoggedIn, setIsLoggedIn] = useState();
  const appState = useRef(AppState.currentState);

  // hide the login component
  const handleClose = (value) => {
    console.log('handleClose -> value', value);
    // setIsClicked(false);
  };

  useEffect(() => {
    async function data() {
      const p = await UserDetails();
      setUser(p);
    }
    data();
  }, [user.user_name, user.user_picture]);

  useEffect(() => {
    CheckIfLoggedIn().then((status) => {
      if (status) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
    AppState.addEventListener('change', _handleAppStateChange);
    return () => {
      AppState.removeEventListener('change', _handleAppStateChange);
    };
  }, [isLoggedIn]);

  // when user go in foreground check if user has logged in/out
  const _handleAppStateChange = (nextAppState) => {
    CheckIfLoggedIn().then((status) => {
      if (status) setIsLoggedIn(true);
      else setIsLoggedIn(false);
    });
    async function data() {
      const p = await UserDetails();
      setUser(p);
    }
    data();
    appState.current = nextAppState;
  };

  return (
    <>
      {/* show login component is user is not logged in */}
      {!isLoggedIn && (
        <Login handleClose={handleClose} cancelBtnVisibility={false} />
      )}

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground source={TestPicture} style={profileStyle.image}>
          <View style={{ alignSelf: 'center' }}>
            <View style={profileStyle.profileImage}>
              <Image
                source={{ uri: user.user_picture }}
                style={profileStyle.image}
                resizeMode="cover"
              />
            </View>
          </View>
        </ImageBackground>

        <View style={profileStyle.containerUserSum}>
          {console.log(user.user_name)}
          <Text style={profileStyle.userName}>{user.user_name}</Text>
          <Text style={profileStyle.userDescription}>
            Write a bit about yourself
          </Text>

          <Pressable
            style={[profileStyle.profileBtn]}
            onPress={() => goToCategoryPage(category.category_id)}
          >
            <Text style={profileStyle.journalsBtn}>Journals</Text>
          </Pressable>

          <Text style={profileStyle.summaryProfile}>Your OffBeat Summary</Text>

          <View style={profileStyle.bkgSummary}>
            <View style={profileStyle.containerContries}>
              <Image
                source={CallToCardBg}
                style={profileStyle.countriesImage}
              />
              <Text style={profileStyle.titleCountries}>Countries visited</Text>
              <Text style={profileStyle.numberCountries}>4</Text>
            </View>

            <View style={profileStyle.containerMoments}>
              <Image source={TestPicture} style={profileStyle.momentsImage} />
              <Text style={profileStyle.titleMoments}>Moments Added</Text>
              <Text style={profileStyle.numberMoments}>33</Text>
            </View>

            <View style={profileStyle.containerTrips}>
              <Image source={CallToCardBg} style={profileStyle.tripsImage} />
              <Text style={profileStyle.titleTrips}>Typical kind of trips</Text>
              <Text style={profileStyle.numberTrips}>2</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default Profile;
