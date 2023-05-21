import React from 'react';
import { StyleProp, StyleSheet, Text as TextRN, TextStyle } from 'react-native';
interface TextProps {
  value?: string | number;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'regular' | 'bold';
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

const Text = (props: TextProps) => {
  const { value, align, size, weight } = props;
  const alignStyle = align ? styles[align] : styles.left;
  const sizeStyle = size ? styles[size] : styles.medium;
  const weightStyle = weight ? styles[weight] : styles.regular;

  if (props.onPress)
    return (
      <TextRN
        style={[
          styles.text,
          alignStyle,
          sizeStyle,
          weightStyle,
          styles.isClickable,
        ]}
        onPress={props.onPress}
      >
        {value}
      </TextRN>
    );

  if (props.style)
    return (
      <TextRN
        style={[styles.text, alignStyle, sizeStyle, weightStyle, props.style]}
      >
        {value}
      </TextRN>
    );

  return (
    <TextRN style={[styles.text, alignStyle, sizeStyle, weightStyle]}>
      {value}
    </TextRN>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    lineHeight: 20,
  },
  left: {
    alignSelf: 'flex-start',
    textAlign: 'left',
  },
  center: {
    alignSelf: 'center',
    textAlign: 'center',
  },
  right: {
    alignSelf: 'flex-end',
    textAlign: 'right',
  },
  small: {
    fontSize: 12,
  },
  medium: {
    fontSize: 16,
  },
  large: {
    fontSize: 20,
  },
  light: {
    fontWeight: '400',
  },
  regular: {
    fontWeight: '500',
  },
  bold: {
    fontWeight: '700',
  },
  isClickable: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
});

export default Text;
