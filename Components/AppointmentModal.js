import {
  Alert,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import {FontFamily, width} from '../config/GlobalStyles';
import {backendHost, imageHost} from './apiConfig';
import {Modal} from 'native-base';
import {Color} from '../config/GlobalStyles';
import {FlatList} from 'react-native-gesture-handler';
import {User} from './profile/UserPic';
import Dot from '../assets/images/dot.svg';
import {DocPic} from './profile/DocPic';
import {Button} from 'native-base';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../routes';
import {Center, AlertDialog, Input, Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AppointmentModal = () => {
  const [modalVisible, setModalVisible] = React.useState(true);
  const [data, setData] = useState([]);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [doc, setDoc] = useState([]);
  const [filteredDoc, setFilteredDoc] = useState([]);
  const navigation = useNavigation();
  const [selectedDocID, setSelectedDocID] = useState(null);
  const [searchText, setSearchText] = useState('');

  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${backendHost}/video/get/doctors/list`);
        const res1 = await fetch(
          `${backendHost}/SearchActionController?cmd=getResults&FeaturedDoctors`,
        );
        const json = await res.json();
        const json1 = await res1.json();

        // Combine the two arrays
        const combinedData = [...json, ...json1.map.DoctorDetails.myArrayList];

        setDoc(combinedData);
        setFilteredDoc(combinedData);
        console.log('Appointment Doc', combinedData);
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
        `${item.docname_first} ${item.docname_last}`
          .toLowerCase()
          .includes(searchText.toLowerCase()),
      );
      setFilteredDoc(filteredData);
    } else {
      setFilteredDoc(doc);
    }
  }, [searchText, doc]);

  const renderItem = ({item}) => {
    const id = item.docId ? item.docId : item.docID;
    const isSelected = id === selectedDocID;
    return (
      <TouchableOpacity
        style={[
          styles.itemContainer,
          isSelected && styles.selectedItemContainer,
        ]}
        onPress={() => {
          setSelectedDocID(item.docId ? item.docId : item.docID);
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
          <Text style={styles.mainText}>
            Dr. {item.docname_first} {item.docname_last}
          </Text>
          <View style={styles.hospitalInfoContainer}>
            <Text style={styles.mainTextHospital} numberOfLines={1}>
              {item.hospital_affliated}{' '}
            </Text>
            <Dot height={5} width={5} />
            <Text style={styles.mainTextMedicine}>
              {' '}
              {item.MedicineTypeName}
            </Text>
          </View>
          <View style={styles.separator} />
        </View>
      </TouchableOpacity>
    );
  };

  const handleBook = () => {
    if (selectedDocID) {
      navigation.navigate(Route.APPOINTMENT, {
        docID: selectedDocID,
      });
    } else {
      setIsOpen(true);
    }
  };

  return (
    <>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Select from our Expert Doctors</Modal.Header>
          <Modal.Body>
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
            <FlatList data={filteredDoc} renderItem={renderItem} />
          </Modal.Body>
          <Modal.Footer>
            <Button onPress={handleBook} backgroundColor="#5E4DB0">
              Book Appointment
            </Button>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
              🚫 This doctor is not available right now. We will get back to you
              ASAP. Meanwhile, check the doctor's profile to read articles and
              know more about him. 📄👨‍⚕️
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
              <Button backgroundColor={'#5E4DB0'}>
                Go to Doctor's Profile
              </Button>
            </Button.Group>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
    </>
  );
};

export default AppointmentModal;

const styles = StyleSheet.create({
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
    maxWidth: width / 2,
  },
  hospitalInfoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  separator: {
    borderWidth: 0.2,
    marginTop: 5,
  },
});
