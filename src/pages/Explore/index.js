import React, { useEffect, useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import { domain } from '../../config/domain';
import { fontsStyle } from '../../layout';
import containers from '../../layout/containers';
import exploreStyle from '../../layout/exploreStyle';
import api from '../../services/api';

const Explore = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const [quantity, setQuantity] = useState(10);
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function getPosts() {
      const result = await api.get(`/get-explore?quantity=${quantity}`);
      setPosts(result.data);
    }

    getPosts();
  }, []);

  useEffect(() => {
    async function getPosts() {
      const result = await api.get(
        `/get-search?search=${search}&quantity=${quantity}`
      );
      setPosts(result.data);
    }

    getPosts();
  }, [search]);

  const goToPost = (id) => {
    navigation.navigate('Post', { postId: id });
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <View style={[containers.container]}>
      <View style={[exploreStyle.top]}>
        <TextInput
          style={[exploreStyle.input]}
          placeholder="Where are you going?"
          onChangeText={(value) => handleSearch(value)}
        />
      </View>

      <ScrollView>
        <View style={[exploreStyle.cardWrapper]}>
          {posts.map((post) => (
            <Pressable
              key={post.post_id}
              style={[exploreStyle.card]}
              onPress={() => goToPost(post.post_id)}
            >
              <Image
                source={{ uri: `${domain}/post/${post.cover}` }}
                style={[exploreStyle.img]}
                resizeMode="cover"
              />
              <View>
                <Text style={[exploreStyle.title, fontsStyle.medium]}>
                  {post.post_title}
                </Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Explore;
