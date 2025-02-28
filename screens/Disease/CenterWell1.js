import React from 'react';
import {Text, ActivityIndicator, View} from 'react-native';
import {Image} from '@rneui/themed';
import RenderHTML from 'react-native-render-html';
import {Color, FontFamily, width} from '../../config/GlobalStyles';

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
  level,
}) => {
  // Compute HTML content based on the provided text and level.
  // If a level exists, wrap the text in an appropriate header tag.
  // Otherwise, wrap it in a simple div.
  const htmlContent = text
    ? level
      ? `<h${level}>${text}</h${level}>`
      : `<div>${text}</div>`
    : '<div>No content available</div>';

  return (
    <View>
      {
        {
          header: (
            <View>
              <RenderHTML
                source={{html: htmlContent}}
                contentWidth={width}
                tagsStyles={{
                  h1: {
                    fontSize: 22,
                    fontWeight: 'bold',
                    color: 'black',
                  },
                  h2: {
                    fontSize: 20,
                    fontWeight: 'bold',
                    color: 'black',
                  },
                  h3: {
                    fontSize: 18,
                    fontWeight: 'bold',
                    color: 'black',
                  },
                  // Fallback for div if no level is provided
                  div: {
                    fontSize: 17,
                    fontWeight: 'bold',
                    color: 'black',
                  },
                }}
              />
            </View>
          ),
          paragraph: (
            <View>
              {text ? (
                <RenderHTML
                  source={{html: `<div>${text}</div>`}}
                  contentWidth={width}
                  tagsStyles={{
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
              ) : (
                <Text>No content available</Text>
              )}
            </View>
          ),
          image: (
            <View>
              <Image
                source={{uri: imageUrl}}
                style={{
                  width: '100%',
                  height: 378 * ratio,
                  resizeMode: 'contain',
                }}
                PlaceholderContent={<ActivityIndicator />}
              />
              <Text>{caption}</Text>
            </View>
          ),
          delimiter: <Text style={{textAlign: 'center'}}>* * *</Text>,
          quote: (
            <View style={{textAlign: alignment}}>
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
                  ⚠
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
