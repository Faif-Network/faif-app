import React from 'react';
import { StyleSheet, Text as TextRN } from 'react-native';
interface TextProps {
  value: string;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'regular' | 'bold';
  onPress?: () => void;
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

  return (
    <TextRN style={[styles.text, alignStyle, sizeStyle, weightStyle]}>
      {value}
    </TextRN>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000',
    padding: 4,
    marginVertical: 4,
  },
  left: {
    alignSelf: 'flex-start',
    marginHorizontal: 8,
  },
  center: {
    alignSelf: 'center',
    marginHorizontal: 8,
  },
  right: {
    alignSelf: 'flex-end',
    marginHorizontal: 8,
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
    fontWeight: '300',
  },
  regular: {
    fontWeight: '400',
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
