import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from '../../routes';
import FeedStack from '../Stacks/FeedStack';
import DoctorStack from '../Stacks/DoctorStack';
import ProfileStack from '../Stacks/ProfileStack';
import {View} from 'react-native';
import ActiveFeed from '../../assets/images/ACTIVE_FEED.svg';
import InactiveFeed from '../../assets/images/INACTIVE_FEED.svg';
import ActiveDoctor from '../../assets/images/ACTIVE_DOCTOR.svg';
import InactiveDoctor from '../../assets/images/INACTIVE_DOCTOR.svg';
import ActiveSearch from '../../assets/images/ACTIVE_SEARCH.svg';
import InactiveSearch from '../../assets/images/INACTIVE_SEARCH.svg';
import SearchStack from '../Stacks/SearchStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
    initialRouteName={Route.FEED_TAB}
      screenOptions={({route, navigation}) => {
        return {
          headerShown: false,

          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: 60,

            display:
              getFocusedRouteNameFromRoute(route) === 'NOTIFICATION' ||
              getFocusedRouteNameFromRoute(route) === 'HELP' ||
              getFocusedRouteNameFromRoute(route) === 'SUBMITARTICLE' ||
              getFocusedRouteNameFromRoute(route) === 'LOGIN' ||
              getFocusedRouteNameFromRoute(route) === 'ABOUT' ||
              getFocusedRouteNameFromRoute(route) === 'videoCall'
                ? 'none'
                : 'flex',
          },
          tabBarInactiveTintColor: 'grey',
          tabBarActiveBackgroundColor: 'aliceblue',
        };
      }}>
      <Tab.Screen
        name={Route.FEED_TAB}
        component={FeedStack}
        options={{
          tabBarLabel: '',

          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{marginTop: 9}}>
                <ActiveFeed width={16} height={20} />
              </View>
            ) : (
              <View style={{marginTop: 9}}>
                <InactiveFeed width={16} height={20} />
              </View>
            ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{marginTop: 9}}>
                <ActiveDoctor width={20} height={20} />
              </View>
            ) : (
              <View style={{marginTop: 9}}>
                <InactiveDoctor width={20} height={20} />
              </View>
            ),
        }}
        name={Route.DOCTOR_TAB}
        component={DoctorStack}
      />
      <Tab.Screen
        name={Route.SEARCH_TAB}
        component={SearchStack}
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{marginTop: 9}}>
                <ActiveSearch width={20} height={20} />
              </View>
            ) : (
              <View style={{marginTop: 9}}>
                <InactiveSearch width={20} height={20} />
              </View>
            ),
        }}
      />
      <Tab.Screen
        options={{
          tabBarLabel: '',
          tabBarIcon: ({focused}) =>
            focused ? (
              <View style={{marginTop: 9}}>
                <ActiveFeed width={16} height={20} />
              </View>
            ) : (
              <View style={{marginTop: 9}}>
                <InactiveFeed width={16} height={20} />
              </View>
            ),
        }}
        name={Route.PROFILE_TAB}
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default BottomTab;
