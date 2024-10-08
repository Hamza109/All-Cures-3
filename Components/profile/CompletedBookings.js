import {StyleSheet, Text, View, FlatList} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import BookingCard from '../BookingCard';
import UserBookingCard from '../UserBookingCard';
const CompletedBookings = () => {
  const data = useSelector(state => state.booking.data);
  const bookingData = data.filter(i => {
    return i.status === 2;
  });
  const profile = useSelector(state => state.profile.data);
  const renderItem = ({item}) => {
    return (
      <BookingCard
        key={item.appointmentId} // Assuming appointmentId is unique
        docName={item.doctorName}
        date={item.appointmentDate}
        time={`${item.startTime} - ${item.endTime}`}
        status={item.status}
        userId={item.userID}
        paymentStatus={item.paymentStatus}
        medicineType={item.medicineType}
        imgLoc={item.imgLoc}
        onPress={() => handleCardPress(item.appointmentId)}
      />
    );
  };

  const renderItemUser = ({item}) => {
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
    <View style={{backgroundColor: '#fff'}}>
      {profile.docID === 0 ? (
        <FlatList data={data} renderItem={renderItem} />
      ) : (
        <FlatList data={bookingData} renderItem={renderItemUser} />
      )}
    </View>
  );
};

export default CompletedBookings;

const styles = StyleSheet.create({});
