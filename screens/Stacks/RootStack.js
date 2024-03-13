import React from 'react';
import {View} from 'react-native';
import BottomTab from '../Tab/BottomTab';
import {Route} from '../../routes';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/Store';
import LoginStack from './LoginStack';

const RootStack = () => {
  const navigation = useSelector(state => state.screen.screen);

  switch (navigation) {
    case Route.MAIN:
      return <BottomTab />;
    case Route.LOGIN :
      return <LoginStack />
   
    default:
      return <BottomTab />;
  }
};

export default RootStack;
