import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';
const FeedStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.FEED} component={Feed} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
    </Stack.Navigator>
  );
};

export default FeedStack;
