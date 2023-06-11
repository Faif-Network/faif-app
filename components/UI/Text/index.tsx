import React from 'react';
import {
  StyleProp,
  StyleSheet,
  Text as TextRN,
  TextStyle,
  TouchableOpacity,
} from 'react-native';

interface TextProps {
  value?: string | number;
  align?: 'left' | 'center' | 'right';
  size?: 'small' | 'medium' | 'large';
  weight?: 'light' | 'regular' | 'bold';
  onPress?: () => void;
  style?: StyleProp<TextStyle>;
}

const Text = (props: TextProps) => {
  const { value, align, size, weight, onPress } = props;
  const alignStyle = align ? styles[align] : styles.left;
  const sizeStyle = size ? styles[size] : styles.medium;
  const weightStyle = weight ? styles[weight] : styles.regular;

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress}>
        <TextRN
          style={[
            styles.text,
            alignStyle,
            sizeStyle,
            weightStyle,
            styles.isClickable,
            props.style,
          ]}
        >
          {value}
        </TextRN>
      </TouchableOpacity>
    );
  }

  return (
    <TextRN
      style={[styles.text, alignStyle, sizeStyle, weightStyle, props.style]}
    >
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
    textAlign: 'left',
  },
  center: {
    textAlign: 'center',
  },
  right: {
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
    fontWeight: '300',
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
