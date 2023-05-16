import React from 'react';
import { StyleProp, StyleSheet, TextInput, TextStyle } from 'react-native';

interface InputProps {
  placeholder: string;
  isPassword?: boolean;
  value?: string;
  onChangeText?: (text: string) => void;
  style?: StyleProp<TextStyle>;
}

const InputText = (props: InputProps) => {
  const { placeholder, value, onChangeText } = props;
  return (
    <TextInput
      style={[styles.input, props.style]}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={props.isPassword}
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
