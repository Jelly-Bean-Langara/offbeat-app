import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Styles
import navigatorStyle from './layout/navigatorStyle';

// Page files
import Main from './pages/Main';
import {
  SelectCategory,
  CreateTitle,
  CreateMoment,
  AllMoments,
} from './pages/CreatePost';
import Camera from './pages/Camera';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator tabBarOptions={{ tabStyle: navigatorStyle.tabNav }}>
      <Tab.Screen name="Journals" component={Main} />
      <Tab.Screen name="Camera" component={Camera} />
    </Tab.Navigator>
  );
};

const Routes = () => (
  <NavigationContainer>
    <RootStack.Navigator mode="modal">
      <RootStack.Screen
        name="Main"
        component={TabRoutes}
        options={{ headerStyle: navigatorStyle.pageHeader, headerShown: false }}
      />
      <RootStack.Screen
        name="SelectCategory"
        component={SelectCategory}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: true,
          title: false,
        }}
      />
      <RootStack.Screen
        name="CreateTitle"
        component={CreateTitle}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: true,
          title: false,
        }}
      />
      <RootStack.Screen
        name="CreateMoment"
        component={CreateMoment}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: true,
          title: false,
        }}
      />
      <RootStack.Screen
        name="AllMoments"
        component={AllMoments}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: true,
          title: false,
        }}
      />
      <RootStack.Screen
        name="CameraTest"
        component={Camera}
        options={{ headerStyle: navigatorStyle.pageHeader, headerShown: false }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default Routes;
