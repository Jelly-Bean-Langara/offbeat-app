import React, { useEffect, useState } from 'react';
import { Button, ImageBackground, Pressable, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { monthNow, weekday } from '../../../config/datesArray';
import { domain } from '../../../config/domain';
import { buttons, containers, fontsStyle } from '../../../layout';
import allMomentsStyle from '../../../layout/allMomentsStyle';
import api from '../../../services/api';

const AllMoments = ({ route, navigation }) => {
  const [moments, setMoments] = useState([]);
  const [cover, setCover] = useState('');
  const [post, setPost] = useState([]);

  const { postId } = route.params;

  useEffect(() => {
    async function getMoments() {
      const result = await api.get(
        `/get-all-moments-from-post?postId=${postId}`
      );
      setMoments(result.data);
    }

    async function getPost() {
      const result = await api.get(`/get-post-by-id?postId=${postId}`);
      setPost(result.data);
    }

    async function getJournalCover() {
      const result = await api.get(`/get-post-cover?postId=${postId}`);
      setCover(result.data);
    }

    getPost();
    getJournalCover();
    getMoments();
  }, []);

  const handleAddMoment = () => {
    navigation.navigate('CreateMoment', { postId });
  };

  const handlePublish = () => {
    api
      .put('/update-post-visibility', { postId, postVisibility: true })
      .then((res) => {
        navigation.navigate('JourneyDone');
      })
      .catch((err) => {
        Toast.showWithGravity(
          'Somenthing went wrong, try again',
          Toast.LONG,
          Toast.TOP
        );
      });
  };

  return (
    <View style={[containers.container, allMomentsStyle.body]}>
      <ImageBackground
        source={{ uri: `${domain}/post/${cover}` }}
        style={[allMomentsStyle.cover]}
        resizeMode="cover"
      >
        <Text style={[allMomentsStyle.title, fontsStyle.bold]}>
          {post.post_title}
        </Text>
      </ImageBackground>

      <ScrollView style={[allMomentsStyle.scroll]}>
        {moments.map((moment) => (
          <View key={moment.moment_id} style={[allMomentsStyle.moment]}>
            <Text style={[allMomentsStyle.dateOne, fontsStyle.medium]}>{`${
              weekday[new Date(moment.moment_date).getDay()]
            } ${new Date(moment.moment_date).getDate()}`}</Text>
            <Text style={[allMomentsStyle.dateTwo, fontsStyle.medium]}>{`${
              monthNow[new Date(moment.moment_date).getMonth()]
            } ${new Date(moment.moment_date).getFullYear()}`}</Text>
            <Text style={[allMomentsStyle.text]}>
              {moment.moment_description.substr(1, 30)}
            </Text>
            <View style={[allMomentsStyle.buttons]}>
              <Pressable style={[buttons.small]}>
                <Text style={[buttons.confirmTextAlt]}>Edit</Text>
              </Pressable>
              <Pressable style={[buttons.small]}>
                <Text style={[buttons.confirmTextAlt]}>Remove</Text>
              </Pressable>
            </View>
          </View>
        ))}
        <View style={containers.whiteSpace} />
      </ScrollView>

      <View style={[allMomentsStyle.bottom]}>
        <Pressable
          onPress={handleAddMoment}
          style={[buttons.confirm, allMomentsStyle.big]}
        >
          <Text style={[buttons.confirmText, allMomentsStyle.btnText]}>
            Add Moment
          </Text>
        </Pressable>
        <Pressable
          onPress={handlePublish}
          style={[buttons.login, allMomentsStyle.big]}
        >
          <Text style={[buttons.confirmText, allMomentsStyle.btnText]}>
            Publish
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default AllMoments;
