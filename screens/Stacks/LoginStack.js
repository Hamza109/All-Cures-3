import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Login from '../Profile/Login';
import SignUp from '../Profile/SignUp';

const LoginStack = () => {
    const Stack=createStackNavigator()
  return (
   <Stack.Navigator
   initialRouteName={Route.LOGIN}
   screenOptions={{
    headerShown: false,
  }}
   >
    <Stack.Screen name={Route.LOGIN} component={Login} />
<Stack.Screen name={Route.SIGNUP} component={SignUp} />
   </Stack.Navigator>
  )
}

export default LoginStack