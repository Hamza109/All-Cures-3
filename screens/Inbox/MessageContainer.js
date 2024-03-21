import React from 'react';
import {View, Text, Image} from 'react-native';
import {
  Avatar,
  Bubble,
  SystemMessage,
  Message,
  MessageText,
} from 'react-native-gifted-chat';
import { Color } from '../../config/GlobalStyles';

export const renderBubble = props => (
  <Bubble
    {...props}
    wrapperStyle={{
      right: {
        backgroundColor:Color.appDefaultColor,
      },
    }}
  />
);
