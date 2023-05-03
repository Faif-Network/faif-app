import React from 'react'
import { StyleSheet, TextInput } from 'react-native'

interface InputProps {
  placeholder: string
  isPassword?: boolean
  value?: string
  onChangeText?: (text: string) => void
}

const InputText = (props: InputProps) => {
  const { placeholder, value, onChangeText } = props
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={props.isPassword}
    />
  )
}

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
})

export default InputText
