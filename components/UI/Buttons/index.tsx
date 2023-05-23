import React from 'react';
import {
  ActivityIndicator,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ButtonProps {
  title: string;
  onPress: () => void;
  primary?: boolean;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Button = (props: ButtonProps) => {
  const { title, onPress, primary, isLoading } = props;
  const buttonStyle = primary ? styles.primaryButton : styles.secondaryButton;
  const textStyle = primary ? styles.primaryText : styles.secondaryText;
  const disabledStyle = isLoading ? { opacity: 0.5 } : {};

  return (
    <TouchableOpacity
      style={[styles.basicButton, buttonStyle, disabledStyle, props.style]}
      onPress={onPress}
      disabled={isLoading}
    >
      {isLoading ? (
        <ActivityIndicator color={primary ? '#fff' : '#007bff'} />
      ) : (
        <Text style={textStyle}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  basicButton: {
    height: 45,
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
});

export default Button;
