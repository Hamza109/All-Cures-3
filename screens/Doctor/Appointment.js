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
} from 'react-native';
import React, {useState, useEffect} from 'react';

import {Color, width} from '../../config/GlobalStyles';
import Divider from '../../Components/Divider';

const Appointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);

  const response = {
    completelyBookedDates: [],
    unbookedSlots: {
      '2024-03-06': ['10:30:00', '11:00:00'],
      '2024-03-07': ['10:00:00', '10:30:00', '11:00:00'],
    },
    totalDates: {
      '2024-03-06': ['10:00:00', '10:30:00', '11:00:00'],
      '2024-03-07': ['10:00:00', '10:30:00', '11:00:00'],
    },
  };

  useEffect(() => {
    const processData = () => {
      const slots = [];
      for (const date in response.unbookedSlots) {
        response.unbookedSlots[date].forEach(slot => {
          slots.push({date, slot});
        });
      }
      setAvailableSlots(slots);
    };

    processData();
  }, []);

  const renderDate = ({item}) => (
    <TouchableOpacity
      onPress={() => setSelectedDate(item)}
      style={styles.dateContainer}>
      <Text style={styles.dateText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderSlots = () => {
    const slotsForDate = availableSlots.filter(
      item => item.date === selectedDate,
    );

    return (
      <View style={styles.slotsContainer}>
        {slotsForDate.map(item => (
          <View key={item.slot} style={styles.slot}>
            <Text style={styles.slotText}>{item.slot}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={{backgroundColor: '#fff', flex: 1}}>
      {console.log(availableSlots)}
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
      <View>
        <FlatList
          data={Object.keys(response.unbookedSlots)}
          renderItem={renderDate}
          keyExtractor={item => item}
          horizontal // Make the FlatList horizontal
          showsHorizontalScrollIndicator={false} // Optionally hide scroll indicator
        />
      </View>
      {selectedDate && (
        <View style={{alignItems: 'center', padding: 5, marginTop: 10}}>
          <Text
            style={{
              fontSize: 18,
              color: Color.colorDarkslategray,
              fontWeight: '500',
            }}>
            Slots for {selectedDate}
          </Text>
        </View>
      )}
      <Divider />

      {selectedDate && renderSlots()}
    </SafeAreaView>
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
    padding: 15,
    margin: 10,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
    borderRadius: 2,
    backgroundColor: Color.lightpurple,
  },
  dateText: {
    fontSize: 16,
  },
  slotsContainer: {
    flexDirection: 'row', // Arrange slots horizontally
    flexWrap: 'wrap', // Wrap slots to multiple lines if needed
    padding: 10,
    marginTop: 15,
  },
  slot: {
    backgroundColor: Color.lightpurple,
    margin: 5,
    padding: 10,
    borderRadius: 5,
    borderColor: Color.appDefaultColor,
  },
  slotText: {
    fontSize: 15,
  },
});
