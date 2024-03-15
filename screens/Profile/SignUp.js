import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  Pressable,
  StatusBar,
} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
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
const SignUp = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [userType, setUserType] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const toast = useToast();
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const [number, setNumber] = useState();

  const validate = () => {
    // Add your specific validation logic here, e.g., length, format, etc.
    if (!email.trim()) {
      setLoginError('Email is required');
      return false;
    }
    if (!password.trim()) {
      setLoginError('Password is required');
      return false;
    }
    setLoginError(null); // Clear errors if validation passes
    return true;
  };

  const handleSubmit = async () => {
    console.log('Pressed');
    if (!validate()) return; // Validate the form data

    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    try {
      // Attempt login
      const type = userType ? 'Doctor' : 'other';
      console.log('Staring', firstName + lastName + email + password + type);

      const response = await axios.post(
        `${backendHost}/registration/add/new`,
        {
          firstname: firstName,

          lastname: lastName,
          email: email,
          psw: password,
          'psw-repeat': password,
          rempwd: '1',
          doc_patient: type,
          acceptTnc: '1',
          number: number,
          Age: null, // Assuming you intentionally set this to null
        },
        {
          withCredentials: true, // This should be in the second argument as part of the config object
          headers: {'Access-Control-Allow-Credentials': true},
        },
      );
      console.log('Doc Res', response.data);

      if (response.data.registration_id) {
        setTimeout(() => {
          dispatch(screen(Route.MAIN));

          console.log('docID', response.data.docID);
          dispatch(profileData(response.data));

          toast.show({
            title: 'Signup Successful',
            description: 'Welcome To All Cures',
            status: 'success',
            placement: 'bottom',
            style: {borderRadius: 20, width: '80%', marginBottom: 20},
          });
        }, 3000);
      } else if (
        response.data === 'Email Address already Exists in the System'
      ) {
        toast.show({
          title: 'Email already exists!',
          description: 'Try with another email',
          status: 'warning',
          placement: 'bottom',
          style: {borderRadius: 20, width: wp('80%'), marginBottom: 20},
        });
      }
    } catch (err) {
      // Handle login error
      console.log(err);
    }
  };

  return (
    <>
      <SignUpImg width={width} height={280} style={{marginTop: -30}} />
      <StatusBar translucent backgroundColor="transparent" />
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 20,
          color: Color.colorDarkslategray,
        }}>
        Create Account
      </Text>
      <View style={styles.container}>
        {/* Adjust image component as needed */}

        <View style={styles.form}>
          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="enter first Name"
            onChangeText={setFirstName}
            value={firstName}
          />
          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="Enter last name"
            onChangeText={setLastName}
            value={lastName}
          />
          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="Email"
            keyboardType="email-address" // Or 'phone-pad' if appropriate
            onChangeText={setEmail}
            value={email}
          />
          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="Phone Number"
            keyboardType="phone-pad" // Or 'phone-pad' if appropriate
            onChangeText={setNumber}
            value={number}
          />
          {loginError && <Text style={styles.errorText}>{loginError}</Text>}

          <View style={[styles.passwordContainer]}>
            <TextInput
              style={[styles.input, {width: 180}]}
              placeholder="Password"
              secureTextEntry={!showPassword}
              onChangeText={setPassword}
              value={password}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                size={20}
                color="gray"
              />
            </TouchableOpacity>
          </View>
          <View style={styles.termsContainer}>
            <CheckBox
              value={userType}
              onValueChange={() => setUserType(!userType)}
            />
            <Text style={styles.termsText}>Select , If you are Doctor.</Text>
          </View>

          <View style={styles.termsContainer}>
            <CheckBox value={agreeToTerms} onValueChange={setAgreeToTerms} />
            <Text style={styles.termsText}>
              I agree to the{' '}
              <Text
                style={styles.termsLink}
                onPress={() => {
                  /* Implement link to your T&C */
                }}>
                Terms and Conditions
              </Text>
            </Text>
          </View>

          <TouchableOpacity style={styles.login} onPress={handleSubmit}>
            <Text style={styles.loginText}>Sign Up</Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => {
              navigation.navigate(Route.SIGNUP);
            }}>
            <Text
              style={[styles.termsLink, {textAlign: 'center', marginTop: 5}]}>
              Already Have a Account?
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            dispatch(screen(Route.MAIN));
          }}>
          <Ionicons
            name={'close-circle-outline'}
            size={35}
            color={Color.appDefaultColor}
          />
          <Text style={{fontSize: 6, alignSelf: 'center'}}>close</Text>
        </Pressable>
      </View>
    </>
  );
};

export default SignUp;

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
