import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Button,
  Modal,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import CalendarPicker from 'react-native-calendar-picker';

import {Color} from '../../config/GlobalStyles';

const Appointment = () => {
  const [selectedDate, setSelectedDate] = useState(null); // Store selected date
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);

  const onDateChange = date => {
    setSelectedDate(date);
  };

  const showMode = currentMode => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode('date');
  };

  const showTimepicker = () => {
    showMode('time');
  };

  // Calculate max date consistently
  const calculateMaxDate = () => {
    const today = new Date();
    today.setDate(today.getDate() + 30);
    return today;
  };
  const maxDate = calculateMaxDate();

  return (
    <SafeAreaView>
      <View style={styles.Appointment}>
        <Button
          onPress={showDatepicker}
          title="Select Date"
          color={Color.appDefaultColor}
        />
        <Button
          onPress={showTimepicker}
          title="Select Time"
          color={Color.appDefaultColor}
        />
      </View>
      <Text>
        Selected: {selectedDate ? selectedDate.toLocaleString() : 'None'}
      </Text>

      <Modal
        animationType="slide"
        transparent={true}
        visible={show}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setShow(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <CalendarPicker
              onDateChange={onDateChange}
              minDate={new Date()} // Min date set to today
              maxDate={maxDate}
              selectedDayColor={Color.appDefaultColor}
              todayBackgroundColor="#e6ffe6"
            />
          </View>
        </View>
      </Modal>
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
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
