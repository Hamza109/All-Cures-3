import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import {Color, FontFamily, width} from '../config/GlobalStyles';
import {imageHost} from './apiConfig';
import {User} from './profile/UserPic';
const cardItemHeight = 136;
const BookingCard = ({
  docName,
  date,
  time,
  status,
  requestStatus,
  imgLoc,
  medicineType,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.detailsView}>
        <View style={styles.infoRow}>
          {/* <Text style={styles.infoTitle}>Doctor:</Text> */}
          <Text style={styles.article_title}>Dr .{docName}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.title}>{medicineType}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Booking Date:</Text>
          <Text style={styles.infoText}>{date}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Booking Time:</Text>
          <Text style={styles.infoText}>{time}</Text>
        </View>
        {/* <View style={styles.statusContainer}>
          <Text style={[styles.statusText]}>Status: {requestStatus}</Text>
        </View> */}
      </View>
      <View>
        <View style={{width: 100, height: 100, backgroundColor: '#fff'}}>
          {imgLoc ? (
            <Image
              style={styles.image}
              source={{
                uri: `${imageHost}${imgLoc}`,
              }}
            />
          ) : (
            <View
              style={{
                backgroundColor: '#fff',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <User />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',

    width: width,
    backgroundColor: '#fff',
    height: cardItemHeight,
    paddingHorizontal: 26,

    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
    justifyContent: 'space-around',
    alignItems: 'center',

    // shadowColor: Color.appDefaultColor, // Add shadow for a card-like effect
    // shadowOffset: {
    //   width: 0,
    //   height: 2
    // },
    // shadowOpacity: 0.23,
    // shadowRadius: 2.62,
    // elevation: 4
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  infoTitle: {
    fontWeight: 'bold',
    color: Color.colorDarkslategray,
    fontSize: 11,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 11,
    alignSelf:'center'
  },
  statusContainer: {
    marginTop: 10,
    alignItems: 'center',
  },
  statusText: {
    padding: 8,
    borderRadius: 5,
  },
  statusStyles: {
    Scheduled: {backgroundColor: '#f0f0f0'}, // Example - gray background
    Confirmed: {backgroundColor: '#d9f5bc'}, // Example - light green background
    // Add styling for other statuses
  },
  detailsView: {
    justifyContent: 'space-between',
  },
  title: {
    width: width * 0.55,
    fontSize: 16,
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 22.5,
    color: Color.colorDarkslategray,
    fontWeight: '700',
  },
  article_title: {
    width: width * 0.5,
    fontSize: 10,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    fontWeight: '400',
  },
  time: {
    fontSize: 9,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: '700',
  },
});

export default BookingCard;
