import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Color,width } from '../../../config/GlobalStyles'
import NotificationIcon from '../../../assets/images/Notification.svg';
const TipOfTheDay = () => {
  return (
    <View style={{flex:1,backgroundColor:'#fff'}}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Tip of the Day</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>
    </View>
  )
}

export default TipOfTheDay

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