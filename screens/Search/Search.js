import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import {Input} from 'native-base';
import {width, height, FontFamily, Color} from '../../config/GlobalStyles';
import {backendHost} from '../../Components/apiConfig';
import NotificationIcon from '../../assets/images/Notification.svg';
import {Route} from '../../routes';

const Search = ({navigation}) => {
  const handleNavigation = (title, placeholder, key) => {
    navigation.navigate(Route.SEARCH_INPUT, {
      header: title,
      placeholder: placeholder,
      key: key,
    });
  };

  const DATA = [
    {med_id: 1, med_type: 'Ayurveda'},
    {med_id: 2, med_type: 'Unani'},
    {med_id: 3, med_type: 'Persian'},
    {med_id: 4, med_type: 'Chinese'},
    {med_id: 5, med_type: 'Scandinavian'},
    {med_id: 6, med_type: 'Japanese'},
    {med_id: 7, med_type: 'Traditional Australian'},
    {med_id: 8, med_type: 'Homeopathy'},
    {med_id: 9, med_type: 'Naturopathy'},
    {med_id: 10, med_type: 'Korean'},
    {med_id: 11, med_type: 'Traditional Vietnamese'},
    {med_id: 12, med_type: 'Arabic'},
    {med_id: 13, med_type: 'Acupressure'},
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Search</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>

      <View style={{paddingHorizontal: 26}}>
        <View style={{marginBottom: 22}}>
          <View style={styles.label}>
            <Text style={styles.headlabel}>Find Cures</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.sublabel}>Popular</Text>
          </View>

          <View style={styles.medicineName}>
            {DATA.filter((item, index) => index < 6).map(item => (
              <TouchableOpacity
                activeOpacity={0.7}
                style={styles.popular}
                onPress={() => {
                  navigation.navigate(Route.SEARCH_RESULT, {
                    medicineId: item.med_id,
                  });
                }}
                key={item.med_id}>
                <Text style={styles.item}>{item.med_type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.label}>
            <Text style={styles.sublabel}>Search</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              handleNavigation('Find Cures', 'Search for cures', 'cure')
            }
            activeOpacity={0.5}
            style={styles.textBox}>
            <Text style={styles.placeholderText}>Search for cures</Text>
          </TouchableOpacity>

          {/* <Input
          placeholder="search for cures"
          height={12}
          color={'#fff'}
          borderColor={'rgba(76, 78, 100, 0.22)'}
          _focus={{
            borderWidth: 1,
            borderColor: 'rgba(76, 78, 100, 0.54)',
            color: '#fff',
            placeholderTextColor: 'rgba(76, 78, 100, 0.6)',
            bg: '#fff',
          }}
          autoCapitalize="none"
          returnKeyType="done"
        /> */}
        </View>

        <View style={styles.label}>
          <Text style={styles.headlabel}>Find Practitioner</Text>
        </View>

        <View style={{marginBottom: 22}}>
          <View style={styles.label}>
            <Text style={styles.mainlabel}>By Name</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.sublabel}>Search</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              handleNavigation('Find Practitioner', 'Practitioner Name', 'name')
            }
            activeOpacity={0.5}
            style={styles.textBox}>
            <Text style={styles.placeholderText}>Practitioner Name</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View style={styles.label}>
            <Text style={styles.mainlabel}>By City</Text>
          </View>

          <View style={styles.label}>
            <Text style={styles.sublabel}>Search</Text>
          </View>

          <TouchableOpacity
            onPress={() =>
              handleNavigation('Find Practitioner', 'Practitioner City', 'city')
            }
            activeOpacity={0.5}
            style={styles.textBox}>
            <Text style={styles.placeholderText}>Practitioner City</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textBox: {
    borderWidth: 1,
    width: '100%',
    borderColor: 'rgba(76, 78, 100, 0.22)',
    height: 50,
    justifyContent: 'center',
    borderRadius: 5,
  },
  placeholderText: {
    fontSize: 12,
    marginLeft: 12,
    fontWeight: '500',
    color: 'rgba(76, 78, 100, 0.6)',
    fontFamily: FontFamily.poppinsRegular,
  },
  mainlabel: {
    fontFamily: FontFamily.poppinsRegular,
    color: '#000',
    fontWeight: '500',
    fontSize: 13,
  },
  headlabel: {
    fontFamily: FontFamily.poppinsRegular,
    color: '#000',
    fontWeight: '500',
    fontSize: 18,
  },
  label: {
    marginBottom: 22,
  },
  sublabel: {
    fontFamily: FontFamily.poppinsRegular,
    color: '#000',
    fontWeight: '500',
    fontSize: 10,
  },
  medicineName: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
  },

  item: {

    color: 'rgba(76, 78, 100, 0.6)',
    lineHeight: 20,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '500',
    fontSize: 13,

    alignSelf: 'center',
  },
  feedHeader: {
    height: 102,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  popular: {
    backgroundColor: Color.lightpurple,
    borderRadius: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 4,
    height: 30,
  },
});
