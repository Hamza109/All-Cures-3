import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BottomTab from './screens/Tab/BottomTab';
import {Provider} from 'react-redux';
import RootStack from './screens/Stacks/RootStack';
import {store} from './Redux/Store';
import {NativeBaseProvider} from 'native-base';

const App = () => {
  return (
    <Provider store={store}>
       <NativeBaseProvider>
      <NavigationContainer>
        <RootStack />
      </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
