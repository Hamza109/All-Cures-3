import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
  Alert
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import React, {useState} from 'react';

import SignUpImg from '../../assets/images/signUpImg.svg';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, width} from '../../config/GlobalStyles';
import {backendHost} from '../../Components/apiConfig';
import {useDispatch, useSelector} from 'react-redux';
import {profileData} from '../../Redux/Slice/ProfileDataSlice';
import {Route} from '../../routes';
import axios from 'axios';
import {useToast} from 'native-base';
import {screen} from '../../Redux/Slice/screenNameSlice';
import ContentLoader from '../../Components/ContentLoader';
const ForgetPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const profileInfo = useSelector(state => state.profile.data);

  const submitForm = async e => {
    setIsLoaded(true);
    if (email != '') {
      if (email) {
        axios
          .post(`${backendHost}/users/checkemail`, {
            email: email.replace(/\s/g, ''),
          })
          .then(res => {
            console.log(res.data);
            if (res.data === 1) {
              setIsLoaded(false);
              Alert.alert('Mail Sent', 'Please check your email!');
            } else {
              setLoading(false);
              Alert.alert('Not a valid email!', 'please enter valid email!');
            }
          })
          .catch(err => {
            err;
          });
      }
    } else {
      setIsLoaded(false);
      Alert.alert('Please enter your email!');
    }
  };

  const [loginError, setLoginError] = useState({
    error: {
      mail: null,
      password: null,
    },
  });
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

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
            Forget Password
          </Text>

          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="email"
            keyboardType="email-address" // Or 'phone-pad' if appropriate
            onChangeText={setEmail}
            value={email}
          />
          {loginError.error.mail && (
            <Text style={styles.errorText}>{loginError.error.mail}</Text>
          )}

          <TouchableOpacity style={styles.login} onPress={submitForm}>
            <Text style={styles.loginText}>Submit</Text>
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

export default ForgetPassword;

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
