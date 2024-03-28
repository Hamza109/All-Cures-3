import React, {useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Route} from '../../routes';
import FeedStack from '../Stacks/FeedStack';
import DoctorStack from '../Stacks/DoctorStack';
import ProfileStack from '../Stacks/ProfileStack';
import {Platform, View} from 'react-native';
import ActiveFeed from '../../assets/images/ACTIVE_FEED.svg';
import InactiveFeed from '../../assets/images/INACTIVE_FEED.svg';
import UserAvatar from 'react-native-user-avatar';
import ActiveDoctor from '../../assets/images/ACTIVE_DOCTOR.svg';
import InactiveDoctor from '../../assets/images/INACTIVE_DOCTOR.svg';
import ActiveSearch from '../../assets/images/ACTIVE_SEARCH.svg';
import InactiveSearch from '../../assets/images/INACTIVE_SEARCH.svg';
import SearchStack from '../Stacks/SearchStack';
import {getFocusedRouteNameFromRoute} from '@react-navigation/native';
import {Color} from '../../config/GlobalStyles';
import {useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome';
import {User} from '../../Components/profile/UserPic';
const BottomTab = () => {
  const Tab = createBottomTabNavigator();
  const profile = useSelector(state => state.profile.data);
  const [name, setName] = useState();
  useEffect(() => {
    if (Object.keys(profile).length !== 0) {
      const name = `${profile.first_name} ${profile.last_name}`;
      console.log(name);
      setName(name);
    }
  }, []);

  return (
    <Tab.Navigator
      initialRouteName={Route.FEED_TAB}
      screenOptions={({route, navigation}) => {
        return {
          headerShown: false,
       
          tabBarStyle: {
            justifyContent: 'center',
            alignItems: 'center',
            height: Platform.OS === 'android'?60:80 ,

            display:
              getFocusedRouteNameFromRoute(route) === 'NOTIFICATION' ||
              getFocusedRouteNameFromRoute(route) === 'HELP' ||
              getFocusedRouteNameFromRoute(route) === 'SUBMITARTICLE' ||
              getFocusedRouteNameFromRoute(route) === 'LOGIN' ||
              getFocusedRouteNameFromRoute(route) === 'ABOUT' ||
              getFocusedRouteNameFromRoute(route) === Route.VIDEOCALL ||
              getFocusedRouteNameFromRoute(route) === Route.CHAT
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
          unmountOnBlur: true,
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
                {Object.keys(profile).length !== 0 ? (
                  <UserAvatar
                    size={35}
                    name={name}
                    bgColor={Color.appDefaultColor}
                  />
                ) : (
                  <Icon name="user" size={25} color={Color.appDefaultColor} />
                )}
              </View>
            ) : (
              <View style={{marginTop: 9}}>
                {Object.keys(profile).length !== 0 ? (
                  <UserAvatar
                    size={35}
                    name={name}
                    bgColor={Color.appDefaultColor}
                  />
                ) : (
                  <Icon name="user" size={25} color={Color.lightpurple} />
                )}
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
