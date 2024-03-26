import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
} from 'react-native';
import Appointment from '../Doctor/Appointment';
import {useDispatch, useSelector} from 'react-redux';
import UserProfile from '../../Components/profile/UserProfile';
import Divider from '../../Components/Divider';
import {Color, FontFamily, height, width} from '../../config/GlobalStyles';
import Right from '../../assets/images/RIGHT.svg';
import DoctorProfile from '../../Components/profile/DoctorProfile';
import NotificationIcon from '../../assets/images/Notification.svg';
import {backendHost} from '../../Components/apiConfig';
import {Route} from '../../routes';
import {imageHost} from '../../Components/apiConfig';
import {docData} from '../../Redux/Slice/DoctorDetailSlice';
import {screen} from '../../Redux/Slice/screenNameSlice';
import {profileData} from '../../Redux/Slice/ProfileDataSlice';
import {StackActions} from '@react-navigation/native';

const Profile = ({navigation}) => {
  const profileInfo = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  console.log('PRofile Data', profileInfo);
  const profileOptionsData = [
    {title: 'Tip of the Day', route: Route.NOTIFICATION},
    {title: 'About us', route: Route.ABOUT},
    {title: 'Submit Articles', route: Route.SUBMITARTICLE},
    {title: 'Favourite', route: Route.FAVOURITE},
    {title: 'Inbox', route: Route.INBOX},

    {title: 'Help', route: Route.HELP},
    {title: 'Logout', route: Route.LOGOUT},
  ];

  const [docDataUpdated, setDocDataUpdated] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [img, setImg] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState('');

  const remove = () => {
    console.log('removed');

    navigation.navigate(Route.FEED_TAB, {screen: Route.FEED});
    dispatch(profileData({}));
  };

  const handleLogOut = () => {
    Alert.alert('Log Out', 'Are you Sure You want to log Out?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: () => {
          remove();
        },
      },
    ]);
  };

  const getUser = () => {
    return function (dispatch) {
      const userData = new Promise((resolve, reject) => {
        if (profileInfo.docID != 0) {
          axios
            .get(
              `${backendHost}/DoctorsActionController?DocID=${Number(
                profileInfo.docID,
              )}&cmd=getProfile`,
            )
            .then(res => res.data)
            .then(json => {
              console.log('profile', json);
              setDocDataUpdated(json);
              if (json == null) {
                setIsLoaded(true);
                Alert.alert('No details found', 'Please add your information', [
                  {
                    text: 'OK',
                    onPress: () => {
                      navigation.navigate(Route.EDITPROFILE, {data: json});
                    },
                  },
                ]);
              } else {
                resolve(dispatch(docData(json)));
                console.log('Doc profile Dispatched Successfully');

                setImg(`${imageHost}${json.imgLoc}`);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          getProfile(profileInfo.registration_id);
        }
      });
      userData.then(() => {
        setIsLoaded(true);
      });
    };
  };
  const getProfile = userId => {
    const data = new Promise((resolve, reject) => {
      if (isConnected) {
        setIsLoaded(false);
        axios
          .get(`${backendHost}/profile/${userId}`, {
            signal: abort.signal,
          })
          .then(res => {
            console.log('fetched Data', res);
            resolve(setFirstName(res.data.first_name));
            resolve(setLastName(res.data.last_name));
            resolve(setEmail(res.data.email_address));
          })
          .catch(err => {
            return;
          });
      }
    });
    data.then(() => {
      setIsLoaded(true);
    });
  };
  const handleProfile = item => {
    if (item.title === 'Logout') {
      // Exact match
      handleLogOut();
    } else if (
      item.title === 'Submit Articles' ||
      item.title === 'Inbox' ||
      item.title === 'favourite'
    ) {
      if (Object.keys(profileInfo).length) {
        navigation.navigate(item.route);
      } else {
        dispatch(screen(Route.LOGIN));
      }
    } else {
      // Consider adding error handling in case of navigation issues
      navigation.navigate(item.route);
    }
  };
  useEffect(() => {
    console.log();
    if (Object.keys(profileInfo).length) {
      getUser();
    }
  }, []);

  const handlePayment = () => {
    axios
      .post(
        'https://test.ccavenue.com/transaction.do?command=initiateTransaction',
        {
          encRequest:
            '0EE39E5A05CF73D2E10DA350D26555225B1A2B3113AD55BD461E6DB9D990B9CCDFDFD279E48A969E23210C030732FA980303819412A0263EBD6A2F104A67D3AFB0B7410AFA9C801DC36836ABB29A9169FE22EDAFD56649AF082E05D066F349E6C5AF85D763331CFE4CFBCBBE1FD6504EFCEE6AAE0E49C5243A06153463703BBB7327E5ECD799327B0FE6B8AB7F7806A66D62367F5C282BAA6F9A1CAD99CFABBDF86FB65C0A426CA1FA6205FB13AAE97BCFC913670E480B6FD8ABB123D82F669EFBEC14C9757B517D60A8CED051F0E6B86FFC8DB94C9C733795F312991FF01F87',
          accessCode: 'AVKI05LC59AW25IKWA',
        },
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  };
  return (
    <>
      <View style={styles.container}>
        <View style={styles.feedHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 36,
              marginLeft: 5,
            }}>
            <Text style={styles.read}>Account</Text>
          </View>
        </View>
        {profileInfo && Object.keys(profileInfo).length !== 0 ? (
          profileInfo.docID === 0 || profileInfo.length === 0 ? (
            <UserProfile />
          ) : (
            <DoctorProfile docID={profileInfo.docID} />
          )
        ) : (
          <Pressable
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: height / 6,
            }}
            onPress={() => {
              dispatch(screen(Route.LOGIN));
            }}>
            <Text
              style={{
                borderWidth: 1,
                width: width / 1.5,
                height: 60,

                textAlign: 'center',
                textAlignVertical: 'center',
                backgroundColor: Color.lightpurple,
                borderRadius: 15,
                borderColor: Color.appDefaultColor,
                color: Color.colorDarkslategray,
                fontSize: 16,
                fontWeight: '400',
                fontFamily: FontFamily.poppinsRegular,
              }}>
              Sign In/Create Account
            </Text>
          </Pressable>
        )}

        <Text style={styles.setting}>Settings</Text>
        <ScrollView style={{marginHorizontal: 10}}>
          {/* Commented out section; not relevant to map function focus */}

          {profileOptionsData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                handleProfile(item);
              }}>
              <View style={styles.titleView}>
                <Text style={styles.titleText}>{item.title}</Text>
                <Right width={7.5} height={15} />
              </View>
              <Divider />
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  setting: {
    fontSize: 25,
    color: Color.colorDarkslategray,
    // lineHeight:17,
    fontWeight: '600',
    margin: 10,
  },
  titleView: {
    height: 57,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 5,
  },
  titleText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
  },
  feedHeader: {
    height: 90,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
});
