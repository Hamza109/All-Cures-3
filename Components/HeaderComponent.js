import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import { width,height,Color } from '../config/GlobalStyles';
const HeaderComponent = ({title}) => {
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
