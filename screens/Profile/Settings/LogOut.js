import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color,width } from '../../../config/GlobalStyles'
const LogOut = () => {
  return (
    <View>
      <Text>LogOut</Text>
    </View>
  )
}

export default LogOut

const styles = StyleSheet.create({
    feedHeader: {
        height: 100,
        width: width,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
      },
      read: {
        color: Color.colorDarkslategray,
        fontWeight: '700',
        fontSize: 25,
      },
})