import React from 'react';
import { View, Text, Button } from 'react-native';
import { journeyDoneStyle } from '../../../layout';
import containers from '../../../layout/containers';

const JourneyDone = ({ navigation }) => {
  const handleGoMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View style={[containers.container, journeyDoneStyle.body]}>
      <Text>Done</Text>
      <Button title="Main" onPress={handleGoMain} />
    </View>
  );
};

export default JourneyDone;
