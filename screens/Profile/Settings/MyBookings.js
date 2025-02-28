import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import HeaderComponent from '../../../Components/HeaderComponent';
import {backendHost} from '../../../Components/apiConfig';
import ContentLoader from '../../../Components/ContentLoader';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import ScheduledBookings from '../../../Components/profile/ScheduledBookings';
import CompletedBookings from '../../../Components/profile/CompletedBookings';
import {Color, FontFamily} from '../../../config/GlobalStyles';
import {useDispatch, useSelector} from 'react-redux';
import {bookingData} from '../../../Redux/Slice/BookingSlice';
const Tab = createMaterialTopTabNavigator();
const MyBookings = () => {
  const [data, setData] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const dispatch = useDispatch();
  const profile = useSelector(state => state.profile.data);


  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoaded(false);
        let response;
        if (profile.docID === 0) {
          response = await fetch(
            `${backendHost}/appointments/get/user/${profile.registration_id}`
          );
        } else {
          response = await fetch(
            `${backendHost}/appointments/get/${profile.docID}`
          );
        }
        //change 87 to registration ID
        // if (!response.ok) {
        //   return;
        // }
        const json = await response.json();
        setData(json);
        console.log(json);
        dispatch(bookingData(json));
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoaded(true);
      }
    };
    fetchData();
  }, [profile.docID]);
  return (
    <View style={styles.container}>
      <HeaderComponent title={'My bookings'} />
      {isLoaded ? (
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: {
              fontSize: 12,
              fontFamily: FontFamily.poppinsRegular,
              fontWeight: '600',
            },
            tabBarIndicatorStyle: {
              backgroundColor: Color.appDefaultColor,
              height: 2,
            },
          }}>
          <Tab.Screen name="Scheduled Bookings" component={ScheduledBookings} />
          <Tab.Screen name="Completed Bookings" component={CompletedBookings} />
        </Tab.Navigator>
      ) : (
        <ContentLoader />
      )}
    </View>
  );
};

export default MyBookings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
