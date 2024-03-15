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
import LoginImg from '../../assets/images/LoginImg.svg';
import CheckBox from '@react-native-community/checkbox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Color, width} from '../../config/GlobalStyles';
import {backendHost} from '../../Components/apiConfig';
import {UseDispatch, useDispatch} from 'react-redux';
import {profileData} from '../../Redux/Slice/ProfileDataSlice';
import {Route} from '../../routes';
import {screen} from '../../Redux/Slice/screenNameSlice';
const Login = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const dispatch = useDispatch();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
    console.log('Pressed', password.trim());
    if (!validate()) return; // Validate the form data

    if (!agreeToTerms) {
      alert('You must agree to the terms and conditions.');
      return;
    }

    try {
      // Attempt login
      console.log('Staring');
      const response = await fetch(
        `${backendHost}/login?cmd=login&email=${email}&psw=${password}&rempwd=on`,
        {
          method: 'POST',
          credentials: 'include', // Ensures cookies are sent with the request, equivalent to withCredentials in axios
          headers: {
            'Content-Type': 'application/json',
            // 'Access-Control-Allow-Credentials': 'true', might not be necessary for the request, commonly used in responses
          },
        },
      );
      const data = await response.json();
      console.log('Fetched', data);

      if (!response.ok) {
        // If server response is not okay, handle it accordingly
        const errorText = await response.text(); // Attempt to read server error response
        throw new Error(`Network response was not ok: ${errorText}`);
      }
      console.log('response is okay');

      // Parse JSON response into JavaScript object

      console.log('Login Response 1', data);
      dispatch(profileData(data));
      dispatch(screen(Route.MAIN));
    } catch (err) {
      // Handle login error
    }
  };

  return (
    <>
      <LoginImg width={width} height={280} style={{marginTop: -30}} />
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        {/* Adjust image component as needed */}
        <View style={styles.form}>
          <TextInput
            style={[styles.input, {borderBottomWidth: 1}]}
            placeholder="Email/Phone Number"
            keyboardType="email-address" // Or 'phone-pad' if appropriate
            onChangeText={setEmail}
            value={email}
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
            <Text style={styles.loginText}>Login</Text>
          </TouchableOpacity>

          <Pressable
            onPress={() => {
              navigation.navigate(Route.SIGNUP);
            }}>
            <Text
              style={[styles.termsLink, {textAlign: 'center', marginTop: 5}]}>
              Create Account
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={() => {
            dispatch(screen(Route.MAIN));
          }}>
          <Ionicons name={'close-circle-outline'} size={35} color={Color.appDefaultColor} />
          <Text style={{fontSize:6,alignSelf:'center'}}>close</Text>
        </Pressable>
      </View>
    </>
  );
};

export default Login;

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
