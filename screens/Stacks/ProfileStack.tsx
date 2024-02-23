
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Route } from '../../routes'
import Profile from '../Profile/Profile';
const ProfileStack = () => {
    const Stack = createStackNavigator()
  return (
   <Stack.Navigator>
   <Stack.Screen  name={Route.PROFILE} component={Profile} />
   </Stack.Navigator>
  )
}

export default ProfileStack