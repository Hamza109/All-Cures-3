import React from 'react';
import BottomTab from '../Tab/BottomTab';
import {Route} from '../../routes';
import {useSelector} from 'react-redux';
import LoginStack from './LoginStack';
import ProfileStack from './ProfileStack';
const RootStack = () => {
  const navigation = useSelector(state => state.screen.screen);

  switch (navigation) {
    case Route.MAIN:
      return <BottomTab />;
    case Route.LOGIN:
      return <LoginStack />;
    case Route.PROFILE:
      return <ProfileStack />;

    default:
      return <BottomTab />;
  }
};

export default RootStack;
