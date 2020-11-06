import React, { useCallback, useRef, useState } from 'react';
import { Text, View, Image, ImageBackground } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel, { Pagination } from 'react-native-snap-carousel';

import Picture from '../../../assets/picture.png';

// Styles
import { containers, postStyle } from '../../../layout';

const Post = ({ navigation }) => {
  const [postData, setPostData] = useState({
    cover: Picture,
    title: 'Vacouver Island',
    country: 'Canada',
    category: 'Weekend Getaway',
  });
  const [moments, setMoments] = useState([
    {
      date: 'October 29, 2020',
      location: 'Vancouver Island',
      time: '10:30PM',
      cover: Picture,
      description:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis ducimus deserunt non provident voluptatibus exercitationem aliquid voluptates repellat, hic quasi maxime cum praesentium, harum consectetur reprehenderit repellendus eaque tempore eos!',
      pictures: [Picture, Picture, Picture],
    },
  ]);
  const [activeSlide, setActiveSlide] = useState(0);

  const carouselRef = useRef(null);

  const renderItem = useCallback(
    (item) => (
      <View
        style={{
          backgroundColor: 'grey',
          borderRadius: 5,
          marginRight: 16,
          height: 300,
        }}
      >
        <Image source={Picture} style={{ width: 200 }} />
      </View>
    ),
    []
  );

  return (
    <ScrollView style={containers.container}>
      <View>
        <ImageBackground source={postData.cover} style={postStyle.cover}>
          <Text>
            {postData.category} in {postData.country}
          </Text>
          <Text>{postData.title}</Text>
        </ImageBackground>
      </View>

      {moments.map((moment, index) => (
        <View key={index}>
          <Text>{moment.date}</Text>
          <Text>
            {moment.location} - {moment.time}
          </Text>
          <Text>{moment.description}</Text>

          <Carousel
            ref={carouselRef}
            layout="stack"
            layoutCardOffset={10}
            sliderWidth={400}
            itemWidth={380}
            sliderHeight={300}
            data={moment.pictures}
            renderItem={renderItem}
            onSnapToItem={(indexItem) => {
              setActiveSlide(indexItem);
            }}
          />
          <Pagination
            activeDotIndex={activeSlide}
            dotsLength={moment.pictures.length}
          />
        </View>
      ))}
    </ScrollView>
  );
};

export default Post;
