import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import Appointment from '../Doctor/Appointment';
import {useDispatch, useSelector} from 'react-redux';
import UserProfile from '../../Components/profile/UserProfile';
import Divider from '../../Components/Divider';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import Right from '../../assets/images/RIGHT.svg';
import DoctorProfile from '../../Components/profile/DoctorProfile';
import NotificationIcon from '../../assets/images/Notification.svg';
import {backendHost} from '../../Components/apiConfig';
import {Route} from '../../routes';
import {imageHost} from '../../Components/apiConfig';
import {docData} from '../../Redux/Slice/DoctorDetailSlice';
import {screen} from '../../Redux/Slice/screenNameSlice';
import {profileData} from '../../Redux/Slice/ProfileDataSlice';
const Profile = ({navigation}) => {
  const profileInfo = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  console.log('PRofile Data', profileInfo);
  const profileOptionsData = [
    {title: 'SignIn', route: Route.LOGIN},
    {title: 'Tip of the Day', route: Route.NOTIFICATION},
    {title: 'About us', route: Route.ABOUT},
    {title: 'Submit Articles', route: Route.SUBMITARTICLE},

    {title: 'Help', route: Route.HELP},
    {title: 'Logout', route: Route.LOGOUT},
  ];

  const [docDataUpdated, setDocDataUpdated] = useState();
  const [isLoaded, setIsLoaded] = useState(false);
  const [img, setImg] = useState();
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [email, setEmail] = useState('');

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
          console.log('OK Pressed'),
            dispatch(profileData([]), dispatch(screen(Route.MAIN)));
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

  useEffect(() => {
    if (profileInfo.registration_id) {
      getUser();
    } else {
      dispatch(screen(Route.LOGIN));
    }
  }, []);
  return (
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
      {profileInfo.docID == 0 || profileInfo.length == [] ? (
        <UserProfile />
      ) : (
        <DoctorProfile docID={profileInfo.docID} />
      )}

      <Text style={styles.setting}>Settings</Text>
      <View style={{marginHorizontal: 10}}>
        {/* Commented out section; not relevant to map function focus */}

        {profileOptionsData.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              item.title == 'Logout'
                ? handleLogOut()
                : navigation.navigate(item.route);
            }}>
            <View style={styles.titleView}>
              <Text style={styles.titleText}>{item.title}</Text>
              <Right width={7.5} height={15} />
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>
    </View>
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
});
