import React, {useState, useEffect} from 'react';
import {View, Text, Alert, KeyboardAvoidingView} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import {Image} from 'react-native';
import initialMessages from './messages';
import {Svg, Path} from 'react-native-svg';
import {
  renderInputToolbar,
  renderActions,
  renderComposer,
  renderSend,
} from './InputToolbar';
import {
  renderBubble,
  renderSystemMessage,
  renderMessage,
  renderMessageText,
  renderCustomView,
} from './MessageContainer';
import {StackActions} from '@react-navigation/native';
import {
  InputToolbar,
  Actions,
  Composer,
  Send,
  Message,
} from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Foundation from 'react-native-vector-icons/Foundation';
import {StatusBar} from 'native-base';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';
import {Color} from '../../config/GlobalStyles';

const CHAT_SERVER_URL = 'wss://uat.all-cures.com:8000';

const Chat = ({route}) => {
  const navigation = useNavigation();
  const chatData = route.params.messages;
  const Id = route.params.id;
  const FIRST_NAME = route.params.first_name;
  const LAST_NAME = route.params.last_name;
  const chatid = route.params.chatId;
  const [text, setText] = useState('');
  const [messages, setMessages] = useState([]);
  const [socket, setSocket] = useState(null);
  const profile = useSelector(state => state.profile.data);
  const user = profile.registration_id;

  const [selectedMessageId, setSelectedMessageId] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      title: `Dr. ${FIRST_NAME} ${LAST_NAME}`,
    });
  });

  useEffect(() => {
    setMessages(chatData.reverse());

    if (!socket || socket.readyState === WebSocket.CLOSED) {
      setupSocket();
    }
    return () => {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.close();
      }
    };
  }, [socket]);

  const setupSocket = () => {
    const newSocket = new WebSocket(CHAT_SERVER_URL);

    newSocket.onopen = event => {
      newSocket.send(`{"Room_No":"${chatid}"}`);
    };
    newSocket.onmessage = event => {
      const fromId = event.data.split(':')[0];
      const message = event.data.split(':').pop();

      const transformedMessages = {
        _id: Math.random().toString(36).substring(2, 9),
        text: message,
        createdAt: new Date(),
        user: {
          _id: fromId,
        },
      };
      setMessages(prevMessages =>
        GiftedChat.append(prevMessages, transformedMessages),
      );
    };
    newSocket.onclose = function (event) {
      if (event.wasClean) {
        console.log(
          `[close] Connection closed cleanly, code=${event.code} reason=${event.reason}`,
        );
      } else {
        console.log('[close] Connection died');
      }
    };
    setSocket(newSocket);
  };

  const sendMessage = (newMessages = []) => {
    setMessages(prevMessages => GiftedChat.append(prevMessages, newMessages));
    const message = newMessages[0];
    const fromId = user;
    const toId = Id;
    const chat_id = chatid;
    const payload = `${fromId}:${toId}:${chat_id}:${message.text}`;
    console.log(payload);

    socket.send(payload);
    socket.onerror = error => {
      console.error('Socket error:', error);
      // Handle error, e.g., retry or notify the user
    };
  };

  const renderSend = props => (
    <Send {...props}>
      <View>
        <Icon
          name="send"
          size={24}
          color={Color.appDefaultColor}
          style={{marginBottom: 10}}
        />
      </View>
    </Send>
  );

  const renderMessage = props => <Message {...props} />;

  return (
    <>
      <StatusBar
        backgroundColor={Color.lightpurple}
        barStyle={'light-content'}
      />
      <KeyboardAvoidingView
        behavior="padding"
        keyboardVerticalOffset={-210}
        style={{flex: 1}}>
        <GiftedChat
          wrapInSafeArea={false}
          messagesContainerStyle={{backgroundColor: Color.lightpurple}}
          messages={messages}
          text={text}
          selectedMessageId={selectedMessageId}
          onInputTextChanged={message => setText(message)}
          onSend={sendMessage}
          user={{_id: `${user}`, name: user}}
          alignTop
          alwaysShowSend
          scrollToBottom
          bottomOffset={26}
          renderInputToolbar={renderInputToolbar}
          renderSend={renderSend}
          renderAvatar={null}
          renderBubble={renderBubble}
          renderSystemMessage={null}
          renderMessage={renderMessage}
          renderMessageText={renderMessageText}
          renderCustomView={null}
          // renderMessageImage

          parsePatterns={linkStyle => [
            {
              pattern: /#(\w+)/,
              style: linkStyle,
              onPress: tag => console.log(`Pressed on hashtag: ${tag}`),
            },
          ]}
        />
      </KeyboardAvoidingView>
    </>
  );
};

export default Chat;
