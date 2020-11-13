import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Toast from 'react-native-simple-toast';
import { monthNow, weekday } from '../../../config/datesArray';
import { containers } from '../../../layout';
import api from '../../../services/api';

const AllMoments = ({ route, navigation }) => {
  const [moments, setMoments] = useState([]);

  const { postId } = route.params;

  useEffect(() => {
    async function getMoments() {
      const result = await api.get(
        `/get-all-moments-from-post?postId=${postId}`
      );
      setMoments(result.data);
    }

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
    <ScrollView style={containers.container}>
      {moments.map((moment) => (
        <View key={moment.moment_id}>
          <Text>{`${weekday[new Date(moment.moment_date).getDay()]} ${new Date(
            moment.moment_date
          ).getDate()} ${
            monthNow[new Date(moment.moment_date).getMonth()]
          } ${new Date(moment.moment_date).getFullYear()}`}</Text>
          <Text>{moment.moment_description.substr(1, 30)}</Text>
          <View>
            <Button title="Edit" />
            <Button title="Remove" />
          </View>
        </View>
      ))}
      <Button title="Add Moment" onPress={handleAddMoment} />
      <Button title="Publish" onPress={handlePublish} />
    </ScrollView>
  );
};

export default AllMoments;
