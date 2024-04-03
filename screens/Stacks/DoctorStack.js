import React from 'react';
import {TouchableOpacity} from 'react-native';
import Back from '../../assets/images/BACK.svg';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Doctor from '../Doctor/Doctor';
import DoctorMainScreen from '../Doctor/DoctorMainScreen';
import ArticlesRead from '../Article/ArticlesRead';
import Appointment from '../Doctor/Appointment';
import EditProfile from '../Profile/EditProfile';
import DocCures from '../Doctor/DocCures';
import Chat from '../Inbox/Chat';
import {FontFamily} from '../../config/GlobalStyles';
import Notification from '../Profile/Settings/Notification';

const DoctorStack = ({navigation}) => {
  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={Route.DOCTOR}
      screenOptions={{
        headerShown: false,
        headerLeftLabelVisible:false,
        
     
      }}>
      <Stack.Screen name={Route.DOCTOR} component={Doctor} />
      <Stack.Screen
        name={Route.DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
        options={{
          title: 'Practitioners',
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
      <Stack.Screen name={Route.APPOINTMENT} component={Appointment} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
      <Stack.Screen
        name={Route.DOC_CURES}
        component={DocCures}
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
      <Stack.Screen name={Route.CHAT} component={Chat}  options={{
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
        }} />
      <Stack.Screen name = {Route.NOTIFICATION} component={Notification}/>

      <Stack.Screen name={Route.EDITPROFILE} component={EditProfile} />
    </Stack.Navigator>
  );
};

export default DoctorStack;
