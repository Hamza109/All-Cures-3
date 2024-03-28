import React from 'react';
import {View, Text, Button, StyleSheet, Image} from 'react-native';

import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import AllMyCures from '../../../Components/profile/AllMyCures';
import PublishedCures from '../../../Components/profile/PublishedCures';
const Tab = createMaterialTopTabNavigator();
const MyCures = () => {
  return (
    <Tab.Navigator
      initialRouteName="All"
      screenOptions={{
        tabBarIndicatorStyle: {color: '#00415e'},
        tabBarStyle: {padding: 0},
        tabBarInactiveTintColor: 'grey',
        tabBarActiveTintColor: '#00415e',
     
      }}>
      <Tab.Screen
        name="All"
        component={AllMyCures}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIndicatorStyle: {color: '#00415e'},
          tabBarLabel: 'Article',

          tabBarColor: '#fff',
        }}
      />
      <Tab.Screen
        name="Cures"
        component={PublishedCures}
        options={{
          unmountOnBlur: true,
          headerShown: false,
          tabBarIndicatorStyle: {color: '#00415e'},
          tabBarLabel: 'Cures',
          tabBarColor: '#fff',
        }}
      />
    </Tab.Navigator>
  );
};

export default MyCures;

const styles = StyleSheet.create({});
