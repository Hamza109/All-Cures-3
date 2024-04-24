import React from 'react';
import {View, Text, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../routes';

const Success = () => {
  const navigation = useNavigation();
  return (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#fff',
      }}>
      <LottieView
        source={require('../../assets/animations/paymentSuccess.json')}
        style={{width: width, height: 300}}
        autoPlay={true}
        loop={false}
      />
      <Text
        style={{
          fontSize: 16,
          color: Color.appDefaultColor,
          fontFamily: FontFamily.poppinsBold,
        }}>
        Payment successful
      </Text>
      <Pressable
        onPress={() => {
          navigation.navigate(Route.PROFILE_TAB, {screen: Route.MYBOOKINGS});
        }}
        style={{marginTop:50}}
        >
        <Text style={{fontSize:11}}>Check Your bookings</Text>
      </Pressable>
      <Pressable>
        <Text></Text>
      </Pressable>
    </View>
  );
};

export default Success;
