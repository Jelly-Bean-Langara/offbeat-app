import React, { useState } from 'react';
import { Image, Pressable, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { TextureBackground } from '../../../assets/static';
import RetrieveCredentials from '../../../secrets/retrieve';

// Styles
import {
  buttons,
  containers,
  createPostStyle,
  inputs,
  selectCategoryStyle,
} from '../../../layout';
import fontStyle from '../../../layout/fontsStyle';
import api from '../../../services/api';

const CreateTitle = ({ route, navigation }) => {
  const [title, setTitle] = useState('');

  const { categoryId } = route.params;

  const handleSubmit = async () => {

    // get credentials
    let credentials = await RetrieveCredentials();
    if (!credentials) {
      Toast.show('You need to login again!')
      return;
    }
    const user_id = credentials.user_id;
    const token = credentials.token;

    if (title !== '') {
      api.post('/create-post', { user_id, token, categoryId, title, userId: 1 })
        .then((res) => {
          navigation.navigate('CreateMoment', {
            postId: res.data.insertId,
          });
        })
        .catch((err) => {
          console.log("handleSubmit -> err", err)
          Toast.show('Make sure that you provide a name');
        });
    } else {
      Toast.showWithGravity(
        'You need to provide a name to your Journal.',
        Toast.LONG,
        Toast.TOP
      );
    }
  };

  return (
    <ScrollView
      scrollEnabled={false}
      style={[containers.container, createPostStyle.wrapper]}
    >
      <Text style={[selectCategoryStyle.pageTitle, fontStyle.bold]}>
        Give a <Text style={selectCategoryStyle.pageTitleAlt}>NAME</Text>
      </Text>
      <Text style={[selectCategoryStyle.pageTitle2, fontStyle.bold]}>
        for your journal
      </Text>
      <TextInput
        style={inputs.text}
        onChangeText={(value) => setTitle(value)}
        placeholder="e.g. Squamish for Two / Squamish Trail"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        maxLength={20}
      />
      <Image source={TextureBackground} style={createPostStyle.contentBg} />
      <Pressable onPress={handleSubmit} style={[buttons.login, buttons.big]}>
        <Text style={[buttons.loginText, fontStyle.medium, buttons.textBig]}>
          Create Journal
        </Text>
      </Pressable>
    </ScrollView>
  );
};

export default CreateTitle;
