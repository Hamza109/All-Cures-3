import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text, size} from 'react-native';
import {Input, FormControl} from 'native-base';
import { Color } from '../config/GlobalStyles';
const InputBox = ({
  label,
  placeholder,
  size,
  keyboard,
  value,
  onChangeText,
  defaultValue,
  color,

  activeBorderColor,
  borderColor,
  activeBorder,
  borderWidth,

}) => {
  const [text, setText] = useState();
  return (
    <View style={styles.container}>
      <FormControl mb="2">
        <FormControl.Label  ml="1">
          {label}
        </FormControl.Label>
        <Input
          rounded={size}
          defaultValue={defaultValue}
          placeholder={placeholder}
          borderColor={borderColor}
          _focus={{borderColor: activeBorderColor, borderWidth: activeBorder ,bgColor:color}}
          keyboardType={keyboard}
          value={value}
          borderWidth={borderWidth}
          onChangeText={onChangeText}
          _hover={{color:'#fff',bgColor:'#fff'}}
        />
      </FormControl>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    margin: 10,
  },
});

export default InputBox;
