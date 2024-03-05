import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Appointment from '../Doctor/Appointment';
import {useSelector} from 'react-redux';
import UserProfile from '../../Components/profile/UserProfile';
import Divider from '../../Components/Divider';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import Right from '../../assets/images/RIGHT.svg';
import DoctorProfile from '../../Components/profile/DoctorProfile';
import NotificationIcon from '../../assets/images/Notification.svg';
import { Route } from '../../routes';
const Profile = ({navigation}) => {
  const profileData = useSelector(state => state.profile.data);
  console.log(profileData);
  const profileOptionsData = [
    {title: 'SignIn',route:Route.LOGIN},
    {title: 'Tip of the Day',route:Route.NOTIFICATION},
    {title: 'About us',route:Route.ABOUT},
    {title: 'Submit Articles',route:Route.SUBMITARTICLE},
    
    {title: 'Help',route:Route.HELP},
    {title: 'Logout',route:Route.LOGOUT},
  ];
  return (
    <View style={styles.container}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Account</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>
      {profileData.docID == 0 ? (
        <UserProfile />
      ) : (
        <DoctorProfile docID={profileData.docID} />
      )}

      <Text style={styles.setting}>Settings</Text>
      <View style={{marginHorizontal: 10}}>
        {/* Commented out section; not relevant to map function focus */}

        {profileOptionsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              navigation.navigate(item.route);
            }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Right width={7.5} height={15} />
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  setting: {
    fontSize: 25,
    color: Color.colorDarkslategray,
    // lineHeight:17,
    fontWeight: '600',
    margin: 10,
  },
  titleView: {
    height: 57,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
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
});
