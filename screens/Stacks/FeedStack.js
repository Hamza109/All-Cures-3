import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import {FontFamily} from '../../config/GlobalStyles';
import {TouchableOpacity} from 'react-native';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';
import Back from '../../assets/images/BACK.svg';
import Notification from '../Profile/Settings/Notification';
import VideoCall from '../VideoCall/VideoCall';
import Success from '../Doctor/Success';
import Appointment from '../Doctor/Appointment';
import DoctorMainScreen from '../Doctor/DoctorMainScreen';
import Payment from '../Doctor/Payment';
const FeedStack = ({navigation}) => {
  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerLeftLabelVisible: false,
      }}>
      <Stack.Screen name={Route.FEED} component={Feed} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
      <Stack.Screen
        name={Route.NOTIFICATION}
        component={Notification}
        options={{headerShown: true, title: ''}}
      />
      <Stack.Screen name={Route.VIDEOCALL} component={VideoCall} />
      <Stack.Screen
        name={Route.ARTICLES_BY_MEDICINE}
        component={ArticlesByMedicine}
        options={{
          headerShown: true,

          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold, // Replace with your custom font
            fontSize: 20, // Adjust the font size as needed
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
              <TouchableOpacity
                style={{padding: 10}}
                onPress={() => handleBack()}>
                <Back />
              </TouchableOpacity>
            );
          },
        }}/>
      <Stack.Screen name={Route.APPOINTMENT} component={Appointment} />
      <Stack.Screen name={Route.PAYMENT} component={Payment} />
      <Stack.Screen name={Route.SUCCESS}  component={Success} />
    </Stack.Navigator>
  );
};

export default FeedStack;
