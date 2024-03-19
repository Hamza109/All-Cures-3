import React, { useState, useCallback, useEffect } from 'react';
import { View, SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Input } from 'native-base';
import { FlashList } from '@shopify/flash-list';
import { backendHost } from '../../Components/apiConfig';
import NotificationIcon from '../../assets/images/Notification.svg';
import InactiveSearch from '../../assets/images/INACTIVE_SEARCH.svg';
import { Route } from '../../routes';

const SearchInput = ({ navigation, route }) => {
  const header = route.params.header;
  const placeholder = route.params.placeholder;
  const key = route.params.key;
  const [inputText, setInputText] = useState('');
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    console.log(key);
  }, []);

  const debounce = (func, delay) => {
    let timeoutId;
    return function (...args) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const debouncedSearch = useCallback(
    debounce((text) => {
      if (key === 'cure') {
        searchCures(text);
      } else if (key === 'name') {
        searchByname(text);
      } else if (key === 'city') {
        searchByCity(text);
      }
    }, 500),
    []
  );

  const searchByname = async (text) => {
    try {
      const response = await fetch(`${backendHost}/IntegratedActionController`);
      const doctorData = await response.json();
      const newData = doctorData.map.Doctorname.myArrayList.filter(function (
        item
      ) {
        const itemData = item ? item.toUpperCase() : ''.toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });

      setData(newData);
    } catch (error) {
      console.log(error);
    }
  };

  const searchByCity = async (text) => {
    const response = await fetch(`${backendHost}/city/all`);
    const cityData = await response.json();

    var temp = [];
    cityData.forEach((i) => {
      temp.push(i.Cityname, i.Pincode);
    });

    const newData = temp.filter(function (item) {
      const itemData = item ? item.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    setData(newData);
  };

  const searchCures = async (text) => {
    try {
      const response = await fetch(`${backendHost}/isearch/combo/${text}`);
      const curesResult = await response.json();
      setData(curesResult);
    } catch (error) {
      console.log(error);
    }
  };

  const onSearch = (text) => {
    setInputText(text);
    if (text) {
      setSearching(true);
      debouncedSearch(text);
    } else {
      setData([]);
      setSearching(false);
    }
  };

  const onSubmit = async (item) => {
    setInputText('');
    setSearching(false);
    navigation.navigate(Route.SEARCH_RESULT, {
      text: item,
      key: key,
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.feedHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.read}>{header}</Text>
          <NotificationIcon width={16} height={18} />
        </View>
      </View>
      <View style={styles.inputContainer}>
        <Input
          onChangeText={onSearch}
          placeholder={placeholder}
          value={inputText}
          height={12}
          color="#fff"
          borderColor="rgba(76, 78, 100, 0.22)"
          _focus={{
            borderWidth: 1,
            borderColor: 'rgba(76, 78, 100, 0.54)',
            color: 'rgba(76, 78, 100, 0.6)',
            placeholderTextColor: 'rgba(76, 78, 100, 0.6)',
            bg: '#fff',
          }}
          autoCapitalize="none"
          returnKeyType="done"
          rightElement={
            <View style={styles.searchIcon}>
              <InactiveSearch width={16} height={16} />
            </View>
          }
        />
      </View>
      {searching && (
        <View style={styles.listContainer}>
          {data.length ? (
            <View style={{ height: '100%', width: '100%' }}>
              <FlashList
                estimatedItemSize={100}
                data={data}
                keyExtractor={(item, idx) => idx.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => onSubmit(item)}>
                    <View style={styles.itemView}>
                      <Text style={styles.itemText}>{item}</Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </View>
          ) : (
            <Text>No data found</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default SearchInput;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  feedHeader: {
    height: 102,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 36,
    marginLeft: 5,
  },
  read: {
    color: '#333',
    fontWeight: '700',
    fontSize: 25,
  },
  inputContainer: {
    paddingHorizontal: 26,
  },
  searchIcon: {
    marginRight: 20,
  },
  listContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal:26
  },
  itemView: {
    borderBottomWidth: 0.8,
    borderBottomColor: 'rgba(76, 78, 100, 0.6)',
    height: 80,
    width: 380,
    justifyContent: 'center',
    padding: 5,
    zIndex: 999,
  },
  itemText: {
    color: 'rgba(76, 78, 100, 0.6)',
    paddingHorizontal: 10,
    fontSize: 13,
    marginLeft: -5,
  },
});


