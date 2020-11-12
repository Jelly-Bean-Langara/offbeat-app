import React from 'react';
import { Image, Pressable } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';

// Style
import { navigatorStyle, buttons } from '../../layout';

// Routes
import Home from './Home';
import Post from './Post';
import Category from './Category';

// Assets
import { PlusButton } from '../../assets';

const Stack = createStackNavigator();

const MainRoutes = ({ navigation }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          title: false,
          headerStyle: navigatorStyle.pageHeader,
          headerRight: () => (
            <Pressable onPress={() => navigation.navigate('SelectCategory')}>
              <Image
                source={PlusButton}
                style={[buttons.small, buttons.plus]}
              />
            </Pressable>
          ),
        }}
      />
      <Stack.Screen
        name="Post"
        component={Post}
        options={{
          title: false,
          headerStyle: navigatorStyle.pageHeader,
        }}
      />
      <Stack.Screen
        name="Category"
        component={Category}
        options={{
          title: false,
          headerStyle: navigatorStyle.pageHeader,
        }}
      />
    </Stack.Navigator>
  );
};

export default MainRoutes;
