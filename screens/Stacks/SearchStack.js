import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Search from '../Search/Search.js';
const SearchStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Screen name={Route.SEARCH} component={Search} />
    </Stack.Navigator>
  );
};

export default SearchStack;
