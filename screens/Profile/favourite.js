import {FlatList, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import ArticleCard from '../../Components/ArticleCard';
import {backendHost} from '../../Components/apiConfig';
import {useSelector} from 'react-redux';
import {FlashList} from '@shopify/flash-list';
import { width ,Color} from '../../config/GlobalStyles';
import ContentLoader from '../../Components/ContentLoader';
const Favourite = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const profile = useSelector(state => state.profile.data);
  console.log(profile);
  const [items, setItems] = useState();

  const data = [
    {
      article_id: 4279,
      authored_by: '[16]',
      authors_name: 'Dr. Karanvir Singh ',
      comments: '',
      content:
        '%7B%22time%22%3A1710420395239%2C%22blocks%22%3A%5B%7B%22id%22%3A%22Ay_Houa0ER%22%2C%22type%22%3A%22paragraph%22%2C%22data%22%3A%7B%22text%22%3A%22Peptic%20ulcers%5Cnare%20a%20common%20yet%20often%20misunderstood%20condition%20that%20affects%20the%20stomach%20and%5Cnsmall%20intestine.%20The%20ulcers%2C%20also%20known%20as%20gastric%20ulcers%20or%20duodenal%20ulcers%2C%5Cnare%20open%20wounds%20that%20grow%20on%20the%20lining%20of%20the%20digestive%20organs%2C%20leading%20to%20uneasiness%5Cnand%20pain.%20While%20peptic%20ulcers%20can%20be%20an%20origin%20of%20discomfort%2C%20knowing%20their%5Cncauses%2C%20symptoms%2C%20and%20treatment%20options%20can%20help%20in%20managing%20the%20condition.%22%7D%7D%5D%7D',
      content_location:
        '/home/etheriumtechnologies/Production/installers/apache-tomcat-8.5.69/webapps/cures_articleimages/37/2024/03/14/article_4279.json',
      content_type: 'article',
      copyright_id: 11,
      count: 2537,
      country_id: 9,
      create_date: '2024-03-14',
      dc_name: 'Pelvic Inflammatory Disease',
      disclaimer_id: 1,
      docID: 11,
      edited_by: 37,
      friendly_name: 'Natural Treatment for Pelvic Inflammatory Disease (PID)',
      keywords: 'Natural Treatment for Pelvic Inflammatory Disease (PID)',
      language_id: 2,
      medicine_type: 1,
      over_allrating: 0,
      published_by: 37,
      published_date: '2024-03-14',
      pubstatus_id: 3,
      status: 0,
      subheading: null,
      title: 'Natural Treatment for Pelvic Inflammatory Disease (PID)',
      type: '[2]',
      user_id: 141,
      window_title: 'Written by Dr Karanvir',
    },
    {
      article_id: 4051,
      authored_by: '[16]',
      authors_name: 'Dr. Karanvir Singh ',
      comments: '',
      content:
        '%7B%22time%22%3A1705665595266%2C%22blocks%22%3A%5B%7B%22id%22%3A%22MEg86OvvaM%22%2C%22type%22%3A%22paragraph%22%2C%22data%22%3A%7B%22text%22%3A%22Acne%20is%20a%20dominant%5Cnskin%20condition%20among%20teenagers%20and%20young%20adults%2C%20occurs%20when%20hair%20follicles%5Cnbecome%20clogged%20with%20oil%20and%20dead%20skin%20cells%2C%20resulting%20in%20the%20formation%20of%5Cnpimples.%20Typically%2C%20these%20outbreaks%20manifest%20on%20the%20face%2C%20with%20pore%20blockages%5Cnleading%20to%20the%20development%20of%20blackheads%2C%20whiteheads%2C%20and%20various%20types%20of%5Cnpimples.%20Few%20types%20of%20acne%20are%20mentioned%20below%3A%22%7D%7D%5D%7D',
      content_location:
        '/home/etheriumtechnologies/Production/installers/apache-tomcat-8.5.69/webapps/cures_articleimages/37/2024/01/19/article_4051.json',
      content_type: 'article',
      copyright_id: 11,
      count: 2537,
      country_id: 9,
      create_date: '2024-01-19',
      dc_name: 'Acne',
      disclaimer_id: 1,
      docID: 11,
      edited_by: 37,
      friendly_name: 'How to Cure Acne Naturally',
      keywords: 'How to Cure Acne Naturally',
      language_id: 2,
      medicine_type: 9,
      over_allrating: 0,
      published_by: 37,
      published_date: '2024-01-19',
      pubstatus_id: 3,
      status: 1,
      subheading: null,
      title: 'How to Cure Acne Naturally',
      type: '[2]',
      user_id: 141,
      window_title: 'Written by Dr Karan',
    },
    {
      article_id: 3997,
      authored_by: '[33]',
      authors_name: 'Dr. Arman Zargaran',
      comments: '',
      content:
        '%7B%22time%22%3A1704456002143%2C%22blocks%22%3A%5B%7B%22id%22%3A%22m2VQx3Es1O%22%2C%22type%22%3A%22paragraph%22%2C%22data%22%3A%7B%22text%22%3A%22Dyslipidemia%5Cnis%20a%20common%20metabolic%20disorder%2C%20refers%20to%20an%20abnormal%20lipid%20profile%5Cncharacterized%20by%20imbalances%20in%20cholesterol%20and%20triglyceride%20levels.%20This%5Cncondition%20plays%20a%20pivotal%20role%20in%20the%20development%20of%20cardiovascular%20diseases%2C%5Cnmaking%20it%20a%20significant%20public%20health%20concern.%20%22%7D%7D%5D%7D',
      content_location:
        '/home/etheriumtechnologies/Production/installers/apache-tomcat-8.5.69/webapps/cures_articleimages/37/2024/01/05/article_3997.json',
      content_type: 'article',
      copyright_id: 11,
      count: 2537,
      country_id: 10,
      create_date: '2024-01-05',
      dc_name: 'Triglycerides',
      disclaimer_id: 1,
      docID: 23,
      edited_by: 37,
      friendly_name: 'Dyslipidemia Treatment Using Juglans Regia L Herb',
      keywords: 'Dyslipidemia Treatment Using Juglans Regia L Herb',
      language_id: 2,
      medicine_type: 3,
      over_allrating: 0,
      published_by: 37,
      published_date: '2024-01-05',
      pubstatus_id: 3,
      status: 1,
      subheading: null,
      title: 'Dyslipidemia Treatment Using Juglans Regia L Herb',
      type: '[2]',
      user_id: 141,
      window_title: 'tbzmed',
    },
  ];

  useEffect(() => {
    const receivedData = () => {
      fetch(
        `${backendHost}/favourite/userid/${profile.registration_id}/favouritearticle`,
      )
        .then(res => res.json())
        .then(json => {
          setItems(json);
          setIsLoaded(true);
        })
        .catch(err => err);
    };
    receivedData();
  }, []);
  const renderItem = ({item}) => {
    console.log(item);
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
      <ArticleCard
        title={item.title}
        window_title={item.authors_name}
        create_date={item.create_date}
        image_location={imageLoc}
        dc_name={item.dc_name}
      />
    );
  };

  return (
    <>
      {isLoaded ? (
        <View style={{flex: 1,backgroundColor:'#fff'}}>
          <View style={styles.feedHeader}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 36,
                marginLeft: 5,
              }}>
              <Text style={styles.read}>Favourite</Text>
            
            </View>
          </View>
          <FlashList
            data={items}
            renderItem={renderItem}
            keyExtractor={item => item.article_id.toString()}
          />
        </View>
      ) : (
        <ContentLoader />
      )}
    </>
  );
};

export default Favourite;

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
