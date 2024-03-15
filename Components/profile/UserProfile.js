import {StyleSheet, Text, View, StatusBar} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {Color, FontFamily} from '../../config/GlobalStyles';
import {User} from './UserPic';
const UserProfile = () => {
  const profileData = useSelector(state => state.profile.data);
  return (
    <View style= {{}}>
      <StatusBar
       
        barStyle="light-content"
      />
      <View style={styles.profileHeader}>
        <User
          style={{
            borderRadius: 10,
          }}
        />
        <View>
          <Text style={styles.profileName}>
            {profileData.first_name} {profileData.last_name}
          </Text>
          <Text style={styles.infoText}>{profileData.email_address}</Text>
        </View>
      </View>
      {/* <Divider /> */}
    </View>
  );
};

export default UserProfile;

const styles = StyleSheet.create({
  profileHeader: {
    flexDirection: 'row',

    alignItems: 'center',
    padding: 15,
  },

  profileName: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 25,
    marginLeft: 14,
    marginTop: -10,
    fontWeight:'500',
    letterSpacing:1
  },
  headerTitle: {
    marginLeft: 12,
    padding: 10,
  },

  headerText: {
    color: Color.appDefaultColor,
    fontFamily: 'Raleway-Medium',
    fontSize: 25,
  },
  infoContainer: {
    padding: 10,
  },
  info: {
    backgroundColor: '#f0f8ff',
    borderRadius: 15,
    justifyContent: 'space-between',
  },
  infoDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
    padding: 15,

    borderBottomColor: 'grey',
  },
  infoText: {
    color: Color.colorGray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 15,
  },
  icon: {
    backgroundColor: Color.appDefaultColor,
    width: 35,
    height: 35,
    justifyContent: 'center',
    borderRadius: 50,
    alignItems: 'center',
  },
  logout: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  infoLog: {
    backgroundColor: 'aliceblue',
    padding: 10,
  },
});
