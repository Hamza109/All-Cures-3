import {Pressable, StyleSheet, Text, View, Alert} from 'react-native';
import React, {useState} from 'react';
import {Color, FontFamily} from '../config/GlobalStyles';
import axios from 'axios';
import {useSelector, useDispatch} from 'react-redux';
import {backendHost} from './apiConfig';
import {Route} from '../routes';
import {screen} from '../Redux/Slice/screenNameSlice';
import {useNavigation} from '@react-navigation/native';
const OutButton = ({name, docID, firstName, lastName}) => {
  const profile = useSelector(state => state.profile.data);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [isLoaded, setIsLoaded] = useState(true);
  console.log('aas', docID);
  const handlePress = () => {
    console.log(name);
    if (name == 'Initiate Chat') {
      console.log('Initiated', name);
      initiateChat();
    } else if (name == 'Video Call') {
      videoCall();
      console.log('Video', name);
    }
  };

  const createChat = () => {
    axios
      .post(`${backendHost}/chat/start/${profile.registration_id}/${docID}`)
      .then(res => {
        if (res.data[0].Chat_id != null) {
          navigation.navigate(Route.CHAT, {
            id: docID,
            messages: [],
            chatId: res.data[0].Chat_id,
            first_name: firstName,
            last_name: lastName,
          });
        } else {
          Alert.alert('Something went wrong,please try again');
        }
      })

      .catch(err => Alert.alert(err));
  };

  const initiateChat = () => {
    if (profile.registration_id != 0) {
      console.log(profile.registration_id);
      axios
        .get(`${backendHost}/chat/${profile.registration_id}/${docID}`)
        .then(res => {
          console.log(res.data);
          if (res.status === 200) {
            if (res.data[0].Chat_id === null) {
              createChat();
            } else {
              console.log('transformedMEssage');
              const transformedMessages = res.data.map(message => {
                return {
                  _id: Math.random().toString(36).substring(2, 9),
                  text: message.Message,
                  createdAt: new Date(message.Time),
                  user: {
                    _id: message.From_id,
                    name: message.From,
                  },
                };
              });
              console.log('navigate');

              navigation.navigate(Route.CHAT, {
                messages:
                  res.data[0].Message != ''
                    ? transformedMessages.reverse()
                    : [],
                id: docID,
                chatId: res.data[0].Chat_id,
                first_name: firstName,
                last_name: lastName,
              });
            }
          } else {
            Alert.alert('Please Try again', 'something went wrong');
          }
        })
        .catch(err => err);
    } else {
      dispatch(screen(Route.LOGIN));
    }
  };
  const videoCall = async () => {
    setIsLoaded(false);
    try {
      const response = await fetch(`${backendHost}/video/create/room/${docID}`);
      const result = await response.json();
      console.log(result);

      setIsLoaded(true);
      navigation.navigate(Route.VIDEOCALL, {id: `${docID}`, url: result});

      console.log('res', result);
    } catch (error) {
      console.error('Error in startCall:', error);
    }
  };
  return (
    <Pressable style={styles.button} onPress={handlePress}>
      <Text style={styles.buttonText}>{name}</Text>
    </Pressable>
  );
};

export default OutButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Color.appDefaultColor,
  },
  buttonText: {
    fontSize: 14,
    lineHeight: 24,
    color: Color.appDefaultColor,
    fontFamily: FontFamily.poppinsRegular,
    alignSelf: 'center',
  },
});
