import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Feed from '../Feed/Feed';
import ArticlesRead from '../Article/ArticlesRead';
import { FontFamily } from '../../config/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import ArticlesByMedicine from '../Article/ArticlesByMedicine';
import Back from '../../assets/images/BACK.svg';
const FeedStack = () => {
  const handleBack = () => {
    console.log('back');
    navigation.goBack();
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.FEED} component={Feed} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
      <Stack.Screen
          name={Route.ARTICLES_BY_MEDICINE}
          component={ArticlesByMedicine}
          options={{
            headerShown: true,

            headerTitleAlign: 'center',
            headerTitleStyle: {
              fontFamily: FontFamily.poppinsBold, // Replace with your custom font
              fontSize: 18, // Adjust the font size as needed
            },
            headerLeft: () => {
              return (
                <TouchableOpacity style={{padding: 10}} onPress={handleBack}>
                  <Back />
                </TouchableOpacity>
              );
            },
          }}/>
    </Stack.Navigator>
  );
};

export default FeedStack;
