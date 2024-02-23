import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Route } from '../../routes'
import FeedStack from '../Stacks/FeedStack'
import DoctorStack from '../Stacks/DoctorStack'
import ProfileStack from '../Stacks/ProfileStack'
const BottomTab = () => {
    const Tab=createBottomTabNavigator()
  return (
   <Tab.Navigator>
    <Tab.Screen name={Route.FEED_TAB} component={FeedStack} />
    <Tab.Screen name={Route.DOCTOR_TAB} component={DoctorStack} />
    <Tab.Screen name={Route.PROFILE_TAB} component={ProfileStack}/>
   </Tab.Navigator>
  )
}

export default BottomTab