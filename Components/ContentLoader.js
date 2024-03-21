import React from 'react'
import {ActivityIndicator, StyleSheet, View,Text} from 'react-native';
import { Color } from '../config/GlobalStyles';
function ContentLoader() {
  return (
    <View style={[styles.container]}>
   
    <ActivityIndicator size="large" color={Color.appDefaultColor} />
    <Text style={{textAlign:'center'}}> Please Wait ...</Text>
  </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default ContentLoader