import {StyleSheet, Text, View, TouchableOpacity, Animated} from 'react-native';
import React from 'react';
import {Color} from '../config/GlobalStyles';
import IonIcon from 'react-native-vector-icons/Ionicons';
function Reload() {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <TouchableOpacity onPress={onRefresh}>
      <Animated.View
        style={{
          width: '100%',
          height: 55,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: Color.lightpurple,
        }}
        animation="slideInDown"
        iterationCount={1}>
        <View style={{position: 'absolute', left: 12}}>
          <IonIcon
            name="information-circle"
            size={30}
            color={Color.appDefaultColor}
          />
        </View>

        <Text
          style={{
            color: 'black',
            fontFamily: 'Raleway-Medium',
            fontSize: 15,
          }}>
          {' '}
          Check your connection
        </Text>
        <Text
          style={{
            color: 'black',
            fontFamily: 'Raleway-Regular',
            fontSize: 12,
          }}>
          {' '}
          you are offline
        </Text>
      </Animated.View>
    </TouchableOpacity>
  );
}

export default Reload;

const styles = StyleSheet.create({});
