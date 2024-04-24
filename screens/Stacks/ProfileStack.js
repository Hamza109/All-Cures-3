import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Route} from '../../routes';
import Profile from '../Profile/Profile';
import Login from '../Profile/Login';
import About from '../Profile/Settings/About';
import Help from '../Profile/Settings/Help';
import Back from '../../assets/images/BACK.svg';
import Notification from '../Profile/Settings/Notification';
import SubmitArticle from '../Profile/Settings/SubmitArticle';
import {TouchableOpacity} from 'react-native';
import EditProfile from '../Profile/EditProfile';
import Favourite from '../Profile/favourite';
import Inbox from '../Inbox/Inbox';
import ForgetPassword from '../Profile/ForgetPassword';
import Chat from '../Inbox/Chat';
import MyCures from '../Profile/Settings/MyCures';
import {FontFamily} from '../../config/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import ResetPassword from '../Profile/ResetPassword';
import ArticlesRead from '../Article/ArticlesRead';
import MyBookings from '../Profile/Settings/MyBookings';
const ProfileStack = () => {
  const navigation = useNavigation();
  const handleBack = () => {
    console.log('back');
    navigation.pop();
  };
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        headerLeftLabelVisible: false,
      }}>
      <Stack.Screen name={Route.PROFILE} component={Profile} />
      <Stack.Screen name={Route.LOGIN} component={Login} />
      <Stack.Screen name={Route.ABOUT} component={About} />
      <Stack.Screen name={Route.HELP} component={Help} />
      <Stack.Screen name={Route.FAVOURITE} component={Favourite} />
      <Stack.Screen name={Route.EDITPROFILE} component={EditProfile} />
      <Stack.Screen name={Route.INBOX} component={Inbox} />
      <Stack.Screen name={Route.FORGETPASSWORD} component={ForgetPassword} />
      <Stack.Screen
        name={Route.CHAT}
        component={Chat}
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontFamily: FontFamily.poppinsBold,
            fontSize: 20,
          },
        }}
      />
      <Stack.Screen name={Route.MYCURES} component={MyCures} />
      <Stack.Screen name={Route.MYBOOKINGS} component={MyBookings} />

      <Stack.Screen name={Route.NOTIFICATION} component={Notification} />
      <Stack.Screen name={Route.RESETPASSWORD} component={ResetPassword} />
      <Stack.Screen name={Route.SUBMITARTICLE} component={SubmitArticle} />
      <Stack.Screen name={Route.ARTICLES_READ} component={ArticlesRead} />
    </Stack.Navigator>
  );
};

export default ProfileStack;
