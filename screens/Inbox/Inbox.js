import {StatusBar} from 'native-base';
import React, {useState, useEffect, useLayoutEffect, useCallback} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Pressable,
  Image,
  BackHandler,
  Alert,
} from 'react-native';
import axios from 'axios';
import Svg, {Path, Circle} from 'react-native-svg';
import {backendHost} from '../../Components/apiConfig';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';

import moment from 'moment';
import {StackActions} from '@react-navigation/native';
import {Route} from '../../routes';
import HeaderComponent from '../../Components/HeaderComponent';
import ContentLoader from '../../Components/ContentLoader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Color, FontFamily} from '../../config/GlobalStyles';

const Inbox = () => {
  const [messages, setMessages] = useState([]);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  const [exist, setExist] = useState(false);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const profile = useSelector(state => state.profile.data);
  console.log('profile', profile);
  const [user, setUser] = useState();
  const [start, setStart] = useState();
  const [end, setEnd] = useState();
  useEffect(() => {
    if (profile.docID != 0) {
      setUser(profile.docID);
    } else {
      setUser(profile.registration_id);
    }
  }, [user]);

  // const row = useSelector(state => state.docRow.rowId);

  function User() {
    return (
      <Svg
        xmlns="http://www.w3.org/2000/svg"
        width={60}
        height={60}
        fill="none"
        viewBox="0 0 43 43">
        <Path
          fill="#e5e5e5"
          d="M37.288 34.616A20.548 20.548 0 10.938 21.5a20.414 20.414 0 004.774 13.116l-.029.025c.103.123.22.23.326.351.132.151.275.294.411.44.412.447.835.876 1.278 1.278.135.124.275.238.411.356.47.405.954.79 1.454 1.148.065.044.124.102.188.147v-.017a20.417 20.417 0 0023.5 0v.017c.065-.045.122-.102.189-.147.499-.36.983-.743 1.454-1.148.136-.118.276-.234.41-.356.444-.404.867-.83 1.279-1.277.136-.147.277-.29.41-.441.105-.122.224-.228.327-.352l-.032-.024zM21.5 9.75a6.61 6.61 0 110 13.22 6.61 6.61 0 010-13.22zM9.76 34.616a7.338 7.338 0 017.334-7.241h8.812a7.338 7.338 0 017.334 7.241 17.537 17.537 0 01-23.48 0z"></Path>
      </Svg>
    );
  }

  const checkIfImage = imageUrl => {
    fetch(imageUrl, {method: 'HEAD', mode: 'no-cors'})
      .then(res => {
        if (res.ok) {
          setExist(true);
        } else {
          setExist(false);
        }
      })
      .catch(err => err);
  };

  const initiateChat = async (userID, first_name, second_name) => {
    setIsLoaded(false);
    if (profile.registration_id != 0) {
      console.log('hah', userID);
      if (profile.docID == 0) {
        setStart(profile.registration_id);
        setEnd(userID);
      } else {
        setStart(userID);
        setEnd(profile.docID);
      }
      console.log('user', user);
      try {
        console.log('try statement ');
        console.log(start);
        const res = await axios.get(`${backendHost}/chat/${start}/${end}`);

        console.log('res', res.data);
        if (res.status === 200) {
          if (res.data[0].Chat_id === null) {
            createChat();
          } else {
            console.log('transformedMEssage', res.data);
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
            console.log('navigate', transformedMessages);

            navigation.navigate(Route.CHAT, {
              messages:
                res.data[0].Message != '' ? transformedMessages.reverse() : [],
              id: user,
              chatId: res.data[0].Chat_id,
              first_name: first_name,
              last_name: second_name,
            });
            setIsLoaded(true);
          }
        } else {
          Alert.alert('Please Try again', 'something went wrong');
        }
      } catch (error) {
        if (error.response) {
          // Server-side error
          console.log(
            'Server error:',
            error.response.data,
            error.response.status,
          );
          Alert.alert('Error', 'Server error occurred.');
        } else if (error.request) {
          // Network error
          console.log('Network error:', error.request);
          Alert.alert(
            'Error',
            'Network error occurred. Check your connection.',
          );
        } else {
          // Other unknown error
          console.log('Unexpected error:', error);
          Alert.alert('Error', 'An unexpected error occurred.');
        }
      }
    } else {
      dispatch(screen(Route.LOGIN));
    }
  };
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    if (profile.docID != 0) {
      console.log(profile.docID);
      setUser(profile.docID);
    } else {
      console.log('else statenet', profile.registration_id);
      setUser(profile.registration_id);
    }
  }, []);

  useFocusEffect(() => {
    console.log(profile);
    fetchData();
  });

  const fetchData = async () => {
    if (user) {
      try {
        const response = await fetch(`${backendHost}/chat/list/${user}`);
        if (!response.ok) {
          throw new Error(`Network response was not ok (${response.status})`);
        }
        const json = await response.json();
        setData(json);
        setIsLoaded(true);
      } catch (error) {
        setIsLoaded(true);
        Alert.alert('Error Fetching Data', error.message);
      }
    }
  }

  const renderMessage = ({item}) => {
    const now = moment();
    const messageTime = moment(item.Time);

    const nowDate = now.format('DD/MM/YYYY');
    const messageDate = messageTime.format('DD/MM/YYYY');
    const yesterday = moment().subtract(1, 'days').format('DD/MM/YYYY');

    let displayTime;
    if (nowDate === messageDate) {
      // Show time if it's on the current day
      displayTime = messageTime.format('h:mm A');
    } else if (messageDate === yesterday) {
      // Show "Yesterday" if it's on the previous day
      displayTime = 'Yesterday';
    } else {
      // Show date in DD/MM/YYYY format if it's beyond the previous day
      displayTime = messageTime.format('DD/MM/YYYY');
    }

    const url = `http://all-cures.com:8280/cures_articleimages/doctors/${
      item.Rowno
    }.png?d=${parseInt(Math.random() * 1000)}`;
    checkIfImage(url);

    return (
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <Pressable
          onPress={() =>
            initiateChat(item.userID, item.first_name, item.last_name)
          }
          style={styles.messageContainer}>
          <View style={styles.leftContainer}>
            {item.Rowno == null ? (
              <User />
            ) : (
              <View>
                {exist ? (
                  <Image source={{uri: url}} />
                ) : (
                  <View>
                    <User />
                  </View>
                )}
              </View>
            )}

            <View style={styles.info}>
              {item.Rowno == null ? (
                <Text allowFontScaling style={styles.infoHead}>
                  {item.first_name} {item.last_name}
                </Text>
              ) : (
                <Text allowFontScaling style={styles.infoHead}>
                  Dr. {item.first_name} {item.last_name}
                </Text>
              )}
              <Text allowFontScaling numberOfLines={1} style={styles.infoText}>
                {item.Message}
              </Text>
            </View>
          </View>

          <View style={styles.infoTime}>
            <Text
              allowFontScaling
              style={{
                fontSize: 13,
                marginRight: 10,
                marginTop: 5,
              }}>
              {displayTime}
            </Text>
          </View>
        </Pressable>
      </View>
    );
  };

  return (
    <>
      <SafeAreaView style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HeaderComponent title="Inbox" />
        {!isLoaded ? (
          <ContentLoader />
        ) : data.length > 0 ? (
          <FlatList
            data={data}
            style={{width: '100%'}}
            renderItem={renderMessage}
            keyExtractor={item => item.id} // Assuming unique 'id' in your data
          />
        ) : (
          // Placeholder for empty inbox (replace with appropriate UI)
          <Text style={styles.emptyInbox}>No messages yet</Text>
        )}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  messageContainer: {
    padding: 8,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  info: {
    justifyContent: 'space-around',
    marginLeft: 10,
  },
  infoHead: {
    fontFamily: 'Raleway-Bold',
    fontSize: 18,
    color: 'rgba(0, 0, 0, 0.8)',
  },
  infoText: {
    fontFamily: 'Raleway-Medium',
    fontSize: 13,
    color: 'rgba(0, 0, 0, 0.4)',
    marginBottom: 6,
  },
  infoTime: {},
  leftContainer: {
    flexDirection: 'row',
    width: '70%',
  },
  emptyInbox: {
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 18,
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
  },
});

export default Inbox;
