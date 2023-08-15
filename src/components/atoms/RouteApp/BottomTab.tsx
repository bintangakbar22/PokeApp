/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Dimensions} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Colors from '@constants/colors';
import {CompareScreen, HomeScreen} from '@components/screens';

import {BuyIcon, HomeIcon} from '@assets/svg/BottomTab';

const Tab = createBottomTabNavigator();

const BottomTabNavigatior = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color, size}) => {
          if (route.name === 'HomeScreen') {
            return <HomeIcon color={color} width={size} height={size} />;
          } else if (route.name === 'CompareScreen') {
            return <BuyIcon color={color} width={size} height={size} />;
          }
        },
        tabBarActiveTintColor: Colors.white,
        tabBarInactiveTintColor: Colors.white,
        tabBarStyle: {
          position: 'absolute',
          backgroundColor: Colors.black,
          height: 60,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 0,
          bottom: 0,
        },
        tabBarItemStyle: {
          height: 40,
          marginHorizontal: 10,
          alignSelf: 'center',
        },
        tabBarActiveBackgroundColor: Colors.primary.dark1,
        tabBarInactiveBackgroundColor: Colors.black,
      })}>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{tabBarLabel: 'Home'}}
      />
      <Tab.Screen
        name="CompareScreen"
        component={CompareScreen}
        options={{tabBarLabel: 'Compare'}}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigatior;
