import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import CalendarPicker from "react-native-calendar-picker";
const Appointment = () => {
  return (
    <View>
      <Text>Appointment</Text>
      <CalendarPicker onDateChange={()=>{
        console.log("Date Changes");
      }} />
    </View>
  );
};

export default Appointment;

const styles = StyleSheet.create({});
