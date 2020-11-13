import React, { useEffect, useState } from 'react';
import { Text, View, Pressable, Image, Button } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import {
  buttons,
  containers,
  fontsStyle,
  selectCategoryStyle,
} from '../../../layout';
import api from '../../../services/api';

const SelectCategory = ({ navigation }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const result = await api.get('/get-all-categories');
      setCategories(result.data);
    }

    getCategories();
  }, []);

  const handleSelectedCategory = (categoryId) => {
    navigation.navigate('CreateTitle', {
      categoryId,
    });
  };

  return (
    <ScrollView style={containers.container}>
      <Text style={[selectCategoryStyle.pageTitle, fontsStyle.bold]}>
        What kind of
      </Text>
      <Text style={[selectCategoryStyle.pageTitle2, fontsStyle.bold]}>
        <Text style={selectCategoryStyle.pageTitleAlt}> JOURNEY </Text>is this?
      </Text>

      <View style={selectCategoryStyle.cardWrapper}>
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => handleSelectedCategory(category.category_id)}
            style={selectCategoryStyle.card}
          >
            <Image
              source={{
                uri: category.category_cover,
              }}
              style={{
                resizeMode: 'contain',
                height: 35,
                width: 100,
                marginTop: 28,
              }}
            />
            <Text
              style={[
                buttons.login,
                buttons.loginText,
                fontsStyle.medium,
                selectCategoryStyle.button,
              ]}
            >
              {category.category_title}
            </Text>
          </Pressable>
        ))}
      </View>
      <View style={containers.whiteSpace} />
    </ScrollView>
  );
};

export default SelectCategory;
