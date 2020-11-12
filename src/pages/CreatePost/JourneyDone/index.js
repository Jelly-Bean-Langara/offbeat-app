import React from 'react';
import { View, Text, Button } from 'react-native';

const JourneyDone = ({ navigation }) => {
  const handleGoMain = () => {
    navigation.navigate('Main');
  };

  return (
    <View>
      <Text>Done</Text>
      <Button title="Main" onPress={handleGoMain} />
    </View>
  );
};

export default JourneyDone;
