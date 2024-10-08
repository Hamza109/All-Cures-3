import React, {useEffect, useState, useRef} from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
} from 'react-native';
import {FontFamily, width} from '../../../config/GlobalStyles';
import {backendHost, imageHost} from '../../../Components/apiConfig';
import {Color} from '../../../config/GlobalStyles';

import {User} from './profile/UserPic';
import Dot from '../../../assets/images/dot.svg';
import {DocPic} from '../../../Components/profile/DocPic';
import {Button, Input, Icon, Center, AlertDialog} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Route} from '../../../routes';
import HeaderComponent from '../../../Components/HeaderComponent';
import {useSelector} from 'react-redux';

const AppointmentScreen = () => {
  const [data, setData] = useState([]);
  const initialRef = useRef(null);
  const finalRef = useRef(null);
  const [doc, setDoc] = useState([]);
  const [filteredDoc, setFilteredDoc] = useState([]);
  const navigation = useNavigation();
  const [selectedDocID, setSelectedDocID] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [videoService, setVideoService] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [img, setImg] = useState();
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);
  const profile = useSelector(state => state.profile.data);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendHost}/video/get/doctors/list`);

        const json = await res.json();

        // Combine the two arrays
        const sortedArr = json.sort((a, b) => b.videoService - a.videoService);
        console.log(sortedArr);

        setDoc(sortedArr);
        setFilteredDoc(sortedArr);
        console.log('Appointment Doc', json);
      } catch (error) {
        console.log(error);
        Alert.alert('Some Error occurred. Try Again!');
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (searchText) {
      const filteredData = doc.filter(item =>
        `${item.firstName} `.toLowerCase().includes(searchText.toLowerCase()),
      );
      setFilteredDoc(filteredData);
    } else {
      setFilteredDoc(doc);
    }
  }, [searchText, doc]);
  const postData = async ({docID}) => {
 
    console.log('started');

    try {
      const response = await fetch(
        `${backendHost}/video/post/leads?userID=${profile.registration_id}&docID=${docID}`,
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        },
      );

      const jsonResponse = await response.json();
      if (response.ok) {
        console.log('Response:', jsonResponse);
      } else {
        console.log('Response:', jsonResponse);
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('Error', 'An error occurred');
    }
  };
  const renderItem = ({item}) => {
    const id = item.docID;
    const isSelected = id === selectedDocID;
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        style={[
          styles.itemContainer,
          isSelected && styles.selectedItemContainer,
          (item.videoService === 1) & !isSelected && styles.videoService,
        ]}
        onPress={() => {
          setSelectedDocID(item.docID);
          setVideoService(item.videoService);
          setFirstName(item.firstName);
          setLastName(item.lastName);
          setImg(item.imgLoc);
          postData(item.docID);
        }}>
        {item.imgLoc ? (
          <Image
            style={styles.image}
            source={{
              uri: `${imageHost}${item.imgLoc}`,
            }}
          />
        ) : (
          <View style={styles.defaultImageContainer}>
            <DocPic />
          </View>
        )}
        <View style={styles.itemTextContainer}>
          <Text
            style={[
              styles.mainText,
              (item.videoService === 1) & !isSelected && styles.videoService,
            ]}>
            Dr. {item.firstName} {item.lastName}
          </Text>
          <View style={styles.hospitalInfoContainer}>
            <Text
              style={[
                styles.mainTextHospital,
                (item.videoService === 1) & !isSelected && styles.videoService,
              ]}
              numberOfLines={1}>
              {item.hospitalAffiliated}{' '}
            </Text>
            <Dot height={5} width={5} />
            <Text
              style={[
                styles.mainTextMedicine,
                (item.videoService === 1) & !isSelected && styles.videoService,
              ]}>
              {' '}
              {item.medicineType}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleBook = () => {
    if (selectedDocID && videoService === 1) {
      navigation.navigate(Route.APPOINTMENT, {
        docID: selectedDocID,
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <HeaderComponent title={'Book your Appointment'} />
      <View style={styles.container}>
        <Input
          placeholder="Search"
          variant="filled"
          width="100%"
          borderRadius="10"
          py="1"
          px="2"
          value={searchText}
          onChangeText={text => setSearchText(text)}
          _focus={{
            borderColor: '#5E4DB0', // Change border color on focus
            backgroundColor: '#F7F5FE', // Change background color on focus
            placeholderTextColor: '#363636', // Change placeholder text color on focus
          }}
          InputLeftElement={
            <Icon
              ml="2"
              size="4"
              color="gray.400"
              as={<Ionicons name="search" />}
            />
          }
        />
        {filteredDoc.length === 0 ? (
          <Text
            style={{
              justifyContent: 'center',
              flex: 1,
              alignSelf: 'center',
              marginTop: 20,
            }}>
            No doctor by this name. 🔍
          </Text>
        ) : (
          <FlatList data={filteredDoc} renderItem={renderItem} />
        )}
        <Button onPress={handleBook} backgroundColor="#5E4DB0">
          Book Appointment
        </Button>

        <AlertDialog
          leastDestructiveRef={cancelRef}
          isOpen={isOpen}
          onClose={onClose}>
          <AlertDialog.Content width="88%">
            <AlertDialog.Body>
              <Text
                style={{
                  fontWeight: '600',
                  fontFamily: FontFamily.poppinsRegular,
                  padding: 2,
                }}>
                🚫 This doctor is not registered with us for video call
                functionality at the moment. We will get back to you ASAP.
                Meanwhile, check the doctor's profile to read articles and learn
                more about them. 📄👨‍⚕️
              </Text>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button.Group space={2}>
                <Button
                  variant="unstyled"
                  colorScheme="coolGray"
                  onPress={onClose}
                  ref={cancelRef}>
                  Cancel
                </Button>
                <Button
                  backgroundColor={'#5E4DB0'}
                  onPress={() => {
                    navigation.navigate(Route.DOCTOR_MAIN_SCREEN, {
                      ids: selectedDocID,
                      firstName: firstName,
                      lastName: lastName,
                      imgLoc: img,
                    });
                  }}>
                  Go to Doctor's Profile
                </Button>
              </Button.Group>
            </AlertDialog.Footer>
          </AlertDialog.Content>
        </AlertDialog>
      </View>
    </>
  );
};

export default AppointmentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  itemContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  selectedItemContainer: {
    backgroundColor: Color.lightpurple, // background color when selected
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultImageContainer: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  itemTextContainer: {
    marginLeft: 15,
    justifyContent: 'center',
  },
  mainText: {
    fontSize: 15,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    fontWeight: '600',
    maxWidth: width / 2,
  },
  mainTextMedicine: {
    fontSize: 11,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    maxWidth: width / 2,
  },
  mainTextHospital: {
    fontSize: 11,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    maxWidth: width / 2.8,
  },
  hospitalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderWidth: 0.2,
    marginTop: 5,
  },
  videoService: {
    fontWeight: '700',
  },
});
