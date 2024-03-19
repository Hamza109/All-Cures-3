import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Search from '../Search/Search.js';
import SearchInput from '../Search/SearchInput.js';
import SearchResults from '../Search/SearchResults.js';
import ArticlesRead from '../Article/ArticlesRead.js';
import DoctorMainScreen from '../Doctor/DoctorMainScreen.js';
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
      <Stack.Screen
        name={Route.DOCTOR_MAIN_SCREEN}
        component={DoctorMainScreen}
      />
       <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
    </Stack.Navigator>
  );
};

export default SearchStack;
