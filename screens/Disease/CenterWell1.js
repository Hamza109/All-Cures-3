import React from 'react';
import {FlatList, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {View} from 'react-native';

import {Image} from '@rneui/themed';

import RenderHTML from 'react-native-render-html';

import {Color, FontFamily} from '../../config/GlobalStyles';
import {width} from '../../config/GlobalStyles';
const ratio = width / 378;

const CenterWell1 = ({
  content,
  type,
  text,
  title,
  message,
  caption,
  alignment,
  imageUrl,
}) => {
  const tex = {
    html: text,
  };
  console.log('html-->', tex);
  return (
    <View>
      {
        {
          header: (
            <View>
              <Text
                adjustsFontSizeToFit
                style={{fontSize: 17, fontWeight: 'bold'}}>
                {title}
              </Text>
            </View>
          ),
          paragraph: (
            <View>
              <RenderHTML
                source={tex}
                contentWidth={width}
                tagsStyles={{
                  adjustsFontSizeToFit: true,
                  span: {fontSize: 15},
                  h2: {
                    color: Color.colorDarkslategray,
                    fontSize: 15,
                    fontWeight: '700',
                    fontFamily: FontFamily.poppinsBold,
                  },
                  b: {
                    fontFamily: FontFamily.poppinsBold,
                    fontWeight: '700',
                    color: Color.colorDarkslategray,
                    fontSize: 15,
                  },
                  body: {
                    fontFamily: FontFamily.poppinsRegular,
                    fontWeight: '400',
                    color: Color.colorDarkslategray,
                    fontSize: 15,
                  },
                }}
              />
            </View>
          ),

          image: (
            <View>
              <Image
                source={{uri: imageUrl}}
                style={{width: '100%', height: 378 * ratio}}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text>{caption}</Text>
            </View>
          ),
          delimiter: <Text style={{textAlign: 'center'}}>* * *</Text>,

          quote: (
            <View style={{textAlign: {alignment}}}>
              <Text style={{fontStyle: 'italic', fontSize: 15}}>"{text}"</Text>
              <View style={{textAlign: 'center'}}>
                <Text style={{fontStyle: 'italic'}}>{caption}</Text>
              </View>
            </View>
          ),

          warning: (
            <View>
              <View
                style={{
                  marginBottom: 220,
                  borderWidth: 1,
                  borderRadius: 3,
                  backgroundColor: '#f5f09f',
                  width: 320,
                }}>
                <Text style={{fontWeight: 'bold', color: 'red', fontSize: 20}}>
                  {' '}
                  ⚠{' '}
                </Text>
                <Text style={{fontWeight: 'bold'}}>{title}:</Text>

                <Text>{message}</Text>
              </View>
            </View>
          ),
        }[type]
      }
    </View>
  );
};

export default CenterWell1;
