import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {width, height, Color, FontFamily} from '../../config/GlobalStyles';

import {backendHost} from '../../Components/apiConfig';
import { headers } from '../../Components/apiConfig';
import ContentLoader from '../../Components/ContentLoader';
import {FlashList} from '@shopify/flash-list';
import ArticleCard from '../../Components/ArticleCard';
import {useNavigation} from '@react-navigation/native';
const ArticlesByMedicine = ({route}) => {
  const [loading, setLoading] = useState(false);
  const [initial, setInitial] = useState(9);
  const [item, setItems] = useState([]);
  const [Loaded, setLoaded] = useState(false);
  const navigation = useNavigation();
  const medicineData = route.params.medicineData;
  useEffect(() => {
    itype();
  }, []);
  useEffect(() => {
    // Dynamically set the title based on the current article
    const currentArticleTitle = `${medicineData.name}`; // Replace with your dynamic title logic
    navigation.setOptions({
      title: currentArticleTitle,
    });
  }, [navigation]);
  const itype = async () => {
    try {
      setLoading(true);

      const response = await fetch(
        `${backendHost}/isearch/medicinetype/${medicineData.type}`,
        {
          headers: headers,
        },
      );
      if (!response.ok) {
        Alert.alert('Reload');
      }

      const json = await response.json();

      setInitial(prevInitial => prevInitial + 6);
      setItems(json);
      setLoaded(true);
    } catch (error) {
      console.error(error);
      // Handle the error as needed
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => console.log(medicineData));
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
        onPress={() => {
          console.log(`${item.article_id}`),
            navigation.push(ARTICLES_READ, {
              articleId: item.article_id,
            });
        }}>
        <ArticleCard
          title={item.title}
          window_title={item.authors_name}
          create_date={item.create_date}
          image_location={imageLoc}
          dc_name={item.dc_name}
        />
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.feedContainer}>
    {Loaded ? (
      <FlashList
        estimatedItemSize={100}
        keyExtractor={item => item.article_id.toString()}
        data={item}
        renderItem={renderItem}
      />
    ) : (
      <ContentLoader />
    )}
  </SafeAreaView>
  );
};

export default ArticlesByMedicine;

const styles = StyleSheet.create({
    feedContainer: {
      flex: 1,
      backgroundColor: '#fff',
    },
    feedHeader: {
      height: 97,
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
