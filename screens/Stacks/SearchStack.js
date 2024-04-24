import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Search from '../Search/Search.js';
import SearchInput from '../Search/SearchInput.js';
import {TouchableOpacity} from 'react-native';
import SearchResults from '../Search/SearchResults.js';
import ArticlesRead from '../Article/ArticlesRead.js';
import DoctorMainScreen from '../Doctor/DoctorMainScreen.js';
import Chat from '../Inbox/Chat.js';
import Appointment from '../Doctor/Appointment.js';
import VideoCall from '../VideoCall/VideoCall.js';
import Notification from '../Profile/Settings/Notification.js';
import {FontFamily} from '../../config/GlobalStyles';
import Back from '../../assets/images/BACK.svg';
import EditProfile from '../Profile/EditProfile.js';
import Payment from '../Doctor/Payment.js';
import Success from '../Doctor/Success.js';
import {StackActions} from '@react-navigation/native';
const SearchStack = ({navigation}) => {
  const handleBack = () => {
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={Route.SEARCH}
      screenOptions={{
        headerShown: false,
        headerLeftLabelVisible: false,
      }}>
      <Stack.Screen name={Route.SEARCH} component={Search} />
      <Stack.Screen name={Route.SEARCH_INPUT} component={SearchInput} />
      <Stack.Screen name={Route.SEARCH_RESULT} component={SearchResults} />
      <Stack.Screen name={Route.PAYMENT} component={Payment} />
      <Stack.Screen
        name={Route.DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
        options={{
          title: 'Practitioner',
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity style={{padding: 10}} onPress={handleBack}>
                <Back />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen
        name={Route.CHAT}
        component={Chat}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 20,
          },
          headerLeft: () => {
            return (
              <TouchableOpacity style={{padding: 10}} onPress={handleBack}>
                <Back />
              </TouchableOpacity>
            );
          },
        }}
      />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
      <Stack.Screen name={Route.APPOINTMENT} component={Appointment} />
      <Stack.Screen name={Route.VIDEOCALL} component={VideoCall} />
      <Stack.Screen name={Route.EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={Route.NOTIFICATION} component={Notification} />
      <Stack.Screen name={Route.SUCCESS} component={Success} />
    </Stack.Navigator>
  );
};

export default SearchStack;
