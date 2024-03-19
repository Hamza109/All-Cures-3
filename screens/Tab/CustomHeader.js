import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Share,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {FontFamily, Color} from '../../config/GlobalStyles';
import Back from '../../assets/images/BACK.svg';
import {useNavigation, CommonActions} from '@react-navigation/native';
import {Platform} from 'react-native';
import Line from '../../assets/images/Line.svg';
import ShareButt from '../../assets/images/share.svg';
import Heart from '../../assets/images/heart.svg';
import {useToast} from 'native-base';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome';
import {backendHost} from '../../Components/apiConfig';
const CustomHeader = ({title, id}) => {
  const navigation = useNavigation();
  const [addFav, setAddFav] = useState();
  const toast = useToast();
  const [toggle, setToggle] = useState();
  const profile = useSelector(state => state.profile.data);
  const handleBack = () => {
    navigation.dispatch(CommonActions.goBack());
  };
  useEffect(() => {
    console.log('started');
    stat();
  }, [addFav]);
  const stat = async () => {
    console.log('Initiated');

    try {
      const {data} = await axios.get(
        `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${id}/favourite`,
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
        message: `https://all-cures.com/cure/${id}-${title}`,
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
  const favorite = async status => {
    if (addFav == 0) {
      console.log('addFav');
      await axios
        .post(
          `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${id}/status/1/create`,
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
          `${backendHost}/favourite/userid/${profile.registration_id}/articleid/${id}/status/1/delete`,
        )
        .then(res => {
          console.log(res.data);
          if (res.data > 0) {
            Alert.alert('Removed from favorite');
            setAddFav(2);
          }
        })
        .catch(err => {
          err;
          throw err;
        });
    }
  };
  return (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleBack}
          style={{padding: 5, alignItems: 'center', justifyContent: 'center'}}>
          <Back />
        </TouchableOpacity>

        <View
          style={{
            flexDirection: 'row',
            width: 50,
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}>
          {}
          <TouchableOpacity
            style={{alignItems: 'center', justifyContent: 'center'}}
            onPress={() => {
              if (profile.registration_id != 0) {
                favorite();
              } else {
                dispatch(screen(Route.LOGIN));
              }
            }}>
            {addFav == 0 ? (
              <Icon name="heart-o" color={Color.appDefaultColor} size={15} />
            ) : (
              <Icon name="heart" color={Color.appDefaultColor} size={15} />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center'}}>
            <Line width={'15'} height={'15'} />
          </TouchableOpacity>
          <TouchableOpacity onPress={onShare} style={{}}>
            <ShareButt width={'15'} height={'15'} />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider}></View>
    </>
  );
};

export default CustomHeader;

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    width: '100%',
    height: 38,
    paddingHorizontal: 17,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text: {
    padding: 5,

    flex: 1,
  },
  headerText: {
    textAlign: Platform.OS === 'ios' ? 'center' : 'left',
    fontSize: 18,
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorDarkslategray,
    marginLeft: 10,
  },
  divider: {
    borderWidth: 0.2,
    borderColor: Color.colorGainsboro,
  },
});
