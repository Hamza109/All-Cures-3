import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert,
} from 'react-native';
import React, {useState} from 'react';
import SignUpImg from '../../assets/images/signUpImg.svg';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, width} from '../../config/GlobalStyles';
import {backendHost} from '../../Components/apiConfig';
import {useDispatch} from 'react-redux';
import {profileData} from '../../Redux/Slice/ProfileDataSlice';
import {Route} from '../../routes';
import axios from 'axios';
import {useToast} from 'native-base';
import {screen} from '../../Redux/Slice/screenNameSlice';
import ContentLoader from '../../Components/ContentLoader';
const ResetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const [showPassword, setShowPassword] = useState(false);

  const [loginError, setLoginError] = useState({
    error: {
      mail: null,
      password: null,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [number, setNumber] = useState();
//Hamza Sir Please add and check this mail part
  //   useEffect(() => {
  //     getMail();
  //     // const params = new URLSearchParams(location.search);
  //     // const getEmail= params.get('em');
  //   }, []);
  //   const getMail = () => {
  //     try {
  //       AsyncStorage.getItem('mail1')
  //         .then(value2 => {
  //           if (value2 != null) {
  //             axios
  //               .post(`${backendHost}/users/getemdecrypt`, {
  //                 email: value2,
  //               })
  //               .then(res => {
  //                 setEmails(res.data);
  //               })
  //               .catch(err => err);
  //             // eslint-disable-next-line
  //           }
  //         })
  //         .catch(err => err);
  //     } catch (error) {
  //       error;
  //     }
  //   };
  const SignUpForm = () => {
    setLoading(true);

    setTimeout(() => {
      setClicked(0);
    }, 3000);
    var res;

    if (upperCase && lowerCase && match) {
      axios.defaults.withCredentials = true;
      axios
        .put(`${backendHost}/users/updatepassword`, {
          updated_password: password,
          email: email,
        })
        .then(response => {
          if (Number(response.data) === 1) {
            Alert.alert('Password Reset Successfully');
            setTimeout(() => {
              navigation.navigate(Route.MAIN);
            }, 2000);
          } else if (
            res.data ===
            'Sorry, the email address you entered does not exist in our database.'
          ) {
            setTimeout(() => {
              Alert.alert('Email not Found');
            }, 2000);
          }
        })
        .catch(res => {
          Alert.alert('some error occured');
        });
    } else {
      return;
    }
  };

  return (
    <>
      <SignUpImg width={width} height={280} style={{marginTop: -30}} />
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.container}>
        {/* Adjust image component as needed */}

        <View style={styles.form}>
          <Text
            style={{
              alignSelf: 'center',
              fontSize: 20,
              color: Color.colorDarkslategray,
            }}>
            Reset Password
          </Text>

         

          <View style={[styles.passwordContainer]}>
            <TextInput
              style={[styles.input, {width: 180}]}
              placeholder="password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            {loginError && (
              <Text style={styles.errorText}>{loginError.error.password}</Text>
            )}
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={!showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.login} onPress={SignUpForm}>
            <Text style={styles.loginText}>Reset Password</Text>
          </TouchableOpacity>
        </View>
        {isLoaded ? (
          <ContentLoader />
        ) : (
          <Pressable
            onPress={() => {
              dispatch(screen(Route.MAIN));
            }}
            style={{marginTop: 5}}>
            <Ionicons
              name={'close-circle-outline'}
              size={35}
              color={Color.appDefaultColor}
            />
            <Text style={{fontSize: 6, alignSelf: 'center'}}>close</Text>
          </Pressable>
        )}
      </View>
    </>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '80%',
    marginBottom: 50,
  },
  input: {
    height: 40,
    padding: 10,
    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    marginBottom: 10,
    borderColor: Color.appDefaultColor,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',

    height: 40,

    borderRadius: 5,
    backgroundColor: Color.lightpurple,
    marginBottom: 10,
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: Color.appDefaultColor,
    marginVertical: 10,
  },

  accountInfo: {
    alignItems: 'center',
  },
  accountInfoText: {
    marginBottom: 5,
  },
  accountInfoLink: {
    color: '#4CAF50',
    textDecorationLine: 'underline',
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 5,
  },
  termsText: {
    fontSize: 14,
    color: '#000',
  },
  termsLink: {
    color: Color.appDefaultColor,
    textDecorationLine: 'underline',
  },
  login: {
    backgroundColor: Color.appDefaultColor,
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
  },
  loginText: {
    fontSize: 18,
    lineHeight: 24,
    alignSelf: 'center',
    color: '#fff',
    fontWeight: '500',
  },
});
