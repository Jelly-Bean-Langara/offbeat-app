import React, { useState } from 'react';
import { Button, ImageBackground, Text } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { TextureBackground } from '../../../assets/static';

// Styles
import { containers, createPostStyle, inputs } from '../../../layout';
import api from '../../../services/api';

const CreateTitle = ({ route, navigation }) => {
  const [title, setTitle] = useState('');

  const { categoryId } = route.params;

  const handleSubmit = () => {
    if (title !== '') {
      api
        .post('/create-post', { categoryId, title, userId: 1 })
        .then((res) => {
          navigation.navigate('CreateMoment', {
            postId: res.data.insertId,
          });
        })
        .catch((err) => {
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
    <ScrollView style={[containers.container, createPostStyle.wrapper]}>
      <Text>Give a NAME for your journal</Text>
      <TextInput
        style={inputs.text}
        onChangeText={(value) => setTitle(value)}
        placeholder="e.g. Squamish for Two / Squamish Trail"
        returnKeyType="send"
        onSubmitEditing={handleSubmit}
        maxLength={20}
      />
      <ImageBackground
        source={TextureBackground}
        style={createPostStyle.contentBg}
      />
      <Button title="Create Journal" onPress={handleSubmit} />
    </ScrollView>
  );
};

export default CreateTitle;
