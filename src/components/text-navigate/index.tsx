import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {scale} from '../../utils';

export interface TextNavigationProps extends TouchableOpacityProps, TextProps {
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  text?: string;
}

export const TextNavigation = (props: TextNavigationProps) => {
  const {onPress, style, text, ...restProps} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...restProps}>
      <Text style={StyleSheet.flatten([style, styles.textNavigate])}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  textNavigate: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
    padding: '1.5%',
    fontSize: scale(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
  },
});
