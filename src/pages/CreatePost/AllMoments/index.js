import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { containers } from '../../../layout';
import api from '../../../services/api';

// import { Container } from './styles';

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

  return (
    <ScrollView style={containers.container}>
      {moments.map((moment) => (
        <View key={moment.moment_id}>
          <Text>{moment.moment_description.substr(1, 30)}</Text>
          <View>
            <Button title="Edit" />
            <Button title="Remove" />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default AllMoments;
