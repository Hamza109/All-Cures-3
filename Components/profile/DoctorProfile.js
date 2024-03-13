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
import {User} from './UserPic';
const DoctorProfile = ({docID}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [docData, setDocData] = useState();
  const profileData = useSelector(state => state.profile.data);
  const [isLoaded, setIsLoaded] = useState(true);
  const navigation = useNavigation();
  console.log(docID);

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
          console.log('User Data', json);
          setDocData(json);

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
  }, [isConnected, docID]);
  return (
    <>
      {isLoaded ? (
        <View style={{marginHorizontal: 10}}>
          <View style={{backgroundColor: '#fff'}}>
            <View style={{flexDirection: 'row'}}>
              {
                (docData?.imgLoc == '' ? (
                  <User />
                ) : (
                  <Image
                    source={{uri: `${imageHost}${docData?.imgLoc}`}}
                    style={{
                      height: 131,
                      width: 131,
                      backgroundColor: '#000',
                      borderRadius: 3,
                    }}
                  />
                ))
              }

              <View style={{marginLeft: 15, justifyContent: 'space-around'}}>
                <Text style={styles.profileName}>
                  Dr. {docData?.firstName} {docData?.lastName}
                </Text>
                <Text style={styles.otherSections}>
                  {docData?.medicineType}
                </Text>
                <Text style={styles.otherSections}>{docData?.email}</Text>
              </View>
            </View>
          </View>
          <Pressable
            style={styles.editProfile}
            onPress={() => {
              navigation.navigate(Route.EDITPROFILE,{
                docID:docID
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
  },
  otherSections: {
    color: Color.colorDarkslategray,
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
