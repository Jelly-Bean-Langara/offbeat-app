import React, { useState, useEffect } from 'react';
import { Image, Pressable, Text, View, ImageBackground } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { ScrollView } from 'react-native-gesture-handler';
import { weekday, monthNow } from '../../../config/datesArray';

import { TestPicture, CallToCardBg } from '../../../assets/static';

// Styles
import { containers, buttons, homeStyle, fontsStyle } from '../../../layout';
import api from '../../../services/api';

const Home = ({ navigation }) => {
  const [today, setToday] = useState('');
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [content, setContent] = useState([]);

  useEffect(() => {
    function getToday() {
      const date = new Date();
      setToday(weekday[date.getDay()]);
      setMonth(monthNow[date.getMonth()]);
      setDay(date.getDate());
    }

    async function getContent() {
      const result = await api.get('/get-categories-with-posts?quantity=10');
      setContent(result.data);
    }

    getToday();
    getContent();
  }, []);

  const goToPost = (id) => {
    navigation.navigate('Post');
  };

  const goToCategoryPage = (categoryId) => {
    navigation.navigate('Category', { categoryId });
  };

  return (
    <ScrollView style={[containers.container, homeStyle.wrapper]}>
      <Text style={[homeStyle.today, fontsStyle.medium]}>
        {month} {day}
      </Text>
      <Text style={[homeStyle.pageTitle, fontsStyle.medium]}>{today}</Text>

      <Pressable style={homeStyle.callTo}>
        <ImageBackground source={CallToCardBg} style={homeStyle.callToBg}>
          <Text style={[homeStyle.callToTitle, fontsStyle.medium]}>
            Start your travel journal
          </Text>
          <Text style={[homeStyle.callToText, fontsStyle.regular]}>
            Plan ahead or make a time capsule of a trip
          </Text>
          <Text
            style={[
              buttons.confirmAlt,
              buttons.loginText,
              buttons.fullSize,
              fontsStyle.bold,
            ]}
          >
            Let&apos;s start
          </Text>
        </ImageBackground>
      </Pressable>

      {content.map((category, i) => (
        <View key={i}>
          <View style={homeStyle.divisor} key={category.category_id}>
            <Text style={[homeStyle.categoryTitle, fontsStyle.medium]}>
              {category.category_title}
            </Text>
            <Pressable
              style={[buttons.small]}
              onPress={() => goToCategoryPage(category.category_id)}
            >
              <Text style={[buttons.confirmTextAlt, fontsStyle.medium]}>
                See all
              </Text>
            </Pressable>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {category.posts.map((post, index) => (
              <Pressable
                style={EStyleSheet.child(
                  homeStyle,
                  'card',
                  index,
                  category.posts.length
                )}
                onPress={() => goToPost(post.post_id)}
                key={post.post_id}
              >
                <View style={homeStyle.cardFigure}>
                  <Image
                    source={TestPicture}
                    style={[containers.images, homeStyle.images]}
                    resizeMode="cover"
                  />
                </View>
                <View style={homeStyle.cardDescription}>
                  <Text style={homeStyle.cardTitle}>{post.post_title}</Text>
                  <Text style={homeStyle.cardDetails}>
                    {post.moments > 1
                      ? `${post.moments} moments`
                      : `${post.moments} moment`}
                  </Text>
                </View>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      ))}
      <View style={containers.whiteSpace} />
    </ScrollView>
  );
};

export default Home;
