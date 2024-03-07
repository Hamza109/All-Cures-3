import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Doctor from '../Doctor/Doctor';
import DoctorMainScreen from '../Doctor/DoctorMainScreen';
import ArticlesRead from '../Article/ArticlesRead';
import Appointment from '../Doctor/Appointment';
const DoctorStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.DOCTOR} component={Doctor} />
      <Stack.Screen
        name={Route.DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
      />
      <Stack.Screen name={Route.APPOINTMENT} component={Appointment} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
    </Stack.Navigator>
  );
};

export default DoctorStack;
