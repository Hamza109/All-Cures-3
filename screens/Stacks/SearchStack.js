import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Search from '../Search/Search.js';
import SearchInput from '../Search/SearchInput.js';
import SearchResults from '../Search/SearchResults.js';
const SearchStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
    initialRouteName={Route.SEARCH}
      screenOptions={{
        
        headerShown: false,
        
        
      }}>
      <Stack.Screen name={Route.SEARCH} component={Search} />
      <Stack.Screen name={Route.SEARCH_INPUT} component={SearchInput} />
      <Stack.Screen name={Route.SEARCH_RESULT} component={SearchResults} />
    </Stack.Navigator>
  );
};

export default SearchStack;
