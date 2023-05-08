import React from 'react'
import { StyleSheet, Text, TouchableOpacity } from 'react-native'

interface ButtonProps {
  title: string
  onPress: () => void
  primary?: boolean
}

const Button = (props: ButtonProps) => {
  const { title, onPress, primary } = props
  const buttonStyle = primary ? styles.primaryButton : styles.secondaryButton
  const textStyle = primary ? styles.primaryText : styles.secondaryText

  return (
    <TouchableOpacity style={[styles.basicButton, buttonStyle]} onPress={onPress}>
      <Text style={textStyle}>{title}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  basicButton: {
    width: '80%',
    height: 40,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
  },

  primaryButton: {
    backgroundColor: '#007bff',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: '80%',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  secondaryButton: {
    backgroundColor: '#f8f9fa',
    borderColor: '#007bff',
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  primaryText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  secondaryText: {
    color: '#007bff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
})

export default Button
