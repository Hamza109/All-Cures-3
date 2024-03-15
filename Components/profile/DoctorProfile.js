import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {backendHost, imageHost} from '../apiConfig';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import {Route} from '../../routes';
import {useDispatch} from 'react-redux';
import {User} from './UserPic';
import {useStore} from 'react-redux';
import {docData} from '../../Redux/Slice/DoctorDetailSlice';
const DoctorProfile = ({docID}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [docDataUpdate, setDocDataUpdate] = useState();
  const profileData = useSelector(state => state.profile.data);
  const [isLoaded, setIsLoaded] = useState(true);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const datadoctor = useSelector(state => state.doc.data);
  const store = useStore();

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        setIsLoaded(false);

        try {
          const response = await axios.get(
            `${backendHost}/DoctorsActionController?DocID=${Number(
              docID,
            )}&cmd=getProfile`,
          );
          const json = await response.data;

          setDocDataUpdate(json);
          store.dispatch(docData(json));
          console.log('User Data', json);

          if (json == null) {
            navigation.navigate(Route.EDITPROFILE);
          }
          setIsLoaded(true);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Handle error appropriately, e.g., display an error message to the user
        }
      }
    };

    fetchData();

    // Cleanup (e.g., if you're using an AbortController)
  }, []);
  useEffect(() => {
    console.log(datadoctor);
  }, [datadoctor]);
  return (
    <>
      {isLoaded ? (
        <View style={{marginHorizontal: 10}}>
          <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row'}}>
              {docDataUpdate?.imgLoc == '' ? (
                <User />
              ) : (
                <Image
                  source={{uri: `${imageHost}${docDataUpdate?.imgLoc}`}}
                  style={{
                    height: 131,
                    width: 131,

                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                />
              )}

              <View
                style={{
                  marginLeft: 5,
                  justifyContent: 'space-around',
                  width: width / 1.5,
                }}>
                <Text style={styles.profileName}>
                  Dr. {datadoctor?.firstName} {datadoctor?.lastName}
                </Text>
                <Text style={styles.otherSections}>
                  {docDataUpdate?.medicineType}
                </Text>
                <Text style={styles.otherSections}>{docDataUpdate?.email}</Text>
                <Text style={styles.otherSections}>
                  {docDataUpdate?.country}
                </Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.editProfile}
            onPress={() => {
              navigation.navigate(Route.EDITPROFILE, {
                docID: docID,
              });
            }}>
            <Text style={styles.editProfileText}>Edit Profile</Text>
          </Pressable>
        </View>
      ) : (
        <Text>Loading ..</Text>
      )}
    </>
  );
};

export default DoctorProfile;

const styles = StyleSheet.create({
  profileName: {
    color: Color.colorDarkslategray,
    fontFamily: 'Raleway-Bold',
    fontSize: 25,
    marginLeft: 14,
    marginTop: -10,
    fontWeight: '600',
  },
  otherSections: {
    color: Color.colorGray,
    fontFamily: FontFamily.poppinsRegular,
    fontSize: 13,
    marginLeft: 14,
  },
  editProfile: {
    width: width / 1.1,
    borderWidth: 2,
    borderColor: Color.appDefaultColor,
    marginTop: 10,
    height: 35,
    alignSelf: 'center',
    backgroundColor: Color.lightpurple,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  editProfileText: {
    color: Color.appDefaultColor,
    fontSize: 18,
    fontWeight: '500',
  },
});
