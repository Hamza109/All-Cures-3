import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Route } from '../../routes'
import Feed from '../Feed/Feed'
const FeedStack = () => {
    const Stack = createStackNavigator()
  return (
   <Stack.Navigator>
   <Stack.Screen  name={Route.FEED} component={Feed} />
   </Stack.Navigator>
  )
}

export default FeedStack