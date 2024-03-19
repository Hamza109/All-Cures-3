import React, { useState } from 'react'
import { View,SafeAreaView,StyleSheet,Text } from 'react-native'
import { Input, useSafeArea } from 'native-base'
import { FontFamily,width,Color } from '../../config/GlobalStyles'
import NotificationIcon from '../../assets/images/Notification.svg';
import InactiveSearch from '../../assets/images/INACTIVE_SEARCH.svg';
const SearchInput = ({navigation,route}) => {
    const header=route.params.header
    const placeholder=route.params.placeholder
    const key= route.params.key
    const [text,setText] = useState()
  return (
   <SafeAreaView style={styles.container} >
     <View style={styles.feedHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 36,
              marginLeft: 5,
            }}>
            <Text style={styles.read}>{header}</Text>
            <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
          </View>
          </View>
          <View style={{paddingHorizontal:26}}>
  <Input
          placeholder={placeholder}
          height={12}
          color={'#fff'}
          borderColor={'rgba(76, 78, 100, 0.22)'}
          _focus={{
            borderWidth: 1,
            borderColor: 'rgba(76, 78, 100, 0.54)',
            color: '#fff',
            placeholderTextColor: 'rgba(76, 78, 100, 0.6)',
            bg: '#fff',
          }}
          autoCapitalize="none"
          returnKeyType="done"
          rightElement={
            
            <View style={{marginRight:20}}>
            <InactiveSearch width={16} height={16} />
            </View>
          }
        />
        </View>
   </SafeAreaView>

  )
}

export default SearchInput


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
    },


    feedHeader: {
      height: 102,
      width: width,
      backgroundColor: '#fff',
      paddingHorizontal: 20,
    },
    read: {
      color: Color.colorDarkslategray,
      fontWeight: '700',
      fontSize: 25,
    },
  
  });