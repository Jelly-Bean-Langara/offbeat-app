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
import Profile from  './pages/Profile';
import Settings from './pages/Settings';
import JourneyDone from './pages/CreatePost/JourneyDone';
import Personal from './pages/Personal';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator tabBarOptions={{ tabStyle: navigatorStyle.tabNav }}>
      <Tab.Screen name="Journals" component={Main} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};

const Routes = () => (
  <NavigationContainer>
    <RootStack.Navigator
      mode="modal"
      screenOptions={{ headerBackTitleVisible: false }}
    >
      <RootStack.Screen
        name="Main"
        component={TabRoutes}
        options={{ headerStyle: navigatorStyle.pageHeader, headerShown: false }}
      />
      <RootStack.Screen
        name="Personal"
        component={Personal}
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
        name="JourneyDone"
        component={JourneyDone}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: false,
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

    </RootStack.Navigator>
  </NavigationContainer>
);

export default Routes;
