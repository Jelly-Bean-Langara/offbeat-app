import React from 'react';
import { View, ScrollView, TextInput, Text, Pressable } from 'react-native';
import { personalStyle } from '../../layout';

// import { Container } from './styles';

const Personal = ({navigation}) => {

  const signUp = () => {
    navigation.navigate('SplashScreen');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={personalStyle.persInfoTitle}>Personal Information</Text>

        <Text style={personalStyle.formTitle}>E-mail</Text>
        <View style={personalStyle.containerForm}>
          <TextInput placeholder='johndoe@gmail.com' />
        </View>

        <Text style={personalStyle.formTitle}>First Name</Text>
        <View style={personalStyle.containerForm}>
          <TextInput placeholder='John' />
        </View>

        <Text style={personalStyle.formTitle}>Last Name</Text>
        <View style={personalStyle.containerForm}>
          <TextInput placeholder='Doe' />
        </View>

        <Text style={personalStyle.formTitle}>About Me</Text>
        <View style={personalStyle.containerFormBig}>
          <TextInput placeholder='Write a few words about you...' />
        </View>


        <View style={personalStyle.containerSigntBtn}>
          <Pressable style={[personalStyle.signBtn]}
            onPress={signUp}>
              <Text style={personalStyle.signUp}>Sign Up</Text>
          </Pressable>
        </View>

      </ScrollView>
  );
}

export default Personal;
