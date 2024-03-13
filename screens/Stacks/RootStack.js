import React from 'react';
import {View} from 'react-native';
import BottomTab from '../Tab/BottomTab';
import {Route} from '../../routes';
import {useSelector} from 'react-redux';
import {RootState} from '../../Redux/Store';

const RootStack = () => {
  const navigation = useSelector(state => state.screen.screen);

  switch (navigation) {
    case Route.MAIN:
      return <BottomTab />;
   
    default:
      return <BottomTab />;
  }
};

export default RootStack;
