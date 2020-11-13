import React, { useEffect, useState } from 'react';
import CameraRoll from '@react-native-community/cameraroll';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import {
  View,
  Button,
  Image,
  Text,
  Pressable,
  Modal,
  SafeAreaView,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import CameraView from '../../Camera';

// Styles
import api from '../../../services/api';
import {
  buttons,
  containers,
  createMomentStyle,
  fontsStyle,
  inputs,
} from '../../../layout';
import { monthNow } from '../../../config/datesArray';
import fontStyle from '../../../layout/fontsStyle';
import { Camera } from '../../../assets/static';

const CreateMoment = ({ route, navigation }) => {
  const [photos, setPhotos] = useState([]);
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());
  const [day, setDay] = useState(new Date().getDate());
  const [month, setMonth] = useState(monthNow[new Date().getMonth()]);
  const [year, setYear] = useState(new Date().getFullYear());
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
    // setShow(Platform.OS === 'ios');
    setDate(currentDate);
    setDay(currentDate.getDate());
    setMonth(monthNow[currentDate.getMonth()]);
    setYear(currentDate.getFullYear());
  };

  const handleGuide = (text) => {
    setPlaceholder(text);
  };

  const displayDatePicker = () => {
    setShow(true);
  };

  const hideDatePicker = () => {
    setShow(false);
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
    <View style={[containers.container, createMomentStyle.wrapper]}>
      <View style={createMomentStyle.top}>
        <Pressable onPress={displayDatePicker}>
          <Text
            style={[buttons.textBig, buttons.confirmTextAlt]}
          >{`${day} ${month}, ${year}`}</Text>
        </Pressable>
        <Pressable
          onPress={displayDatePicker}
          style={[createMomentStyle.location]}
        >
          <Text style={[createMomentStyle.locationText, fontStyle.medium]}>
            Location
          </Text>
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={createMomentStyle.horizontalScroll}
      >
        <Pressable
          style={createMomentStyle.guides}
          onPress={() => handleGuide('Unguided')}
        >
          <Text style={[createMomentStyle.guidesText, fontStyle.medium]}>
            unguided
          </Text>
        </Pressable>
        <Pressable
          style={createMomentStyle.guides}
          onPress={() => handleGuide('Day Summary')}
        >
          <Text style={[createMomentStyle.guidesText, fontStyle.medium]}>
            day summary
          </Text>
        </Pressable>
        <Pressable
          style={createMomentStyle.guides}
          onPress={() => handleGuide('Worth Seeing')}
        >
          <Text style={[createMomentStyle.guidesText, fontStyle.medium]}>
            worth seeing
          </Text>
        </Pressable>
      </ScrollView>

      <TextInput
        multiline
        value={description}
        placeholder={placeholder}
        style={[inputs.text, inputs.bigArea]}
        onChangeText={(value) => setDescription(value)}
      />

      {show ? (
        <>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour
            display="spinner"
            onChange={onChange}
            style={{ height: 300 }}
          />
          <Button title="Done" onPress={hideDatePicker} />
        </>
      ) : (
        <Text />
      )}

      <View style={[createMomentStyle.bottom]}>
        <Pressable onPress={handleGetPhotos} style={[createMomentStyle.camera]}>
          <Image source={Camera} />
        </Pressable>
        <Pressable
          onPress={handleSubmit}
          style={[buttons.confirm, createMomentStyle.saveMomentBtn]}
        >
          <Text
            style={[
              fontsStyle.medium,
              buttons.confirmText,
              createMomentStyle.saveMomentText,
            ]}
          >
            Save Moment
          </Text>
        </Pressable>
      </View>

      <Modal animationType="slide">
        <SafeAreaView>
          <CameraView />
          <ScrollView style={createMomentStyle.horizontalScroll}>
            {photos.map((photo, index) => (
              <Image
                key={index}
                style={{ height: 100, width: 100 }}
                source={{ uri: photo.node.image.uri }}
              />
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CreateMoment;
