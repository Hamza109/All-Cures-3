import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {backendHost} from '../apiConfig';
import ContentLoader from '../ContentLoader';
import {useSelector} from 'react-redux';
import BookingCard from '../BookingCard';
import UserBookingCard from '../UserBookingCard';

const ScheduledBookings = () => {
  const data = useSelector(state => state.booking.data);
  const bookingData = data.filter(i => {
    return i.status === 0;
  });
  const profile = useSelector(state => state.profile.data);
  console.log('profile', profile.docID);

  const handleCardPress = appointmentId => {
    // Define what happens when a card is pressed
  };

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

  const renderItemUser = ({item}) => {
    console.log(item);

    return (
      <UserBookingCard
        key={item.appointmentId} // Assuming appointmentId is unique
        docName={item.userName}
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
      {profile.docID === 0 ? (
        <FlatList data={bookingData} renderItem={renderItem} />
      ) : (
        <FlatList data={bookingData} renderItem={renderItemUser} />
      )}
    </View>
  );
};

export default ScheduledBookings;

const styles = StyleSheet.create({});
