import React, { useState } from "react";
import { View, ScrollView, Switch, Text, Pressable } from 'react-native';
import { settingsStyle } from '../../layout';


const Settings = ({navigation}) => {

  const [isEnabled, setIsEnabled] = useState(false);
  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  const handlePersonalInfo = () => {
    navigation.navigate('Personal');
  };

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <Text style={settingsStyle.settingsTitle}>Settings</Text>

      <View style={settingsStyle.containerInfoBtn}>
        <Pressable style={[settingsStyle.infoBtn]}
          onPress={handlePersonalInfo}>
            <Text style={settingsStyle.titleInfo}>Personal Information</Text>
        </Pressable>
      </View>

      <View style={settingsStyle.containerToggle}>
        <View style={settingsStyle.containerTitle}>
          <Text style={settingsStyle.toggleTitle}>Location</Text>
        </View>

        <Switch
          trackColor={{ false: "#767577", true: "#0e334a" }}
          thumbColor={isEnabled ? "#f3ead9" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={settingsStyle.containerToggle}>
        <View style={settingsStyle.containerTitle}>
          <Text style={settingsStyle.toggleTitle}>Notifications</Text>
        </View>

        <Switch
          trackColor={{ false: "#767577", true: "#0e334a" }}
          thumbColor={isEnabled ? "#f3ead9" : "#f4f3f4"}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleSwitch}
          value={isEnabled}
        />
      </View>

      <View style={settingsStyle.containerLogOutBtn}>
        <Pressable style={[settingsStyle.logOutBtn]}
          onPress={handlePersonalInfo}>
            <Text style={settingsStyle.logOut}>Log Out</Text>
        </Pressable>
      </View>

    </ScrollView>
  );
}

export default Settings;
