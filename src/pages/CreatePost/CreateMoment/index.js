import React, { useEffect, useState, useRef } from 'react';
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
import EStyleSheet from 'react-native-extended-stylesheet';
import { RNCamera } from 'react-native-camera';

// Styles
import api from '../../../services/api';
import {
  buttons,
  containers,
  createMomentStyle,
  fontsStyle,
  inputs,
  cameraStyle,
} from '../../../layout';
import { monthNow } from '../../../config/datesArray';
import fontStyle from '../../../layout/fontsStyle';
import { Camera } from '../../../assets/static';
import cameraRollStyle from '../../../layout/cameraRollStyle';

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
  const [cameraModal, setCameraModal] = useState(false);
  const [selectedPhotos, setSelectedPhotos] = useState([]);

  const { postId } = route.params;
  const cameraRef = useRef(null);

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

  const takePicture = async () => {
    const options = { quality: 0.5, base64: true };
    cameraRef.current
      .takePictureAsync(options)
      .then((data) => {
        CameraRoll.save(data.uri)
          .then(() => {
            handleGetPhotos();
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
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

  const showCameraModal = () => {
    setCameraModal(true);
    handleGetPhotos();
  };

  const hideCameraModal = () => {
    setCameraModal(false);
  };

  const selectPicture = (picture) => {
    if (selectedPhotos.length >= 6) {
      selectedPhotos.shift();
      setSelectedPhotos([...selectedPhotos, picture]);
    } else {
      setSelectedPhotos([...selectedPhotos, picture]);
    }
    hideCameraModal();
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

      <View style={[createMomentStyle.selectedPicturesWrapper]}>
        {selectedPhotos.map((photo, index) => (
          <Pressable
            key={index}
            style={[
              EStyleSheet.child(
                createMomentStyle,
                'selectedPictureBtn',
                index,
                selectedPhotos.length
              ),
            ]}
          >
            <Image
              source={{ uri: photo }}
              style={[createMomentStyle.selectedPicture]}
            />
          </Pressable>
        ))}
      </View>

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
        <Pressable onPress={showCameraModal} style={[createMomentStyle.camera]}>
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

      <Modal animationType="slide" visible={cameraModal}>
        <SafeAreaView>
          <Button title="Close" onPress={hideCameraModal} />
          <RNCamera
            ref={cameraRef}
            style={cameraStyle.body}
            type={RNCamera.Constants.Type.front}
            androidCameraPermissionOptions={{
              title: 'Permission to use camera',
              message: 'We need your permission to use your camera',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
            androidRecordAudioPermissionOptions={{
              title: 'Permission to use audio recording',
              message: 'We need your permission to use your audio',
              buttonPositive: 'Ok',
              buttonNegative: 'Cancel',
            }}
          />
          <Button title="Snap" onPress={takePicture} />
          <ScrollView style={[cameraRollStyle.wrapper]}>
            <View style={[cameraRollStyle.inner]}>
              {photos.map((photo, index) => (
                <Pressable
                  style={[cameraRollStyle.pictureBtn]}
                  onPress={() => selectPicture(photo.node.image.uri)}
                >
                  <Image
                    key={index}
                    style={[cameraRollStyle.picture]}
                    source={{ uri: photo.node.image.uri }}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CreateMoment;
