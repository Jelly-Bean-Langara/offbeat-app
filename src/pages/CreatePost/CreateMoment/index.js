import React, { useEffect, useState } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { View, Button, Image, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';

// Styles
import inputs from '../../../layout/inputs';
import api from '../../../services/api';

const CreateMoment = ({ route, navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [placeholder, setPlaceholder] = useState('Type your text here');
  const [description, setDescription] = useState('');
  const [latitude, setLatitude] = useState(1);
  const [longitude, setLongitude] = useState(1);
  const [locationName, setLocationName] = useState('Canada');

  const { postId } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDate(new Date());
      setDescription('');
      setPhotos([]);
    });

    return unsubscribe;
  }, []);

  const handleGetPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
        console.log(r.edges[1].node.image.uri);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
  };

  const handleGuide = (text) => {
    setPlaceholder(text);
  };

  const handleSubmit = () => {
    const formatedDate = new Date(date);

    const newDate = `${formatedDate.getFullYear()}-${
      formatedDate.getMonth() + 1
    }-${formatedDate.getDate()}`;

    if (description !== '') {
      api
        .post('/create-moment', {
          postId,
          date: newDate,
          description,
          latitude,
          longitude,
          locationName,
        })
        .then((res) => {
          setDescription('');
          navigation.navigate('AllMoments', { postId });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      Toast.showWithGravity(
        'You need to provide a description to this moment.',
        Toast.LONG,
        Toast.TOP
      );
    }
  };

  return (
    <View>
      <ScrollView>
        {photos.map((photo, index) => (
          <Image
            key={index}
            style={{ height: 100, width: 100 }}
            source={{ uri: photo.node.image.uri }}
          />
        ))}
      </ScrollView>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={mode}
        is24Hour
        display="default"
        onChange={onChange}
      />
      <ScrollView horizontal>
        <Button title="Unguided" onPress={() => handleGuide('')} />
        <Button title="Food" onPress={() => handleGuide('Delicious food')} />
        <Button title="Trail" onPress={() => handleGuide('Nice trail')} />
      </ScrollView>
      <TextInput
        multiline
        value={description}
        placeholder={placeholder}
        style={inputs.text}
        onChangeText={(value) => setDescription(value)}
      />
      <Button onPress={handleGetPhotos} title="Load Images" />
      <Button onPress={handleSubmit} title="Save Moment" />
    </View>
  );
};

export default CreateMoment;
