import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  TouchableOpacity,
  Button,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import {width, height, FontFamily, Color} from '../../config/GlobalStyles';
import NotificationIcon from '../../assets/images/Notification.svg';
import {FlashList} from '@shopify/flash-list';
import DoctorsCard from '../../Components/DoctorsCard';
import {backendHost} from '../../Components/apiConfig';
import FilterList from '../../assets/images/filter_list.svg';
import {FILTER_DOC} from '../../routes';
import {Route} from '../../routes';
import ContentLoader from '../../Components/ContentLoader';

import {useNavigation} from '@react-navigation/native';
const Doctor = () => {
  const [featuredDoctors, setFeaturedDoctors] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [speciality, setSpeciality] = useState([]);
  const [medicineId, setMedicineId] = useState('Featured');
  const navigation = useNavigation();

  const selectItem = item => {
    console.log(item.med_type);
    setMedicineId(item.med_type);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const promises = [
          fetch(
            `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors`,
          ),
          fetch(`${backendHost}/data/medicines`),
        ];
        const [response1, response2] = await Promise.all(promises);

        const data1 = await response1.json();
        const data2 = await response2.json();
        console.log(data1.map.DoctorDetails.myArrayList);
        console.log(data2);

        setFeaturedDoctors(data1.map.DoctorDetails.myArrayList);

        setSpeciality(data2);
      } catch (error) {
        console.log(error);
        setError(error);
      } finally {
        setLoaded(true);
      }
    };

    fetchData();
  }, []);
  const [sortedDoc,setSortedDoc] = useState()
  useEffect(() => {
    const data = featuredDoctors.filter(i => {
      console.log('odl', i.map.medicineType);
      console.log('new', medicineId);
      return i.map.medicineType === medicineId;
    });
    setSortedDoc(data)
    console.log('new data', data);

  }, [medicineId]);

  const renderItem = ({item}) => {
    let imageLoc = '';
    const imgLocation = item.content_location;
    if (imgLocation && imgLocation.includes('cures_articleimages')) {
      imageLoc =
        `https://all-cures.com:444/` +
        imgLocation.replace('json', 'png').split('/webapps/')[1];
    } else {
      imageLoc =
        'https://all-cures.com:444/cures_articleimages//299/default.png';
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => {
          console.log('ID', item.map.docID);
          navigation.navigate(Route.DOCTOR_MAIN_SCREEN, {
            ids: item.map.docID,
            firstName: item.map.firstName,
            secondName: item.map.lastName,
            imgLoc: item.map.imgLoc,
          });
        }}>
        <DoctorsCard
          training={item.map.medtype}
          firstName={item.map.firstName}
          secondName={item.map.lastName}
          DocID={item.map.docID}
          primarySpl={item.map.primarySpl}
          imgLoc={item.map.imgLoc}
          state={item.map.state}
          hospitalAffiliated={item.map.hospitalAffiliated}
        />
      </TouchableOpacity>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.feedContainer}>
        <View style={styles.feedHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 36,
              marginLeft: 5,
            }}>
            <Text style={styles.read}>Practitioners</Text>
            <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
          </View>
          <View style={{flexDirection: 'row'}}>
            {
              <ScrollView
                horizontal
                style={{padding: 5, flex: 1, marginTop: 20}}
                showsHorizontalScrollIndicator={false}>
                <View style={{paddingRight: 11}}>
                  <TouchableOpacity
                    style={
                      Platform.OS === 'ios'
                        ? medicineId === null
                          ? styles.activeLabel
                          : styles.inactiveLabel
                        : null
                    }
                    onPress={() => {
                      selectItem({med_id: 0, med_type: 'Featured'});
                    }}>
                    <Text
                      style={[
                        styles.featured,
                        medicineId == 'Featured'
                          ? styles.activeLabel
                          : styles.inactiveLabel,
                      ]}>
                      Featured
                    </Text>
                  </TouchableOpacity>
                </View>

                {speciality.map((item, index) => {
                  return (
                    <View key={item.dc_id} style={{paddingHorizontal: 11}}>
                      <TouchableOpacity
                        style={
                          Platform.OS === 'ios'
                            ? item.med_type === medicineId
                              ? styles.activeLabel
                              : styles.inactiveLabel
                            : null
                        }
                        onPress={() => {
                          console.log(item);
                          selectItem(item);
                        }}>
                        <Text
                          style={[
                            styles.category,
                            item.med_type === medicineId
                              ? styles.activeLabel
                              : styles.inactiveLabel,
                          ]}>
                          {item.med_type}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  );
                })}
              </ScrollView>
            }
       
          </View>
        </View>

        {Loaded ? (
          <FlashList
            estimatedItemSize={100}
            data={ medicineId == 'Featured'?featuredDoctors:sortedDoc}
            renderItem={renderItem}
          />
        ) : (
          <ContentLoader />
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: 132,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },

  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  category: {
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 10,
    width: 'auto',
  },

  featured: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSilver,
    fontSize: 10,
  },

  activeLabel: {
    color: Color.colorDarkslategray,
    borderBottomWidth: 2,
    borderColor: '#5E4DB0',
  },

  inactiveLabel: {
    color: Color.colorSilver,
  },
});

export default Doctor;
