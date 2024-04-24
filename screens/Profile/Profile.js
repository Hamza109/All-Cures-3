import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Pressable,
  ScrollView,
  SafeAreaView,
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
import {User} from '../../Components/profile/UserPic';

const Profile = ({navigation}) => {
  const profileInfo = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  console.log('PRofile Data', profileInfo);
  const profileOptionsData = [
    {title: 'Tip of the Day', route: Route.NOTIFICATION},
    {title: 'About us', route: Route.ABOUT},
    {title: 'My Bookings', route: Route.MYBOOKINGS},
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
    try {
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
    } catch (error) {
      console.log('Error Occur', error);
    }
  };
  const handleProfile = item => {
    if (item.title === 'Logout') {
      // Exact match
      handleLogOut();
    } else if (
      item.title === 'Submit Articles' ||
      item.title === 'Inbox' ||
      item.title === 'Favourite' ||
      item.title === 'My Bookings'
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


  return (
    <>
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
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              gap: 10,
            }}>
            <User />
            <Pressable
              style={{
                backgroundColor: Color.lightpurple,
                borderRadius: 15,
                borderColor: Color.appDefaultColor,
                color: Color.colorDarkslategray,
                borderWidth: 1,
                padding: 15,
              }}
              onPress={() => {
                dispatch(screen(Route.LOGIN));
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontWeight: '400',
                  width: width / 1.8,
                  textAlign: 'center',
                  fontFamily: FontFamily.poppinsRegular,
                  textDecorationLine: 'underline',
                }}>
                Sign In/Create Account
              </Text>
            </Pressable>
          </View>
        )}

        <Text style={styles.setting}>Settings</Text>
        <ScrollView style={{marginHorizontal: 10}}>
          {/* Commented out section; not relevant to map function focus */}

          {profileOptionsData.map((item, index) => (
            <View key={item.title}>
              {Object.keys(profileInfo).length == 0 &&
              item.title == 'Logout' ? null : (
                <TouchableOpacity
                  onPress={() => {
                    handleProfile(item);
                  }}>
                  <View style={styles.titleView}>
                    <Text style={styles.titleText}>{item.title}</Text>
                    <Right width={7.5} height={15} />
                  </View>
                  <Divider />
                </TouchableOpacity>
              )}
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
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
    fontFamily: FontFamily.poppinsRegular,
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
