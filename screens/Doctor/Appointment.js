import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Modal,
  Alert,
  FlatList,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import LottieView from 'lottie-react-native';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import Divider from '../../Components/Divider';
import {backendHost} from '../../Components/apiConfig';
import ContentLoader from '../../Components/ContentLoader';
import moment from 'moment';
import { useNavigation } from '@react-navigation/native';
import { Route } from '../../routes';

const Appointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [unbookedSlots, setUnBookedSlots] = useState();
  const [isloaded, setIsLoaded] = useState(true);
  const [timeSlot, setTimeSlot] = useState();
  const navigation = useNavigation()

  const getDayName = dateString => {
    const date = new Date(dateString);
    const options = {weekday: 'long'};
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };
  useEffect(() => {
    const fetchData = async () => {
      setIsLoaded(false);
      try {
        const data = await fetch(`${backendHost}/appointments/get/Slots/1`);
        if (!data.ok) {
          throw new Error('Network response was not ok');
        }
        const responseData = await data.json();
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
  }, []);

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
      docID: 1, //change it to docID
      userID: 84, // change it to original YserID
      appointmentDate: selectedDate,
      startTime: timeSlot.slot,

      paymentStatus: 0,
    };
    console.log('appointment', appointmentData);

    try {
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
        console.log('Appointment created successfully!');
        Alert.alert("Appointment created successfully!")
        navigation.goBack()
      

        // ... any further actions after success
      } else {
        // Appointment creation failed
        console.error('Appointment creation failed:'); // Log any detailed error message from the server
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
    const slotsForDate = availableSlots.filter(
      item => item.date === selectedDate,
    );
    console.log('slots', slotsForDate);

    return (
      <View style={styles.slotsContainer}>
        {slotsForDate.map(item => (
          <Pressable
            key={item.slot}
            style={[styles.slot, timeSlot === item && styles.selectedTime]}
            onPress={() => {
              setTimeSlot(item);
              console.log('temSlot1', item.slot);
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
              onPress={confirmationMessage}>
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
    padding: 10,
    margin: 10,
    borderWidth: 2,
    borderColor: Color.appDefaultColor,
    borderRadius: 2,
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
