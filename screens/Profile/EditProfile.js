import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Pressable,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import NotificationIcon from '../../assets/images/Notification.svg';
import {backendHost} from '../../Components/apiConfig';
import {Color, FontFamily, width} from '../../config/GlobalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import {Picker} from '@react-native-picker/picker';
import { useSelector } from 'react-redux';
const EditProfile = () => {
  const prevData = useSelector((state)=>state.docData.docData)
  console.log("prevData",prevData);
  const fetchTables = () => {
    Promise.all([
      fetch(`${backendHost}/article/all/table/specialties`)
        .then(res => res.json())
        .catch(err => err),
      fetch(`${backendHost}/article/all/table/hospital`)
        .then(res => res.json())
        .catch(err => err),
      fetch(`${backendHost}/article/all/table/states`)
        .then(res => res.json())
        .catch(err => err),
      fetch(`${backendHost}/article/all/table/city`)
        .then(res => res.json())
        .catch(err => err),
      fetch(`${backendHost}/article/all/table/countries`)
        .then(res => res.json())
        .catch(err => err),
      fetch(`${backendHost}/data/medicines`)
        .then(res => res.json())
        .catch(err => err),
    ])
      .then(
        ([
          diseaseData,
          hospitalData,
          stateData,
          cityData,
          countryData,
          medicineData,
        ]) => {
          setFormData({
            ...formData,
            diseaseList: diseaseData,
            hospitalList: hospitalData,
            stateList: stateData,
            cityList: cityData,
            medicineList: medicineData,
            countryList: countryData,
          });
        },
      )
      .catch(err => {
        err;
      });
  };

  useEffect(() => {
    fetchTables();
  }, []);
  const [formData, setFormData] = useState({
    // Personal Details
    firstName: '',
    lastName: '',
    email: '',
    gender: '',
    address: '',
    country: '',
    states: '', // Renamed 'states' for clarity
    city: '',
    registrationNumber: '',
    num: '', // Assuming this is for phone number

    // Medical Profile
    primary: '',
    secondary: '',
    systemOfMedicine: '', // Consider renaming for clarity
    education: '',
    awards: '',
    website: '',
    hospital: '',
    acceptInsurance: '',

    // Other
    about: '',
    imageUser: '',

    // Lists (keep as separate arrays)
    diseaseList: [],
    stateList: [],
    cityList: [],
    countryList: [],
    hospitalList: [],
    medicineList: [],
  });
  const [selections, setSelections] = useState({
    Disease: null,
    State: null,
    City: null,
    Country: null,
    Hospital: null,
    Medicine: null,
  });
  const fields = [
    {
      label: 'Enter Your First Name',
      Value: 'firstName',
    },
    {
      label: 'Enter Your Middle Name',
      Value: 'middleName',
    },
    {
      label: 'Enter Your Last Name',
      Value: 'lastName',
    },
    {
      label: 'Enter Your Number',
      Value: 'telephoneNos',
    },
    {
      label: 'Enter Your Address',
      Value: 'address1',
    },
    {
      label: 'Enter Your Year of Gradutaion',
      Value: 'yearOfGrad',
    },
    {
      label: 'Enter Your Website URL',
      Value: 'websiteUrl',
    },
    {
      label: 'Enter Your University ',
      Value: 'univName',
    },
  ];
  const pickersData = [
    {list: formData.cityList, label: 'City'},
    {list: formData.countryList, label: 'Country'},
    {list: formData.diseaseList, label: 'Disease'},
    {list: formData.hospitalList, label: 'Hospital'},

    {list: formData.stateList, label: 'State'},
  ];

  const handleInputChange = (value, fieldName) => {
    setFormData({...formData, [fieldName]: value});
  };

  console.log(formData);

  // const choosePhotoFromLibrary = () => {
  //   ImagePicker.openPicker({
  //     width: 300,
  //     height: 300,
  //     cropping: true,
  //     compressImageQuality: 0.7,
  //   })
  //     .then(image => {
  //       const a = image.path.split('/');
  //       const b = a[a.length - 1];

  //       type == 1
  //         ? (setImage(image.path),
  //           setSelectedFile(b),
  //           bs.current.snapTo(1),
  //           handleImageSubmission())
  //         : setImageUser(image.path);
  //       bs.current.snapTo(1);
  //     })
  //     .catch(err => err);
  // };
  const [selectedCity, setSelectedCity] = useState('');

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      <View style={styles.feedHeader}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 36,
            marginLeft: 5,
          }}>
          <Text style={styles.read}>Edit Profile</Text>
          <NotificationIcon width={16} height={18} style={{marginTop: 5}} />
        </View>
      </View>
      <ScrollView>
        <View
          style={{
            flex: 1,

            alignItems: 'center',
          }}>
          <View
            style={{
              width: 100,
              height: 100,
              backgroundColor: 'grey',
              borderRadius: 200,
            }}>
            <TouchableOpacity>
              <ImageBackground
                style={{
                  width: 100,
                  height: 100,
                  borderRadius: 200,
                  overflow: 'hidden',
                  color: Color.lightpurple,
                }}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Icon
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  />
                </View>
              </ImageBackground>
            </TouchableOpacity>
          </View>
          {fields.map(field => {
            const updatedData = fields.values;
            return (
              <View key={field.Value}>
                <TextInput
                  style={styles.input}
                  placeholder={field.label}
                  onChangeText={value => handleInputChange(value, field.Value)}
                  value={formData[field.Value]}
                />
              </View>
            );
          })}
          {}
          {pickersData.map((pickerData, index) => {
            const pickerType = pickerData.label;
            const pickerList = pickerData.list;
            console.log('pickerList', pickerList);
            return (
              <Picker
                key={index}
                selectedValue={selections[pickerType]} // Access the correct property
                onValueChange={itemValue =>
                  setSelections({...selections, [pickerType]: itemValue})
                }
                style={styles.input}>
                <Picker.Item label={`Select ${pickerData.label}`} value="" />
                {pickerList.map(item => (
                  // <Picker.Item key={item[0]} label={item[1]} value={item[0]} />
                  <Text>HEy</Text>
                ))}
              </Picker>
            );
          })}
          <Pressable style={styles.formSubmit}>
            <Text style={styles.formSubmitText}>Submit</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditProfile;

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
  input: {
    borderWidth: 1,
    width: width / 1.1,
    borderRadius: 10,
    margin: 5,
    borderColor: Color.appDefaultColor,
    backgroundColor: Color.lightpurple,
    padding: 6,
  },
  formSubmit: {
    backgroundColor: Color.appDefaultColor,
    width: width / 1.3,
    margin: 10,
    height: 35,
    borderRadius: 5,
    justifyContent: 'center',
  },
  formSubmitText: {
    color: '#fff',
    textAlign: 'center',
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: '600',
    letterSpacing: 2,
    fontFamily: FontFamily.poppinsBold,
  },
});
