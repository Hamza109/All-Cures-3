import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../apiConfig';
import ContentLoader from '../ContentLoader';
import {useSelector} from 'react-redux';
import BookingCard from '../BookingCard';
const ScheduledBookings = () => {
  const data = useSelector(state => state.booking.data);
  const bookingData = data.filter(i => {
    return i.status === 0;
  });
  const renderItem = ({item}) => {
    return (
      <BookingCard
        key={item.appointmentId} // Assuming appointmentId is unique
        docName={item.doctorName}
        date={item.appointmentDate}
        time={`${item.startTime} - ${item.endTime}`}
        status={item.status}
        userId={item.userID}
        requestStatus={item.requestStatus}
        medicineType={item.medicineType}
        imgLoc={item.imgLoc}
        onPress={() => handleCardPress(item.appointmentId)}
      />
    );
  };
  return (
    <View style={{backgroundColor: '#fff', flex: 1}}>
      <FlatList data={bookingData} renderItem={renderItem} />
    </View>
  );
};

export default ScheduledBookings;

const styles = StyleSheet.create({});
