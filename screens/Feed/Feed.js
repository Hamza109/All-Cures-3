import React, {useEffect, useState, memo, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  StatusBar,
  Platform,
  RefreshControl,
  Pressable,
  Alert,
} from 'react-native';
import {FontFamily, Color} from '../../config/GlobalStyles';
import ContentLoader from '../../Components/ContentLoader';
import axios from 'axios';
import NetInfo from '@react-native-community/netinfo';
import ArticleCard from '../../Components/ArticleCard';
import {width, height} from '../../config/GlobalStyles';
import NotificationIcon from '../../assets/images/Notification.svg';
import ArticlesCard from '../../Components/ArticleCard';
import {backendHost, headers} from '../../Components/apiConfig';
import {FlashList} from '@shopify/flash-list';
import LottieView from 'lottie-react-native';
import {Route} from '../../routes';
import {useDispatch, useSelector} from 'react-redux';
import {option} from '../../Redux/Slice/OptionSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderComponent from '../../Components/HeaderComponent';
import Reload from '../../Components/Reload';
import {Button} from 'native-base';
import {Modal} from 'native-base';
import {screen} from '../../Redux/Slice/screenNameSlice';
import AppointmentModal from '../../Components/AppointmentModal';
const Feed = ({navigation}) => {
  const [isConnected, setIsConnected] = useState(true);
  const [diseaseId, setDiseaseId] = useState(null);
  const [item, setItem] = useState();
  const [Loaded, setLoaded] = useState(false);
  const [articleId, setArticleId] = useState();
  const [modalVisible, setModalVisible] = React.useState(false);
  const abortController = new AbortController();
  const signal = abortController.signal;
  const initialRef = useRef(null);
  const finalRef = React.useRef(null);
  const profileInfo = useSelector(state => state.profile.data);
  const getUrl = async () => {
    const videoUrl = await AsyncStorage.getItem('url');
    const url = videoUrl != null ? JSON.parse(videoUrl) : null;

    if (url != null) {
      console.log('video', url);
      navigation.navigate(Route.VIDEOCALL, {
        url: ` https://${url}`,
      });
      AsyncStorage.removeItem('url');
    }
  };

  const getValue = async () => {
    const myValue = await AsyncStorage.getItem('artId');
    const myObject = myValue != null ? JSON.parse(myValue) : null;

    // Log the retrieved object
    if (myObject !== null) {
      console.log('id in if ', myObject.id);
      navigation.navigate(Route.ARTICLES_READ, {
        articleId: myObject.id,
      });

      AsyncStorage.removeItem('artId');
    }
  };
  const dispatch = useDispatch();
  const DATA = [
    {dc_id: 1, category: 'Arthritis'},
    {dc_id: 12, category: 'Blood Disorders'},
    {dc_id: 14, category: 'Bones and Joints'},
    {dc_id: 16, category: 'Brain and Nervous'},
    {dc_id: 25, category: 'Cancer'},
    {dc_id: 43, category: 'Cardiovascular'},
    {dc_id: 56, category: 'Digestive Disorders'},
    {dc_id: 73, category: 'Endocrine and metabolic Diseases'},
    {dc_id: 88, category: 'Eye Health'},
    {dc_id: 93, category: 'Foot Problems'},
    {dc_id: 95, category: 'Infection'},
    {dc_id: 97, category: 'Infectious Diseases'},
    {dc_id: 108, category: 'Injuries'},
    {dc_id: 110, category: 'Lung and Respiratory Health'},
    {dc_id: 117, category: 'Mental Health'},
    {dc_id: 131, category: 'Pain Management'},
    {dc_id: 138, category: 'Sensitive topics'},
    {dc_id: 145, category: 'Sexual Health'},
    {dc_id: 155, category: 'Skin Problems'},
    {dc_id: 163, category: 'Sleep Disorders'},
    {dc_id: 168, category: 'Urinary Disorders'},
    {dc_id: 176, category: 'Healthy Lifestyle'},
  ];

  useEffect(() => {
    getValue();
    getUrl();
  });

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);

  async function getFeaturedArticle() {
    try {
      const response = await fetch(`${backendHost}/article/allkvranked`, {
        method: 'GET',
        headers: headers,
        signal: signal,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      // Using map directly to create the array
      setArticleId(json[0].article_id);
      setItem(json);
      setLoaded(true);
      setModalVisible(true);
    } catch (err) {
      console.error(err);
      // Handle errors, e.g., show an error message to the user
    }
  }

  async function getArticleByDisease() {
    try {
      console.log('get By disease running');
      const response = await fetch(
        `${backendHost}/isearch/diseases/${diseaseId}`,
        {headers: headers, signal: signal},
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const json = await response.json();

      setItem(json);
      setLoaded(true);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Request aborted');
      } else {
        throw new Error(error);
      }
      // Handle errors, e.g., show an error message to the user
    }
  }

  useEffect(() => {
    setLoaded(false);

    if (diseaseId == null) {
      getFeaturedArticle();
    } else {
      getArticleByDisease();
    }

    return () => {
      abortController.abort();
    };
  }, [diseaseId]);
  const selectFeatured = () => {
    setDiseaseId(null);
  };

  const selectItem = item => {
    setDiseaseId(item.dc_id);
  };

  const renderItem = ({item}) => {
    let imageLoc = '';
    const imgLocation = item.content_location;
    if (imgLocation && imgLocation.includes('cures_articleimages')) {
      imageLoc =
        `https://all-cures.com:444/` +
        imgLocation.replace('json', 'png').split('/webapps/')[1];
    } else {
      imageLoc =
        'https://all-cures.com:444/cures_articleimages//299/default.png';
    }

    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() =>
          navigation.navigate(Route.ARTICLES_READ, {
            articleId: item.article_id,
            title: item.title,
          })
        }>
        <ArticlesCard
          title={item.title}
          window_title={item.authors_name}
          create_date={item.published_date}
          image_location={imageLoc}
          dc_name={item.med_type_name}
          articleId={item.article_id}
        />
      </TouchableOpacity>
    );
  };
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const [LoadingModal, setIsLoading] = useState(false);
  const handleSchedule = () => {
    setIsLoading(true);
    // if (Object.keys(profileInfo).length) {
    //   navigation.navigate(Route.APPOINTMENT);
    // } else {
    //   dispatch(screen(Route.LOGIN));
    // }
  };


  return (
    // feed container
    <SafeAreaView style={styles.feedContainer}>
      {!isConnected ? <Reload /> : null}
      {/* header component */}

      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Read</Text>
          <Pressable
            onPress={() => {
              navigation.navigate(Route.NOTIFICATION);
            }}>
            <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
          </Pressable>
        </View>

        <ScrollView
          horizontal
          style={{padding: 5, flex: 1, marginTop: 20}}
          showsHorizontalScrollIndicator={false}>
          <View style={{paddingRight: 11}}>
            <TouchableOpacity
              style={
                Platform.OS === 'ios'
                  ? diseaseId === null
                    ? styles.activeLabel
                    : styles.inactiveLabel
                  : null
              }
              onPress={selectFeatured}>
              <Text
                style={[
                  styles.featured,
                  diseaseId === null
                    ? styles.activeLabel
                    : styles.inactiveLabel,
                ]}>
                Featured
              </Text>
            </TouchableOpacity>
          </View>

          {DATA.map((item, index) => {
            return (
              <View key={item.dc_id} style={{paddingHorizontal: 11}}>
                <TouchableOpacity
                  style={
                    Platform.OS === 'ios'
                      ? item.dc_id === diseaseId
                        ? styles.activeLabel
                        : styles.inactiveLabel
                      : null
                  }
                  onPress={() => {
                    selectItem(item);
                  }}>
                  <Text
                    style={[
                      styles.category,
                      item.dc_id === diseaseId
                        ? styles.activeLabel
                        : styles.inactiveLabel,
                    ]}>
                    {item.category}
                  </Text>
                </TouchableOpacity>
              </View>
            );
          })}
        </ScrollView>
      </View>
      {profileInfo.docID == 0 ? (
        !LoadingModal ? (
          <Modal
            isOpen={modalVisible}
            onClose={() => setModalVisible(false)}
            finalFocusRef={finalRef}>
            <Modal.Content>
              <Modal.CloseButton
                onPress={() => {
                  setModalVisible(false);
                }}
              />
              <Modal.Header>Looking For a Doctor?</Modal.Header>

              <View>
                <Modal.Body>
                  <View
                    style={{justifyContent: 'center', alignItems: 'center'}}>
                    <LottieView
                      source={require('../../assets/animations/doc.json')}
                      style={{width: width, height: 100}}
                      autoPlay={true}
                      loop={false}
                    />
                    <Text
                      style={{
                        fontSize: 14,
                        color: Color.colorDarkslategray,
                        paddingVertical: 15,
                        textAlign: 'center',
                        fontWeight: '400',
                        marginTop: 5,
                      }}>
                      Connect with our expert doctors from the comfort of your
                      home through video consultation. Enjoy personalized
                      medical advice without the need for a physical visit.
                      Click "Schedule Now" to book your appointment.
                    </Text>
                  </View>
                </Modal.Body>
                <Modal.Footer>
                  <Button.Group space={2}>
                    <Button
                      onPress={() => {
                        handleSchedule();
                      }}
                      backgroundColor="#5E4DB0">
                      Schedule Now
                    </Button>
                  </Button.Group>
                </Modal.Footer>
              </View>
            </Modal.Content>
          </Modal>
        ) : (
          <AppointmentModal />
        )
      ) : null}

      {Loaded ? (
        <FlashList
          estimatedItemSize={100}
          keyExtractor={item => item.article_id.toString()}
          data={item}
          renderItem={renderItem}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          onScroll={() => {
            dispatch(option(-100));
          }}
        />
      ) : (
        <ContentLoader />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  feedContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: 132,
    width: width,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  read: {
    color: Color.colorDarkslategray,
    fontWeight: '700',
    fontSize: 25,
  },
  category: {
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 10,
    width: 'auto',
  },

  featured: {
    fontFamily: FontFamily.poppinsBold,
    color: Color.colorSilver,
    fontSize: 10,
  },

  activeLabel: {
    color: Color.colorDarkslategray,
    borderBottomWidth: 2,
    borderColor: '#5E4DB0',
  },

  inactiveLabel: {
    color: Color.colorSilver,
  },
});

export default memo(Feed);
