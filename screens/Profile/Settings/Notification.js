import {
  StyleSheet,
  Text,
  View,
  FlatList,
  SafeAreaView,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Color, FontFamily, width} from '../../../config/GlobalStyles';
import {backendHost} from '../../../Components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Divider from '../../../Components/Divider';
import NotificationIcon from '../../../assets/images/Notification.svg';
import {Modal} from 'native-base';
import ContentLoader from '../../../Components/ContentLoader';
import {useNavigation} from '@react-navigation/native';
import { Route } from '../../../routes';
const Notification = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [showModals, setShowModals] = useState(Array(11).fill(false)); // An array of state variables
  const [isLoaded, setIsLoaded] = useState(false);
  const navigation = useNavigation();

  const handlePress = index => {
    setShowModals(prevModals =>
      prevModals.map((isOpen, i) => (i === index ? !isOpen : isOpen)),
    );
  };
  const getTip = async () => {
    setIsLoaded(false);
    await axios
      .get(`${backendHost}/tip/get`)

      .then(res => {
        setData(res.data.reverse());
        console.log('notification data', res.data);
        setIsLoaded(true);
      })
      .catch(error => {});
  };
  const today = new Date().toISOString().split('T')[0];

  useEffect(() => {
    getTip();
  }, []);

  const renderTipItem = ({item, index}) => {
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
              <Pressable
                style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}
                onPress={() => handlePress(index)}>
                <NotificationIcon
                  width={10}
                  height={10}
                  style={{marginRight: 6}}
                />

                <Text style={styles.tipTitle} numberOfLines={2}>
                  {item.tip_title}
                </Text>
              </Pressable>
              <View style={styles.date}>
                <MaterialIcons
                  name="calendar"
                  style={{}}
                  color={Color.appDefaultColor}
                />

                <Text style={styles.tipDate}>
                  {item.tip_date.split('T')[0]}
                </Text>
              </View>
            </View>
          </View>
          <Modal
            isOpen={showModals[index]}
            onClose={() => handlePress(index)}
            _backdrop={{
              _dark: {
                bg: 'coolGray.800',
              },
              bg: 'warmGray.50',
            }}>
            <Modal.Content maxWidth="350" maxH="212">
              <Modal.CloseButton />
              <Modal.Header>Tip</Modal.Header>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(Route.ARTICLES_READ, {
                    articleId: item.article_id,
                    title: item.article_title,
                  })
                }>
                <Modal.Body>{item.tip_title}</Modal.Body>
              </TouchableOpacity>
            </Modal.Content>
          </Modal>
        </View>
        <Divider />
      </>
    );
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
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
        </View>
      </View>
      {isLoaded ? (
        <FlatList
          data={data.slice(0, 10)}
          renderItem={renderTipItem}
          showsVerticalScrollIndicator={false}
          estimatedItemSize={80} // Replace 80 with the estimated height of your items
        />
      ) : (
        <ContentLoader />
      )}
    </SafeAreaView>
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
