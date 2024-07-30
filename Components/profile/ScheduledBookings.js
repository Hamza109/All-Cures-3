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

  const user = [
    {
      appointmentId: 'A001',
      userId: 'U001',
      userName: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+1234567890',
      appointmentDate: '2024-07-30T10:00:00Z',
      doctorName: 'Smith',
      consultationType: 'General Checkup',
      status: 'Confirmed',
      notes: 'First-time consultation, experiencing mild headaches',
    },
    {
      appointmentId: 'A002',
      userId: 'U002',
      userName: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+1234567891',
      appointmentDate: '2024-07-31T14:00:00Z',
      doctorName: 'Brown',
      consultationType: 'Dermatology',
      status: 'Pending',
      notes: 'Rash on left arm, itching',
    },
    {
      appointmentId: 'A003',
      userId: 'U003',
      userName: 'Robert Johnson',
      email: 'robert.johnson@example.com',
      phone: '+1234567892',
      appointmentDate: '2024-08-01T09:00:00Z',
      doctorName: 'Lee',
      consultationType: 'Cardiology',
      status: 'Confirmed',
      notes: 'Follow-up appointment, chest pain',
    },
    {
      appointmentId: 'A004',
      userId: 'U004',
      userName: 'Emily Davis',
      email: 'emily.davis@example.com',
      phone: '+1234567893',
      appointmentDate: '2024-08-02T11:00:00Z',
      doctorName: 'Taylor',
      consultationType: 'Pediatrics',
      status: 'Cancelled',
      notes: 'Consultation for 5-year-old child, recurring cough',
    },
    {
      appointmentId: 'A005',
      userId: 'U005',
      userName: 'Michael Brown',
      email: 'michael.brown@example.com',
      phone: '+1234567894',
      appointmentDate: '2024-08-03T16:00:00Z',
      doctorName: 'Wilson',
      consultationType: 'Orthopedics',
      status: 'Confirmed',
      notes: 'Knee pain, difficulty walking',
    },
  ];
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
    return (
      <UserBookingCard
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
      {user.length > 0 ? (
        <FlatList data={user} renderItem={renderItemUser} />
      ) : (
        <FlatList data={bookingData} renderItem={renderItem} />
      )}
    </View>
  );
};

export default ScheduledBookings;

const styles = StyleSheet.create({});
