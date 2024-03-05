import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {Color, FontFamily, width} from '../../../config/GlobalStyles';
import NotificationIcon from '../../../assets/images/Notification.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
const Help = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  //   const user = useSelector(state => state.userId.regId);
  const onDelete = () => {
    // if (user != 0) {
    // } else {
    // }
  };
  const dialCall = () => {
    let phoneNumber = '';

    if (Platform.OS === 'android') {
      phoneNumber = 'tel:+911912959035';
    } else {
      phoneNumber = 'telprompt:+911912959035';
    }

    Linking.openURL(phoneNumber);
  };
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
          <Text style={styles.read}>Help</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.headerText}>Contact Us</Text>
      </View>

      <View style={styles.setting}>
        <Text
          style={{
            textAlign: 'left',
            margin: 10,
            color: Color.colorDarkslategray,
            fontFamily: FontFamily.poppinsRegular,
          }}>
          For more information/query and support regarding account deletion
          contact us.
        </Text>
      </View>
      <View style={[styles.setting, {height: 70}]}>
        <View style={styles.item}>
          <TouchableOpacity
            onPress={() => Linking.openURL('mailto:info@etheriumtech.com')}>
            <IonIcons name="mail" color={Color.appDefaultColor} size={32} />
            <Text style={styles.contactText}>Email us</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => dialCall()}>
            <IonIcons name="call" color={Color.appDefaultColor} size={32} />
            <Text style={styles.contactText}>Call us</Text>
          </TouchableOpacity>

          <View></View>
        </View>
      </View>

      <View style={styles.delete}>
        <Text style={styles.infoText}>
          As a customer of AllCures, you have the ability to delete your
          profile. If your objective is for AllCures to not contact you, you
          have the ability of Unsubscribing to our NewsLetter by Editing your
          subscription. If you would like to Delete your profile, you can do
          that by Clicking Here. If you would like AllCures to remove all your
          information from our databases, please send us an email at{' '}
          <Text
            style={{textDecorationLine: 'underline', color: 'blue'}}
            onPress={() => Linking.openURL('mailto:info@etheriumtech.com')}>
            info@etheriumtech.com
          </Text>{' '}
          with the Subject of 'Delete My Profile'. In the subject of the body,
          also indicate your email address.
        </Text>

        <TouchableOpacity
          onPress={onDelete}
          style={styles.deleteButton}
          activeOpacity={0.9}>
          <MaterialCommunityIcons name="delete" size={16} color="#fff" />

          <Text style={{color: '#fff', fontSize: 10}}>Account Deleteion</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Help;

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
    borderRadius: 18,
    height: 70,
    width: '90%',
    alignItems: 'center',
    marginBottom: 10,
    alignSelf: 'center',
  },
  item: {
    width: 140,
    paddingVertical: 17,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
  },
  header: {
    padding: 15,
  },
  headerText: {
    fontFamily: FontFamily.poppinsRegular,

    color: Color.colorDarkslategray,
  },
  infoDetails: {
    alignSelf: 'flex-start',

    padding: 10,
    position: 'absolute',
    bottom: 0,
    borderBottomColor: 'grey',
  },
  delete: {
    backgroundColor: Color.lightpurple,
    borderRadius: 15,
    width: '90%',
    padding: 10,
    position: 'absolute',
    marginBottom: 10,
    bottom: 0,
    alignSelf: 'center',
  },
  infoText: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 10,
    marginBottom: 3,
    marginLeft: 5,
  },

  deleteButton: {
    flexDirection: 'row',
    backgroundColor: Color.appDefaultColor,
    alignItems: 'center',
    padding: 5,
    borderRadius: 25,
    justifyContent: 'center',
  },
  contactText: {
    fontSize: 8,
    textAlign: 'center',
    color: Color.colorDarkslategray,
  },
});
