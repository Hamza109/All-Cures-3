import {
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  Pressable,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, height} from '../config/GlobalStyles';
import ShareButt from '../assets/images/share.svg';
import {backendHost} from './apiConfig';

import Icon from 'react-native-vector-icons/FontAwesome';
import Line from '../assets/images/Line.svg';
import {ARTICLES_READ, Route} from '../routes';
import {useNavigation} from '@react-navigation/native';
import moment from 'moment/moment';
import {option} from '../Redux/Slice/OptionSlice';
import Dot from '../assets/images/dot.svg';
import DotOption from '../assets/images/dotOption.svg';
import {FontFamily} from '../config/GlobalStyles';
import {useSelector, useDispatch} from 'react-redux';
import {Color} from '../config/GlobalStyles';
import {useToast} from 'native-base';
import {screen} from '../Redux/Slice/screenNameSlice';
import axios from 'axios';
const cardItemHeight = 136;
const 
ArticleCard = ({
  title,
  window_title,
  create_date,
  image_location,
  dc_name,
  articleId,
}) => {
  const createdAt = moment(`${create_date}`, 'YYYYMMDD').fromNow();
  const image = image_location;
  const toast = useToast();
  const [showOptions, setShowOptions] = useState(false);
  const optionData = useSelector(state => state.option.option);
  const navigation = useNavigation();
  const [addFav, setAddFav] = useState();
  const [toggle, setToggle] = useState();
  const profile = useSelector(state => state.profile.data);

  const dispatch = useDispatch();
  const handleOptionPress = () => {
    setShowOptions(!showOptions), console.log('Touched', showOptions);
    dispatch(option(articleId)), stat();
  };

  const goto = () => {
    toast.show({
      title: 'Added to favourites',
      description: 'Check favourites in profile.',
      status: 'info',
      placement: 'bottom',
      duration: 2000,
      style: {borderRadius: 20, width: wp('70%'), marginBottom: 20},
    });

    return true;
  };

  const favorite = async status => {
    if (addFav == 0) {
      console.log('addFav');
      await axios
        .post(
          `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${articleId}/status/1/create`,
        )
        .then(res => {
          console.log('added');
          if (res.data > 0) {
            Alert.alert('Added to Favorite');
            setAddFav(2);
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    } else {
      console.log('deleted');
      axios
        .delete(
          `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${articleId}/status/1/delete`,
        )
        .then(res => {
          console.log(res.data);
          if (res.data > 0) {
            Alert.alert('Removed from favorite');
            setAddFav(2);
            stat();
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    }
  };

  const stat = async () => {
    console.log('Initiated');

    try {
      const {data} = await axios.get(
        `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${articleId}/favourite`,
      );
      console.log('data', data);
      if (data.length == 0) {
        setAddFav(0);
      } else {
        setAddFav(1);
      }

      setToggle(data?.[0]?.status === 1 || false); // Default to false
    } catch (error) {
      console.error('Error fetching favorite status:', error);
      // Handle the error appropriately (e.g., display an error message to the user)
    }
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `https://all-cures.com/cure/${articleId}-${title}`,
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    // Article Card Component

    <View style={styles.cardContainer}>
      <Pressable
        activeOpacity={0.7}
        style={styles.detailsCardContainer}
        onPressIn={() => setShowOptions(false)}
        onPress={() => {
          dispatch(option(-85)),
            navigation.navigate(Route.ARTICLES_READ, {
              articleId: articleId,
              title: title,
              image: image_location,
            });
        }}>
        <Text style={styles.article_title}>
          {window_title}{' '}
          {dc_name !== undefined && (
            <Text style={{color: Color.colorDarkgray}}> in </Text>
          )}{' '}
          {dc_name}
        </Text>
        <Text style={styles.title} numberOfLines={2}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={styles.time}>
            10 min ago <Dot height={5} width={5} /> {createdAt}{' '}
          </Text>
        </View>
      </Pressable>
      <View style={{justifyContent: 'center'}}>
        <View
          style={{width: 100, height: 100, backgroundColor: Color.colorSilver}}>
          <ImageBackground
            style={styles.image}
            source={{
              uri: image,
            }}>
            <Pressable
              onPress={handleOptionPress}
              style={styles.optionsBtn}
              hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
              <DotOption />
            </Pressable>
            {optionData == articleId && showOptions && (
              <View style={styles.options}>
                <TouchableOpacity
                  onPress={() => {
                    if (profile.registration_id != 0) {
                      favorite();
                    } else {
                      dispatch(screen(Route.LOGIN));
                    }
                  }}>
                  {addFav == 0 ? (
                    <Icon name="heart-o" color={Color.appDefaultColor} />
                  ) : (
                    <Icon name="heart" color={Color.appDefaultColor} />
                  )}
                </TouchableOpacity>
                <TouchableOpacity>
                  <Line width={'11.74'} height={'15'} />
                </TouchableOpacity>
                <TouchableOpacity style={{}} onPress={onShare}>
                  <ShareButt width={'11.74'} height={'15'} />
                </TouchableOpacity>
              </View>
            )}
          </ImageBackground>
        </View>
      </View>
    </View>
  );
};

export default ArticleCard;

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',

    width: width,
    backgroundColor: '#fff',
    height: cardItemHeight,
    paddingHorizontal: 26,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#E3E3E3',
  },
  article_title: {
    width: width * 0.5,
    fontSize: 9,
    fontFamily: FontFamily.poppinsRegular,
    color: Color.colorDarkslategray,
    fontWeight: '400',
  },
  detailsCardContainer: {justifyContent: 'space-evenly', marginRight: 11},
  image: {width: 100, height: 100, borderRadius: 3},
  title: {
    width: width * 0.55,
    fontSize: 15,
    fontFamily: FontFamily.poppinsBold,
    lineHeight: 22.5,
    color: Color.colorDarkslategray,
    fontWeight: '700',
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: '700',
  },
  optionsBtn: {
    widht: 50,
    height: 20,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  options: {
    flexDirection: 'row',
    width: 65,
    ehight: 27,
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 6,
    position: 'absolute',
    right: 8,
    top: 20,
    elevation: 2,
  },
});
