import React, { useState } from 'react';
import { View, Pressable, Text, Linking, Image } from 'react-native';
import Toast from 'react-native-simple-toast';
import api from '../../services/authApi';
import { Cancel } from '../../assets/static';

export default function Login({ handleClose, cancelBtnVisibility }) {
  // retrieve auth grant code
  function handleAuthURL(authURL) {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = Linking.canOpenURL(authURL);
    if (supported) {
      // auth url is in "http" scheme, this will enforce app to link be opened
      // by some browser in the mobile.
      Linking.openURL(authURL);
    } else {
      Toast.show(`Don't know how to open this URL: ${authURL}`);
    }
  }

  return (
    <View
      style={{
        backgroundColor: 'white',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10000000,
      }}
    >
      {/* pass  cancelBtnVisibility:true, if wants to show cancel button */}
      {cancelBtnVisibility && (
        <Pressable
          onPress={() => {
            // return false value to parent, acknowledging to hide the login component.
            handleClose(false);
          }}
        >
          <Image style={{ width: 18, height: 18 }} source={Cancel} />
        </Pressable>
      )}

      <Pressable
        onPress={() => {
          api
            .post('/auth')
            .then((res) => {
              handleAuthURL(res.data.url);
            })
            .catch((error) => {
              Toast.show('unable to connect to auth server!');
            });
        }}
      >
        <Text>continue with google</Text>
      </Pressable>
    </View>
  );
}
