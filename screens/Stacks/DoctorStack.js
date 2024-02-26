import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Doctor from '../Doctor/Doctor';
const DoctorStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={Route.DOCTOR} component={Doctor} />
    </Stack.Navigator>
  );
};

export default DoctorStack;
