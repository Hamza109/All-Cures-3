import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Profile from '../Profile/Profile';
import Login from '../Profile/Login';
import About from '../Profile/Settings/About';
import Help from '../Profile/Settings/Help';

import Notification from '../Profile/Settings/Notification';
import SubmitArticle from '../Profile/Settings/SubmitArticle';
import TipOfTheDay from '../Profile/Settings/TipOfTheDay';
import EditProfile from '../Profile/EditProfile';
import Favourite from '../Profile/favourite';
import Inbox from '../Inbox/Inbox';
import ForgetPassword from '../Profile/ForgetPassword';
import Chat from '../Inbox/Chat';
const ProfileStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={Route.PROFILE} component={Profile} />
      <Stack.Screen name={Route.LOGIN} component={Login} />
      <Stack.Screen name={Route.ABOUT} component={About} />
      <Stack.Screen name={Route.HELP} component={Help} />
      <Stack.Screen name={Route.FAVOURITE} component={Favourite} />
      <Stack.Screen name={Route.EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={Route.INBOX} component={Inbox} />
      <Stack.Screen name={Route.FORGETPASSWORD} component={ForgetPassword} />
      <Stack.Screen name = {Route.CHAT} component={Chat}/>

      <Stack.Screen name={Route.NOTIFICATION} component={Notification} />
      <Stack.Screen name={Route.SUBMITARTICLE} component={SubmitArticle} />
      <Stack.Screen name={Route.TIPOFTHEDAY} component={TipOfTheDay} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
