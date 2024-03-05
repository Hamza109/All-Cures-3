import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import {Color, width} from '../../../config/GlobalStyles';
import NotificationIcon from '../../../assets/images/Notification.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
const About = () => {
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>About us</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>
      <View style={styles.setting}>
        <Text style={{color: Color.colorDarkslategray, fontSize: 18}}>
          All Cures is a product developed, managed and owned by Etherium
          Technologies. Our mission is to make it simple and convenient for
          users to get information on Cures from anywhere in the world. Our
          belief is that your wellness is your well-being. We are passionate
          about giving our users the unique experience that is both fulfilling
          and wholesome.
        </Text>
      </View>
      <View style={[styles.setting, {height: '11%', padding: 0}]}>
        <View style={styles.item}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              flex: 1,
            }}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.facebook.com/All-Cures-100610265834385',
                )
              }>
              <IonIcons
                name="logo-facebook"
                color={Color.appDefaultColor}
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://www.instagram.com/allcuresinfo/')
              }>
              <IonIcons
                name="logo-instagram"
                color={Color.appDefaultColor}
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://twitter.com/allcuresinfo')
              }>
              <IonIcons
                name="logo-twitter"
                color={Color.appDefaultColor}
                size={35}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  'https://www.linkedin.com/company/etherium-technologies/',
                )
              }>
              <IonIcons
                name="logo-linkedin"
                color={Color.appDefaultColor}
                size={35}
              />
            </TouchableOpacity>
          </View>

          <View></View>
        </View>
      </View>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
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
  setting: {
    backgroundColor: Color.lightpurple,
    alignSelf: 'center',
    borderRadius: 18,
    width: '90%',
    padding: 10,
    marginBottom: 10,
  },
  item: {
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    flex: 1,
  },
  header: {
    padding: 10,
  },
  headerText: {
    fontFamily: 'Raleway-Bold',
    fontSize: 25,
    marginTop: 5,
    padding: 5,
    color: '#00415e',
  },
  infoDetails: {
    alignSelf: 'flex-start',

    padding: 10,
    position: 'absolute',
    bottom: 0,
    borderBottomColor: 'grey',
  },
  delete: {
    backgroundColor: 'aliceblue',
    borderRadius: 15,
    width: '100%',
    padding: 10,
    position: 'absolute',
    marginBottom: 10,
    bottom: 0,
    left: 8,
  },
  infoText: {
    color: '#00415e',
    fontFamily: 'Raleway-Regular',
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 5,
  },

  deleteButton: {
    flexDirection: 'row',
    backgroundColor: '#00415e',
    alignItems: 'center',
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
  },
});
