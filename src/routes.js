import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

// Styles
import { Image } from 'react-native';
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
import EditMoment from './pages/EditMoment';
import {
  ExploreIcon,
  ExploreIconAlt,
  JournalIcon,
  JournalIconAlt,
  ProfileIcon,
  ProfileIconAlt,
} from './assets/static';
import colors from './layout/colors';
import Explore from './pages/Explore';
import { Close } from './assets/static';
import { buttons } from './layout';
import Personal from './pages/Personal';
import SplashScreen from './pages/SplashScreen';

const Tab = createBottomTabNavigator();
const RootStack = createStackNavigator();

const TabRoutes = () => {
  return (
    <Tab.Navigator
      tabBarOptions={{
        tabStyle: navigatorStyle.tabNav,
        activeTintColor: colors.$primary,
        inactiveTintColor: '#A5BECE',
      }}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          if (route.name === 'Journals') {
            iconName = focused ? JournalIcon : JournalIconAlt;
          } else if (route.name === 'Explore') {
            iconName = focused ? ExploreIcon : ExploreIconAlt;
          } else if (route.name === 'Profile') {
            iconName = focused ? ProfileIcon : ProfileIconAlt;
          }

          // You can return any component that you like here!
          return (
            <Image
              source={iconName}
              width={1}
              height={1}
              resizeMode="contain"
              resizeMethod="resize"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Journals" component={Main} />
      <Tab.Screen name="Explore" component={Explore} />
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
        name="SplashScreen"
        component={SplashScreen}
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
          headerLeft: null,
          title: false,
        }}
      />
      <RootStack.Screen
        name="AllMoments"
        component={AllMoments}
        options={{
          headerStyle: navigatorStyle.pageHeader,
          headerShown: true,
          headerLeft: null,
          title: false,
        }}
      />
      <RootStack.Screen
        name="EditMoment"
        component={EditMoment}
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
