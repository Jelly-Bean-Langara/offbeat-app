/* eslint-disable no-nested-ternary */
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
  Keyboard,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Toast from 'react-native-simple-toast';
import EStyleSheet from 'react-native-extended-stylesheet';
import { RNCamera } from 'react-native-camera';
import Geolocation from '@react-native-community/geolocation';
import { GOOGLE_API_KEY } from '@env';
import PlacesInput from 'react-native-places-input';
import MapView, { Marker } from 'react-native-maps';

// Styles
import api from '../../../services/api';
import {
  buttons,
  containers,
  createMomentStyle,
  fontsStyle,
  inputs,
  cameraStyle,
  mapStyle,
} from '../../../layout';
import { monthNow } from '../../../config/datesArray';
import { Camera, ChangeCamera, Close, Location } from '../../../assets/static';
import cameraRollStyle from '../../../layout/cameraRollStyle';

const CreateMoment = ({ route, navigation }) => {
  const [photos, setPhotos] = useState([]);
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
  const [reload, setReload] = useState(false);
  const [dateModal, setDateModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [cameraSide, setCameraSide] = useState(false);

  const { postId } = route.params;
  const cameraRef = useRef(null);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setDate(new Date());
      setDescription('');
      setPhotos([]);
    });

    Geolocation.getCurrentPosition((info) => {
      setLatitude(info.coords.latitude);
      setLongitude(info.coords.longitude);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    setSelectedPhotos(selectedPhotos);
  }, [reload]);

  const handleGetPhotos = () => {
    CameraRoll.getPhotos({
      first: 20,
      assetType: 'Photos',
    })
      .then((r) => {
        setPhotos(r.edges);
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
    setDateModal(true);
  };

  const hideDatePicker = () => {
    setDateModal(false);
  };

  const showCameraModal = () => {
    setCameraModal(true);
    handleGetPhotos();
  };

  const hideCameraModal = () => {
    setCameraModal(false);
  };

  const showLocationModal = () => {
    setLocationModal(true);
  };

  const hideLocationModal = () => {
    setLocationModal(false);
  };

  const changeSide = () => {
    setCameraSide(!cameraSide);
  };

  const selectPicture = (picture) => {
    if (selectedPhotos.length >= 8) {
      selectedPhotos.shift();
      setSelectedPhotos([...selectedPhotos, picture]);
    } else {
      setSelectedPhotos([...selectedPhotos, picture]);
    }
    hideCameraModal();
  };

  const deletePicture = (index) => {
    selectedPhotos.splice(index, 1);
    setReload(!reload);
  };

  const handleSubmit = () => {
    const formatedDate = new Date(date);

    const newDate = `${formatedDate.getFullYear()}-${
      formatedDate.getMonth() + 1
    }-${formatedDate.getDate()}`;

    const formData = new FormData();
    selectedPhotos.map((photo) => {
      formData.append('photos', photo);
    });
    formData.append('postId', postId);
    formData.append('date', newDate);
    formData.append('description', description);
    formData.append('latitude', latitude);
    formData.append('longitude', longitude);
    formData.append('locationName', locationName);

    if (description !== '') {
      api
        .post('/create-moment', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        })
        .then((res) => {
          setDescription('');
          setSelectedPhotos([]);
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
            style={[buttons.textBig, buttons.confirmTextAlt, fontsStyle.medium]}
          >{`${day} ${month}, ${year}`}</Text>
        </Pressable>
        <Pressable
          onPress={showLocationModal}
          style={[createMomentStyle.location]}
        >
          <Image source={Location} height={2} width={2} />
          <Text style={[createMomentStyle.locationText, fontsStyle.medium]}>
            {locationName}
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
          <Text style={[createMomentStyle.guidesText, fontsStyle.medium]}>
            unguided
          </Text>
        </Pressable>
        <Pressable
          style={createMomentStyle.guides}
          onPress={() => handleGuide('Day Summary')}
        >
          <Text style={[createMomentStyle.guidesText, fontsStyle.medium]}>
            day summary
          </Text>
        </Pressable>
        <Pressable
          style={createMomentStyle.guides}
          onPress={() => handleGuide('Worth Seeing')}
        >
          <Text style={[createMomentStyle.guidesText, fontsStyle.medium]}>
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
            onPress={() => deletePicture(index)}
            style={[
              EStyleSheet.child(
                createMomentStyle,
                'selectedPictureBtn',
                index > 3
                  ? index === 4
                    ? 0
                    : index === 5
                    ? 1
                    : index === 6
                    ? 2
                    : index === 7
                    ? 3
                    : index === 8
                    ? 4
                    : index
                  : index,
                selectedPhotos.length > 4 ? 8 : 4
              ),
            ]}
          >
            <Image
              source={{ uri: photo.uri }}
              style={[createMomentStyle.selectedPicture]}
            />
          </Pressable>
        ))}
      </View>

      <Modal animationType="slide" visible={dateModal}>
        <SafeAreaView style={[createMomentStyle.modalDate]}>
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            is24Hour
            display="spinner"
            onChange={onChange}
            style={{ height: 300 }}
          />
          <Button title="Done" onPress={hideDatePicker} />
        </SafeAreaView>
      </Modal>

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
          <RNCamera
            ref={cameraRef}
            style={cameraStyle.body}
            type={
              cameraSide
                ? RNCamera.Constants.Type.front
                : RNCamera.Constants.Type.back
            }
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
          <Pressable style={[cameraStyle.change]} onPress={changeSide}>
            <Image source={ChangeCamera} />
          </Pressable>
          <View style={[cameraStyle.buttonsArea]}>
            <Pressable onPress={hideCameraModal}>
              <Image source={Close} />
            </Pressable>
            <Pressable onPress={takePicture}>
              <Image source={Camera} />
            </Pressable>
          </View>
          <ScrollView style={[cameraRollStyle.wrapper]}>
            <View style={[cameraRollStyle.inner]}>
              {photos.map((photo, index) => (
                <Pressable
                  key={index}
                  style={[cameraRollStyle.pictureBtn]}
                  onPress={() =>
                    selectPicture({
                      uri: photo.node.image.uri,
                      type: photo.node.type,
                      name: photo.node.image.filename,
                    })
                  }
                >
                  <Image
                    style={[cameraRollStyle.picture]}
                    source={{ uri: photo.node.image.uri }}
                  />
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      <Modal animationType="slide" visible={locationModal}>
        <SafeAreaView style={[createMomentStyle.modalMap]}>
          <PlacesInput
            googleApiKey="AIzaSyDQVyaJI-QAnwHUHRypk0-L80Qb4PMmcck"
            placeHolder="Search Location"
            language="en-US"
            onSelect={(place) => {
              setLocationName(place.result.name);
              setLongitude(place.result.geometry.location.lng);
              setLatitude(place.result.geometry.location.lat);
              Keyboard.dismiss();
            }}
            stylesContainer={mapStyle.container}
            stylesList={mapStyle.list}
          />
          <MapView
            initialRegion={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            style={{
              height: '100%',
            }}
          >
            <Marker
              coordinate={{
                latitude,
                longitude,
              }}
              title="Hey"
            />
          </MapView>
          <Pressable
            onPress={hideLocationModal}
            style={[mapStyle.btn, buttons.confirm]}
          >
            <Text style={[buttons.confirmText]}>Select</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </View>
  );
};

export default CreateMoment;
