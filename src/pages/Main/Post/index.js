import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';

// Styles
import {
  buttons,
  containers,
  fontsStyle,
  postStyle,
  createMomentStyle,
  mapStyle,
} from '../../../layout';
import api from '../../../services/api';
import { domain } from '../../../config/domain';
import { monthNow } from '../../../config/datesArray';

const Post = ({ route }) => {
  const [postData, setPostData] = useState({});
  const [moments, setMoments] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [locationModal, setLocationModal] = useState(false);
  const [latitude, setLatitude] = useState(1);
  const [longitude, setLongitude] = useState(1);
  const [spinner, setSpinner] = useState(true);

  const { postId } = route.params;

  useEffect(() => {
    async function getPostInfo() {
      const result = await api.get(`/get-post-by-id?postId=${postId}`);
      setPostData(result.data);
    }

    async function getMoments() {
      const result = await api.get(
        `/get-all-moments-from-post?postId=${postId}`
      );

      setMoments(result.data);
    }

    getMoments();
    getPostInfo();
  }, [postId]);

  const carouselRef = useRef(null);

  const renderItem = useCallback((item) => {
    return (
      <View
        style={{
          borderRadius: 5,
          marginRight: 16,
          height: 300,
        }}
      >
        <Image
          source={{
            uri: `${domain}/post/${item.item.moment_picture_file_name}`,
          }}
          style={{ width: '100%', height: 400 }}
          resizeMode="cover"
        />
      </View>
    );
  }, []);

  const hideLocationModal = () => {
    setLocationModal(false);
  };

  const showMap = (latitudeT, longitudeT) => {
    setLocationModal(true);
    setLatitude(parseFloat(latitudeT));
    setLongitude(parseFloat(longitudeT));
  };

  const finishLoading = () => {
    setSpinner(false);
  };

  return (
    <ScrollView style={containers.container}>
      <ImageBackground
        source={{ uri: `${domain}/post/${postData.cover}` }}
        style={postStyle.cover}
        onLoadEnd={finishLoading}
      >
        <View style={[postStyle.coverBody]}>
          <Text style={[postStyle.coverTextCat, fontsStyle.medium]}>
            {postData.category_title}
          </Text>
          <Text style={[postStyle.coverTextTitle, fontsStyle.bold]}>
            {postData.post_title}
          </Text>
        </View>
      </ImageBackground>

      {moments.map((moment, index) => (
        <View key={index} style={[postStyle.postMoment]}>
          <Text style={[postStyle.date, fontsStyle.medium]}>
            {monthNow[moment.moment_month]} {moment.moment_day},{' '}
            {moment.moment_year}
          </Text>
          <View style={[postStyle.locationArea]}>
            <Text style={[postStyle.location, fontsStyle.medium]}>
              {moment.moment_location_name}
            </Text>
            <Pressable
              style={[buttons.small, buttons.confirm]}
              onPress={() =>
                showMap(moment.moment_latitude, moment.moment_longitude)
              }
            >
              <Text style={[fontsStyle.medium, buttons.confirmText]}>
                Show in map
              </Text>
            </Pressable>
          </View>
          <Text style={[postStyle.description, fontsStyle.light]}>
            {moment.moment_description}
          </Text>

          <Carousel
            ref={carouselRef}
            layout="stack"
            layoutCardOffset={10}
            sliderWidth={360}
            itemWidth={360}
            sliderHeight={300}
            data={moment.pictures}
            renderItem={renderItem}
            onSnapToItem={(indexItem) => {
              setActiveSlide(indexItem);
            }}
            style={{ borderRadius: 23, overflow: 'hidden' }}
          />
          <Pagination
            activeDotIndex={activeSlide}
            dotsLength={moment.pictures.length}
          />
        </View>
      ))}

      <Modal animationType="slide" visible={locationModal}>
        <SafeAreaView style={[createMomentStyle.modalMap]}>
          <MapView
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
            />
          </MapView>
          <Pressable
            onPress={hideLocationModal}
            style={[mapStyle.btn, buttons.confirm]}
          >
            <Text style={[buttons.confirmText]}>Close</Text>
          </Pressable>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
};

export default Post;
