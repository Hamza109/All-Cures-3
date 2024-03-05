import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {backendHost, imageHost} from '../apiConfig';
import axios from 'axios';
import {useSelector} from 'react-redux';
import { Color } from '../../config/GlobalStyles';
const DoctorProfile = ({docID}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [docData, setDocData] = useState();
  const profileData = useSelector(state => state.profile.data);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (isConnected) {
        setIsLoaded(false);

        try {
          const response = await axios.get(
            `${backendHost}/DoctorsActionController?DocID=${Number(
              profileData.docID,
            )}&cmd=getProfile`,
          );
          const json = await response.data;
          setDocData(json);
          console.log('profile', json);
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
        <View style={{height: 145, marginHorizontal: 10}}>
          <View
            style={{backgroundColor: '#fff', height: '100%', width: '100%'}}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={{uri: `${imageHost}${docData?.imgLoc}`}}
                style={{
                  height: 131,
                  width: 131,
                  backgroundColor: '#000',
                  borderRadius: 3,
                }}
              />
              <View style={{marginLeft: 15}}>
                <Text style={styles.profileName}>
                  Dr. {docData?.firstName} {docData?.lastName}
                </Text>
                <Text>{docData?.medicineType}</Text>
                <Text>{docData?.email}</Text>
              </View>
            </View>
          </View>
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
        color: Color.appDefaultColor,
        fontFamily: 'Raleway-Bold',
        fontSize: 25,
        marginLeft: 14,
        marginTop: -10,
      },
});
