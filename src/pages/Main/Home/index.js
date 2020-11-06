import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ScrollView } from 'react-native-gesture-handler';

import Picture from '../../../assets/picture.png';
import CallToCardBg from '../../../assets/call-to-card-bg.jpg';

// Styles
import { containers, buttons, homeStyle } from '../../../layout';

const Home = ({ navigation }) => {
  const [today, setToday] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');

  useEffect(() => {
    function getToday() {
      const weekday = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ];

      const monthNow = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];

      const date = new Date();
      setToday(weekday[date.getDay()]);
      setMonth(monthNow[date.getMonth()]);
      setDay(date.getDate());
    }

    getToday();
  }, []);

  const goToPost = (id) => {
    navigation.navigate('Post');
  };

  return (
    <ScrollView style={[containers.container, homeStyle.wrapper]}>
      <Text style={homeStyle.today}>
        {month} {day}
      </Text>
      <Text style={homeStyle.pageTitle}>{today}</Text>

      <Pressable style={homeStyle.callTo}>
        <ImageBackground source={CallToCardBg} style={homeStyle.callToBg}>
          <Text style={homeStyle.callToTitle}>Start your travel journal</Text>
          <Text style={homeStyle.callToText}>
            Plan ahead or make a time capsule of a trip
          </Text>
          <Text style={[buttons.login, buttons.loginText, buttons.fullSize]}>
            Let&apos;s start
          </Text>
        </ImageBackground>
      </Pressable>

      <View style={homeStyle.divisor}>
        <Text style={homeStyle.categoryTitle}>Weekend Getaways</Text>
        <Pressable style={[buttons.small]}>
          <Text style={buttons.confirmTextAlt}>See all</Text>
        </Pressable>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <Pressable
          style={EStyleSheet.child(homeStyle, 'card', 0, 3)}
          onPress={() => goToPost(1)}
        >
          <View style={homeStyle.cardFigure}>
            <Image
              source={Picture}
              style={[containers.images, homeStyle.images]}
              resizeMode="cover"
            />
          </View>
          <View style={homeStyle.cardDescription}>
            <Text style={homeStyle.cardTitle}>Vancouver Island</Text>
            <Text style={homeStyle.cardDetails}>Canada</Text>
            <Text style={homeStyle.cardDetails}>1 moment</Text>
          </View>
        </Pressable>
      </ScrollView>

      <View style={containers.whiteSpace} />
    </ScrollView>
  );
};

export default Home;
