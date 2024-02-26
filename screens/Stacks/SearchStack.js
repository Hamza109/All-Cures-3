
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { Route } from '../../routes'
import Search from '../Search/Search'
const SearchStack = () => {
    const Stack = createStackNavigator()
  return (
    <Stack.Navigator 
    screenOptions={{
      headerShown:false
    }}
    >
   <Stack.Screen  name={Route.SEARCH} component={Search} />
   </Stack.Navigator>
  )
}

export default SearchStack