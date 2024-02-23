import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import BottomTab from './screens/Tab/BottomTab'
import { Provider } from 'react-redux'
import RootStack from './screens/Stacks/RootStack'
import { store } from './Redux/Store'

const App = () => {
  return (
<Provider store={store}>
<NavigationContainer>
<RootStack />
</NavigationContainer>
</Provider>


  )
}

export default App