import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {width, height, Color} from '../config/GlobalStyles';
import NotificationIcon from '../assets/images/Notification.svg';
import {useNavigation} from '@react-navigation/native';
import {Route} from '../routes';
const HeaderComponent = ({title}) => {
  const navigation = useNavigation();
  return (
    <View style={styles.feedHeader}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 36,
          marginLeft: 5,
        }}>
        <Text style={styles.read}>{title}</Text>
        <Text></Text>
        <Pressable
          onPress={() => {
            navigation.navigate(Route.NOTIFICATION);
          }}>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

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
});
