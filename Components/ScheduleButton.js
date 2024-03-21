import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Color, FontFamily} from '../config/GlobalStyles';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../routes';
import {useSelector} from 'react-redux';
const ScheduleButton = ({docID}) => {
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  console.log('profile', profile);
  console.log(docID);
  return (
    <Pressable
      style={styles.button}
      onPress={() => {
        navigation.navigate(Route.APPOINTMENT, {
          docID: docID,
        });
      }}>
      <Text style={styles.buttonText}>SCHEDULE CONSULTATION</Text>
    </Pressable>
  );
};

export default ScheduleButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Color.appDefaultColor,
    padding: 12,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    color: '#fff',
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'center',
  },
});
