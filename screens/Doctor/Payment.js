import React, {useEffect} from 'react';
import {BackHandler} from 'react-native';
import {WebView} from 'react-native-webview';
import {Route} from '../../routes';
const Payment = ({route, navigation}) => {
  const ccAvenueData = route.params.ccAvenueData;
  useEffect(() => {
    console.log('enckey', ccAvenueData);
  });
  useEffect(() => {
    const backAction = () => {
      // Navigate to the feed page
      navigation.navigate(Route.FEED_TAB, {screen: Route.FEED}); // Replace 'Feed' with the name of your feed page/screen
      return true; // Return true to indicate that the back button action is handled
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove(); // Remove the event listener on component unmount
  }, [navigation]);

  const handleResponseMessage = event => {
    const data = event.nativeEvent.data;
    console.log('Data received from WebView:', data);
    if (data) {
      navigation.navigate(Route.SUCCESS);
    }
  };

  return (
    <WebView
      source={{
        uri:
          'https://www.all-cures.com/paymentRedirection' +
          `?encRequest=${ccAvenueData}` +
          `&accessCode=AVWN42KL59BP42NWPB`,
      }}
      style={{flex: 1}}
      onMessage={event => handleResponseMessage(event)}
    />
  );
};

export default Payment;
