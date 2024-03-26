
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './screens/Tab/BottomTab';
import {Provider} from 'react-redux';
import RootStack from './screens/Stacks/RootStack';
import {store} from './Redux/Store';
import {NativeBaseProvider} from 'native-base';
import messaging from '@react-native-firebase/messaging';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import PushNotification from 'react-native-push-notification';
import {backendHost} from './Components/apiConfig';
const App = () => {
  const checkApplicationPermission = async () => {
    if (Platform.OS == 'android') {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATION,
        );
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Request permission for push notifications
  const requestPermission = async () => {
    try {
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status:', authStatus);
        // Permission granted, continue with token retrieval
        getToken();
      } else {
        console.log('Authorization status:', authStatus);
        // Permission denied
      }
    } catch (error) {
      console.error('Error requesting permission:', error);
    }
  };

  // Get token for push notifications
  const getToken = async () => {
    try {
      const token = await messaging().getToken();
      console.log('Push notification token:', token);
      const response = await fetch(
        `${backendHost}/notification/token/"${token}"`,
        {
          method: 'POST',
        },
      );
      if (response.ok) {
        const responseData = await response.json();
        console.log('Token registration successful:', responseData);
      } else {
        console.error(
          'Token registration failed:',
          response.status,
          response.statusText,
        );
        // Handle error, e.g., display an error message to the user
      }
      console.log('token generated', response.json());
      console.log('FCM', token);
      // Send the token to your server for further processing if needed.

      // Handle token (send to server, save locally, etc.)
    } catch (error) {
      console.error('Error getting token:', error);
    }
  };

  const configPush = () => {
    if (Platform.OS == 'ios') {
      PushNotification.getApplicationIconBadgeNumber(number => {
        if (number > 0) {
          PushNotification.setApplicationIconBadgeNumber(0);
        }
      });
    }

    PushNotification.createChannel(
      {
        channelId: 'channel_id_ALL_CURES', // (required)
        channelName: 'channel_ALL_CURES', // (required)
        channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
        playSound: true, // (optional) default: true
        soundName: 'default', // (optional) See `soundName` parameter of `localNotification` function
        // importance: 4, // (optional) default: 4. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
      },
      created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
    );

    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (deviceToken) {
        console.log(deviceToken);
      },

      // (required) Called when a remote is received or opened, or local notification is opened
      onNotification: function (notification) {
        //  tiPValue(true)
        // process the notification
        PushNotification.localNotification({
          channelId: 'channel_id_ALL_CURES',
          title: notification.title,
          message: notification.message,
        });
        if (notification.foreground) {
          PushNotification.localNotification({
            channelId: 'channel_id_ALL_CURES',
            title: notification.title,
            message: notification.message,
          });
        }
        // (required) Called when a remote is received or opened, or local notification is opened
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
      onAction: function (notification) {
        console.log('ACTION:', notification.action);
        console.log('NOTIFICATION:', notification);

        // process the action
      },

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: function (err) {
        console.error(err.message, err);
      },

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       * - if you are not using remote notification or do not have Firebase installed, use this:
       *     requestPermissions: Platform.OS === 'ios'
       */
      requestPermissions: true,
    });
  };

  // Call requestPermission when the component mounts
  useEffect(() => {
    messaging().registerDeviceForRemoteMessages();
    checkApplicationPermission();
    requestPermission();
  }, []);

  useEffect(() => {
    configPush();
  });

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <RootStack />
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
