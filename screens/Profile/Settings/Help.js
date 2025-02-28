import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Linking,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {Color, FontFamily, width} from '../../../config/GlobalStyles';
import NotificationIcon from '../../../assets/images/Notification.svg';
import IonIcons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import HeaderComponent from '../../../Components/HeaderComponent';
import {Modal} from 'native-base';
import {FormControl, Input, Button} from 'native-base';
import {screen} from '../../../Redux/Slice/screenNameSlice';
import {Route} from '../../../routes';
import {profileData} from '../../../Redux/Slice/ProfileDataSlice';
const Help = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);

  const [modalVisible, setModalVisible] = React.useState(false);
  const initialRef = React.useRef(null);
  const finalRef = React.useRef(null);
  const [email, setEmail] = useState(profile?.email_address);
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);
  const onDelete = () => {
    console.log('pressed modal');
    if (Object.keys(profile).length != 0) {
      console.log('Modal opened');
      setModalVisible(true);
    } else {
      dispatch(screen(Route.LOGIN));
    }
  };
  const handleDelete = async () => {
    const body = {
      email: email,
      pwd: password,
      reasonID: 1,
    };
    console.log(body);
    try {
      const res = await axios.put(
        'https://uat.all-cures.com:444/cures/data/deactivate',
        body,
      );
      const json = res.data;
      console.log(json);
      if (json == 0) {
        Alert.alert('Incorrect Password');
      } else if (json == 1) {
        Alert.alert('Account Deleted Successfully'),
          dispatch(profileData([])),
          dispatch(screen(Route.MAIN));
        setModalVisible(false);
      } else {
        Alert.alert('Some Error Occured');
      }
    } catch (error) {
      console.log(error);
    }
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
  const handleClick = () => setShow(!show);
  const handleChange = i => {
    console.log('New password value:', i);
    setPassword(i);
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
      <HeaderComponent title={'Help'} />

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
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
        finalFocusRef={finalRef}>
        <Modal.Content>
          <Modal.CloseButton />
          <Modal.Header>Delete Your Account</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input
                style={{backgroundColor: Color.lightpurple, padding: '10px'}}
                value={email}
                disabled
              />
            </FormControl>
            <FormControl mt="3">
              <FormControl.Label>Password</FormControl.Label>
              <Input
                type={show ? 'text' : 'password'}
                w="100%"
                py="0"
                style={{backgroundColor: Color.lightpurple, padding: '10px'}}
                InputRightElement={
                  <Button
                    size="xs"
                    rounded="none"
                    w="1/8"
                    h="full"
                    onPress={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                }
                placeholder="Password"
                onChangeText={i => handleChange(i)}
              />
            </FormControl>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false);
                }}>
                Cancel
              </Button>
              <Button
                onPress={() => {
                  handleDelete();
                }}
                colorScheme="red">
                Delete Account
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

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
    </SafeAreaView>
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
