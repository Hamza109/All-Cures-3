import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet,SafeAreaView,TouchableOpacity} from 'react-native';
import {Input} from 'native-base';
import {width, height, FontFamily, Color} from '../../config/GlobalStyles';
import {backendHost,headers} from '../../Components/apiConfig';
import NotificationIcon from '../../assets/images/Notification.svg';
import { Route } from '../../routes';
import ArticlesCard from '../../Components/ArticleCard';
import MyLoader from '../../Components/ContentLoader';
import { FlashList } from '@shopify/flash-list';

const SearchResults = ({route}) => {

    const [data,setData]=useState([])
    const [Loaded, setLoaded] = useState(false);

    const medicineId=route.params.medicineId

    const searchByMedicine= async ()=>{
        const response = await fetch(
                    `${backendHost}/isearch/medicinetype/${medicineId}`,
                    {
                      headers: headers
                    },
                  );
        const medicineResult = await response.json();

console.log('medicine',medicineResult)

        setData(medicineResult)
        setLoaded(true)


        


    }

    useEffect(()=>{
searchByMedicine()
    },[medicineId])

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
                    navigation.push(Route.ARTICLES_READ, {
                      articleId: item.article_id,
                    });
                }}>
                <ArticlesCard
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
  <View style={styles.feedHeader}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 36,
              marginLeft: 5,
            }}>
            <Text style={styles.read}>Search Results</Text>
            <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
          </View>
          </View>
          {Loaded ? (
        <FlashList
          estimatedItemSize={100}
          keyExtractor={item => item.article_id.toString()}
          data={data}
          renderItem={renderItem}
         
        />
      ) : (
        <MyLoader />
      )}
          
   </SafeAreaView>
  )
}

export default SearchResults



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
  
  
  });