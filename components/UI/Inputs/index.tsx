import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface InputProps {
  placeholder: string;
  isPassword?: boolean;
  defaultValue?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  multiline?: boolean;
  maxLength?: number;
}

const InputText = (props: InputProps) => {
  const { placeholder, defaultValue, onChangeText } = props;
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={placeholder}
      onChangeText={onChangeText}
      secureTextEntry={props.isPassword}
      numberOfLines={props.numberOfLines}
      multiline={props.multiline}
      maxLength={props.maxLength}
      defaultValue={defaultValue}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    width: '80%',
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
});

export default InputText;
