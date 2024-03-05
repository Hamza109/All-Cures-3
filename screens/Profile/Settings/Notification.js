import {StyleSheet, Text, View, FlatList} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color, FontFamily, width} from '../../../config/GlobalStyles';
import {backendHost} from '../../../Components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Divider from '../../../Components/Divider';
import NotificationIcon from '../../../assets/images/Notification.svg';
const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  const getTip = async () => {
    await axios
      .get(`${backendHost}/tip/get`)

      .then(res => {
        setData(res.data.reverse());
        console.log(res.data);
        setLoading(true);
      })
      .catch(error => {});
  };
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getTip();
  }, []);

  const renderTipItem = ({item}) => {
    return (
      <>
        <View
          style={[
            styles.tipView,
            {
              backgroundColor: item.tip_date.startsWith(today)
                ? Color.lightpurple
                : null,
            },
          ]}>
          <View style={{flexDirection: 'row', padding: 10}}>
            <View style={styles.tipBody}>
              <View
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <NotificationIcon
                  width={10}
                  height={10}
                  style={{marginRight: 6}}
                />

                <Text style={styles.tipTitle}>{item.tip_title}</Text>
              </View>
              <View style={styles.date}>
                <MaterialIcons
                  name="calendar"
                  style={{}}
                  color={Color.appDefaultColor}
                />
                <Text> </Text>
                <Text style={styles.tipDate}>
                  {item.tip_date.split('T')[0]}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <Divider />
      </>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
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
          <MaterialIcons
            name="lightbulb-multiple"
            size={30}
            style={{}}
            color={Color.appDefaultColor}
          />
        </View>
      </View>
      <FlashList
        data={data}
        renderItem={renderTipItem}
        removeClippedSubviews
        estimatedItemSize={80} // Replace 80 with the estimated height of your items
      />
    </View>
  );
};

export default Notification;

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
  tipView: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',

    margin: 2,

    alignSelf: 'center',
    borderRadius: 5,
  },
  tipTitle: {
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
  },
  tipDate: {
    fontFamily: FontFamily.poppinsBold,

    fontSize: 9,
  },
  tipBody: {
    flex: 1,

    justifyContent: 'space-evenly',
  },
  tipIcon: {
    justifyContent: 'center',
    marginRight: 5,
  },

  date: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    color: Color.colorDarkslategray,
  },
});
