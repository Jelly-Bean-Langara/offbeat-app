import React, { useEffect, useState } from 'react';
import { Text, View, Pressable } from 'react-native';
import { buttons } from '../../../layout';
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
    <View>
      <Text>What kind of JOURNEY is this?</Text>

      {categories.map((category, index) => (
        <Pressable
          key={index}
          onPress={() => handleSelectedCategory(category.category_id)}
        >
          <Text style={buttons.confirmTextAlt}>{category.category_title}</Text>
        </Pressable>
      ))}
    </View>
  );
};

export default SelectCategory;
