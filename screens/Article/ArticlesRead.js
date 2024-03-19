import {
  View,
  Text,
  Pressable,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Animated,
} from 'react-native';
import React, {useEffect, useState, memo, useRef} from 'react';
import NetInfo from '@react-native-community/netinfo';
import {backendHost} from '../../Components/apiConfig';
import {Route} from '../../routes';
import {Border, Color, FontFamily} from '../../config/GlobalStyles';
import moment from 'moment';
import Dot from '../../assets/images/dot.svg';
import Right from '../../assets/images/RIGHT.svg';
import {width, height} from '../../config/GlobalStyles';
import CenterWell1 from '../Disease/CenterWell1';
import ContentLoader from '../../Components/ContentLoader';
import RelatedCard from '../../Components/RelatedCard';
import CustomHeader from '../Tab/CustomHeader';
const ratio = width / 378;
const ArticlesRead = ({route, navigation}) => {
  const [title, setTitle] = useState(route.params.title);

  const [isConnected, setIsConnected] = useState(true);
  const [data, setData] = useState([]);
  const [items, setItems] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [id, setId] = useState(route.params.articleId);
  const [relatedItem, setRelatedItem] = useState([]);

  const abortController = new AbortController();
  const signal = abortController.signal;

  const scrollY = useRef(new Animated.Value(0)).current;

  const handleScroll = Animated.event(
    [{nativeEvent: {contentOffset: {y: scrollY}}}],
    {useNativeDriver: false},
  );
  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  useEffect(() => {
    NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
    });
  }, [isConnected]);
  useEffect(() => {
    const getArticle = async () => {
      try {
        if (isConnected) {
          const response = await fetch(`${backendHost}/article/${id}`, {
            signal: signal,
          });
          const json = await response.json();
          console.log(json);

          const relatedArticlesResponse = await fetch(
            `${backendHost}/isearch/${json.dc_name}`,
            {
              signal: signal,
            },
          );
          const relatedArticlesJson = await relatedArticlesResponse.json();
          console.log('relatedItems', relatedArticlesJson[0].authors_name);

          setData(json);
          setRelatedItem(relatedArticlesJson);

          try {
            console.log(
              'content',
              JSON.parse(decodeURIComponent(json.content)),
            );
  
            const contentBlocks = await JSON.parse(
              decodeURIComponent(json.content),
            ).blocks;
            setIsLoaded(true);
  
            setItems(contentBlocks);
          } catch (error) {
            console.log(error);
            
          }
          
       
        }
      } catch (err) {
        console.error(err);
        // Handle the error as needed
      } finally {
        setIsLoaded(true);
      }
    };

    // Call the function immediately
    getArticle();

    // Cleanup function (will be called when the component unmounts or when isConnected changes)
    return () => {
      abortController.abort();
    };
  }, []); // Dependencies for the useEffect

  // const onScroll = e => {
  //   let contentoffsetY = e.nativeEvent.contentOffset.y;

  //   let diff = contentoffsetY - scroll;
  //   console.log('diff', diff);

  //   setTimeout(() => {
  //     if (diff <= 0 || scroll <= 0) {
  //       navigation.setOptions({
  //         headerShown: true,
  //         tabBarStyle: {height: 30},
  //       });
  //       dispatch(bottomHeight(60));
  //     } else {
  //       navigation.setOptions({
  //         headerShown: false,
  //         tabBarStyle: {height: 30},
  //       });
  //       dispatch(bottomHeight(0));
  //     }
  //   }, 500); // 500 milliseconds (adjust as needed)

  //   console.log('Y Axis', contentoffsetY);
  //   scroll = contentoffsetY;
  // };
  const headerMarginTop = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [40, 0], // Adjust these values based on your design
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.readContainer}>
      <Animated.View style={[styles.animatedHeader, {opacity: headerOpacity}]}>
        <CustomHeader title={title} id={id} />
      </Animated.View>

      {isLoaded ? (
        <Animated.ScrollView
          showsVerticalScrollIndicator={false}
          style={[styles.scroll, {marginTop: headerMarginTop}]}
          onScroll={handleScroll}>
          <View style={{paddingBottom: 20, paddingHorizontal: 3}}>
            <Text style={styles.title}>{data.title}</Text>

            <Text style={styles.time}>
              {moment(`${data.create_date}`, 'YYYYMMDD').fromNow()}{' '}
              <Dot height={5} width={5} /> {data.authors_name}
            </Text>

            {items.map((i, key) => (
              <View style={{marginTop: 11}} key={Math.random().toString(36)}>
                <CenterWell1
                  key={Math.random().toString(36)}
                  pageTitle={i.title}
                  type={i.type}
                  text={i.data.text}
                  title={i.data.title}
                  message={i.data.message}
                  source={i.data.source}
                  embed={i.data.embed}
                  caption={i.data.caption}
                  alignment={i.data.alignment}
                  imageUrl={i.data.file ? i.data.file.url : null}
                />
              </View>
            ))}
          </View>

          <View style={{marginBottom: 20, paddingHorizontal: 3}}>
            <Text style={[styles.h2_text, {color: '#000'}]}>Approach</Text>
            <View style={styles.approachCard}>
              <Image
                source={require('../../assets/images/ayurvedic.jpg')}
                style={styles.approachImage}
              />

              <View style={styles.approachData}>
                <Text
                  style={{
                    fontFamily: FontFamily.poppinsRegular,
                    fontSize: 8,
                    color: Color.colorDarkslategray,
                  }}>
                  System Of Medicine
                </Text>
                <Text
                  style={{
                    fontFamily: FontFamily.poppinsBold,
                    fontSize: 15,
                    color: Color.colorDarkslategray,
                  }}>
                  {data.medicine_type_name}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate(Route.ARTICLES_BY_MEDICINE, {
                      medicineData: {
                        name: data.medicine_type_name,
                        type: data.medicine_type,
                      },
                    });
                  }}>
                  <Text
                    style={{
                      color: '#5E4DB0',
                      fontFamily: FontFamily.poppinsBold,
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    View More <Right width={5} height={8} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{paddingVertical: 20, paddingHorizontal: 3}}>
            <Text style={[styles.h2_text, {color: Color.colorDarkslategray}]}>
              Related
            </Text>

            {relatedItem
              .filter((item, index) => index < 7)
              .map((related, key) => {
                let imageLoc = '';
                const imgLocation = related.content_location;
                if (
                  imgLocation &&
                  imgLocation.includes('cures_articleimages')
                ) {
                  imageLoc =
                    `https://all-cures.com:444/` +
                    imgLocation.replace('json', 'png').split('/webapps/')[1];
                } else {
                  imageLoc =
                    'https://all-cures.com:444/cures_articleimages//299/default.png';
                }
                return (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push(Route.ARTICLES_READ, {
                        articleId: related.article_id,
                      });
                    }}
                    activeOpacity={0.7}
                    key={`${key}-${related.articleId}`}>
                    <RelatedCard
                      author={related.authors_name}
                      title={related.title}
                      image={imageLoc}
                      published_date={related.published_date}
                    />
                  </TouchableOpacity>
                );
              })}
          </View>
        </Animated.ScrollView>
      ) : (
        <ContentLoader />
      )}
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  readContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scroll: {
    paddingHorizontal: 23,
    paddingVertical: 20,
  },
  title: {
    color: Color.colorDarkslategray,
    fontFamily: FontFamily.poppinsRegular,
    fontWeight: '700',
    fontSize: 23,
  },
  coverImage: {
    width: '100%',
    height: 378 * ratio,
    borderRadius: Border.br_10xs,
  },
  time: {
    fontSize: 8,
    fontFamily: FontFamily.poppinsRegular,
    lineHeight: 12,
    color: Color.colorDarkgray,
    fontWeight: '700',
    marginTop: 10,
  },
  h2_text: {
    fontFamily: FontFamily.poppinsBold,
    fontSize: 18,
  },
  approachCard: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 20,
  },
  approachData: {
    justifyContent: 'space-between',
    marginLeft: 10,
  },
  approachImage: {
    width: 105,
    height: 105,
  },
  animatedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default memo(ArticlesRead);
