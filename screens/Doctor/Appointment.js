/* eslint-disable react-native/no-inline-styles */
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Alert,
  FlatList,
  TouchableOpacity,
  Pressable,
  BackHandler,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import Divider from '../../Components/Divider';
import {backendHost} from '../../Components/apiConfig';
import ContentLoader from '../../Components/ContentLoader';
import moment from 'moment';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../../routes';
import {useSelector} from 'react-redux';
import axios from 'axios';

import {StackActions} from '@react-navigation/native';
const Appointment = ({route, navigation}) => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toLocaleDateString('en-CA'),
  );
  const [unbookedSlots, setUnBookedSlots] = useState();
  const [isloaded, setIsLoaded] = useState(true);
  const [timeSlot, setTimeSlot] = useState();

  const profile = useSelector(state => state.profile.data);
  const userId = profile.registration_id;

  const [id, setId] = useState(route.params.docID);
  console.log('DocID Appoint', id);

  useEffect(() => {
    const backAction = () => {
      navigation.dispatch(StackActions.pop(1));
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);
  const handleBookAppointment = async () => {
    try {
      const payload = {
        docID: id,
        userID: parseInt(userId, 10),
        appointmentDate: selectedDate,
        startTime: timeSlot.slot,
        paymentStatus: 0,
        amount: '1.00',
        currency: 'INR',
      };

      // Log the payload for debugging
      console.log('Payload:', payload);

      const response = await axios.post(
        `${backendHost}/appointments/create`,
        payload,
      );

      const enc = response.data;

      console.log('API Response:', enc);

      if (enc.Count == 0) {
        // Navigate to success if Count is 0
        navigation.navigate(Route.SUCCESS);
      } else if (enc.Count == 1) {
        // Navigate to payment with encRequest data
        navigation.navigate(Route.PAYMENT, {
          ccAvenueData: enc.encRequest,
        });
      } else {
        console.error('Unexpected response:', enc);
        Alert.alert('Error', 'Something went wrong. Please try again.');
      }
    } catch (error) {
      // Log the error for debugging
      console.error('Error booking appointment:', error);

      // Show an alert with a user-friendly error message
      Alert.alert(
        'Booking Failed',
        'An error occurred while booking your appointment. Please try again later.',
      );
    }
  };

  const getDayName = dateString => {
    const date = new Date(dateString);
    const options = {weekday: 'long'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const data = await fetch(`${backendHost}/appointments/get/Slots/${id}`);
        if (!data.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await data.json();
        console.log('responseData', responseData);

        setUnBookedSlots(responseData);

        const slots = [];
        for (const date in responseData.unbookedSlots) {
          responseData.unbookedSlots[date].forEach(slot => {
            slots.push({date, slot});
          });
        }
        setAvailableSlots(slots);
      } catch (error) {
        console.error('Error fetching slots:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    fetchData();
  }, [ ]);

  const confirmationMessage = () => {
    Alert.alert(
      'Confirm Appointment',
      `You have scheduled appointment on ${selectedDate} at ${moment(
        timeSlot.slot,
        'HH:mm:ss',
      ).format('hh:mm a')}`,
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel', // Bold, blue  text
        },
        {
          text: 'OK',
          onPress: () => handlePress(),
          style: 'destructive', // Red text (iOS only)
        },
      ],
    );
  };

  const handlePress = async () => {
    const appointmentData = {
      docID: id, //change it to docID
      userID: userId, // change it to original YserID
      appointmentDate: selectedDate,
      startTime: timeSlot.slot,

      paymentStatus: 0,
    };

    try {
      setIsLoaded(false);
      const response = await fetch(`${backendHost}/appointments/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(appointmentData),
      });

      const responseData = await response.json(); // Assuming API returns JSON response

      if (responseData === 1) {
        // Appointment creation successful
        setIsLoaded(true);
        console.log('Appointment created successfully!');
        Alert.alert('Appointment created successfully!');
        navigation.goBack();

        // ... any further actions after success
      } else {
        // Appointment creation failed
        console.error('Appointment creation failed:');
        setIsLoaded(true);
        Alert.alert('Error Creating Appointment'); // Log any detailed error message from the server
        // ... handle failure
      }
    } catch (error) {
      console.error('Error creating appointment:', error);
      // ... handle network or fetch errors
    }
  };
  const renderDate = ({item, index}) => (
    <TouchableOpacity
      onPress={() => setSelectedDate(item)}
      style={[
        styles.dateContainer,
        selectedDate === item && styles.selectedDate,
      ]}>
      <Text
        style={[
          styles.dateText,
          selectedDate === item && styles.selectedDateText,
        ]}>
        {item}
      </Text>
      <Text
        style={[
          styles.dayText,
          selectedDate === item && styles.selectedDateText,
        ]}>
        {getDayName(item)}
      </Text>
    </TouchableOpacity>
  );

  const renderSlots = () => {
    const now = new Date();
    const currentTime = now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });

    const today = new Date().toLocaleDateString('en-CA');

    const slotsForDate = availableSlots.filter(
      item =>
        item.date === selectedDate &&
        (selectedDate === today ? item.slot > currentTime : true),
    );

    return (
      <View style={styles.slotsContainer}>
        {slotsForDate.map(item => (
          <Pressable
            key={item.slot}
            style={[styles.slot, timeSlot === item && styles.selectedTime]}
            onPress={() => {
              setTimeSlot(item);
            }}>
            {console.log('temSlot1 item', item)}

            <Text style={styles.slotText}>
              {moment(item.slot, 'HH:mm:ss').format('hh:mm a')}
            </Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <>
      {isloaded ? (
        <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
          <View style={styles.feedHeader}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 36,
                marginLeft: 5,
              }}>
              <Text style={styles.read}>Schedule an Appointment</Text>
            </View>
          </View>
          {unbookedSlots ? (
            <View>
              <Text style={styles.title}>Select Date of Appointment</Text>
              <Divider />
              <FlatList
                data={Object.keys(unbookedSlots.unbookedSlots)}
                renderItem={renderDate}
                keyExtractor={item => item}
                horizontal // Make the FlatList horizontal
                showsHorizontalScrollIndicator={false} // Optionally hide scroll indicator
              />
            </View>
          ) : null}
          {selectedDate && (
            <View style={{alignItems: 'center', padding: 5, marginTop: 10}}>
              <Text style={styles.title}>Slots for {selectedDate}</Text>
            </View>
          )}
          <Divider />
          {/* <Text style={styles.title}>
            Consultation Fee :{unbookedSlots.amount}
          </Text> */}

          {selectedDate && renderSlots()}
          {timeSlot ? (
            <Pressable
              style={{
                backgroundColor: Color.appDefaultColor,
                width: 180,
                alignSelf: 'center',
                height: 50,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 18,
                marginTop: 40,
              }}
              onPress={handleBookAppointment}>
              <Text
                style={{
                  fontWeight: '500',
                  color: '#fff',
                  padding: 5,
                  fontSize: 15,
                }}>
                Book Appointment
              </Text>
            </Pressable>
          ) : null}
          <View
            style={{
              backgroundColor: '',
              alignItems: 'center',
              display: 'flex',
              justifyContent: 'flex-end',
              flex: 1,
            }}>
            <LottieView
              source={require('../../assets/animations/doc.json')}
              style={{width: width, height: 100}}
              autoPlay={true}
              loop={false}
            />
          </View>
        </SafeAreaView>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default Appointment;

const styles = StyleSheet.create({
  Appointment: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  title: {
    fontSize: 18,
    color: Color.colorDarkslategray,
    fontWeight: '500',
    textAlign: 'center',
  },
  feedHeader: {
    height: 100,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },

  container: {
    flex: 1,
  },
  dateContainer: {
    padding: 8,
    margin: 10,
    borderWidth: 2,
    borderColor: Color.appDefaultColor,
    borderRadius: 10,
  },
  dateText: {
    fontSize: 14,
    color: Color.colorDarkslategray,
    textAlign: 'center',
    fontFamily: FontFamily.poppinsBold,
  },
  slotsContainer: {
    flexDirection: 'row', // Arrange slots horizontally
    flexWrap: 'wrap', // Wrap slots to multiple lines if needed
    padding: 10,
    marginTop: 15,
  },
  slot: {
    backgroundColor: Color.lightpurple,
    marginHorizontal: 2,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
    borderColor: Color.appDefaultColor,
  },
  slotText: {
    fontSize: 15,
    color: Color.colorDarkslategray,
  },
  selectedDate: {
    backgroundColor: Color.appDefaultColor,
    color: '#fff',
  },
  dayText: {
    color: Color.colorDarkslategray,
    textAlign: 'center',
    fontSize: 10,
  },
  selectedTime: {
    borderWidth: 2,
    borderColor: Color.appDefaultColor,
  },
  selectedDateText: {
    color: '#fff',
  },
});
