import React from 'react';
import {
  StyleSheet,
  Text,
  TextProps,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface TextNavigationProps extends TouchableOpacityProps, TextProps {
  onPress?: () => void;
  style?: ViewStyle;
  children?: React.ReactNode;
  text?: string;
}

const TextNavigation = (props: TextNavigationProps) => {
  const {onPress, style, text, ...restProps} = props;
  return (
    <TouchableOpacity activeOpacity={0.8} onPress={onPress} {...restProps}>
      <Text style={StyleSheet.flatten([style, styles.txt, styles.txtNavigate])}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  txt: {
    margin: '1.5%',
    alignSelf: 'center',
    textAlign: 'center',
    justifyContent: 'center',
  },
  txtNavigate: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
  },
});

export default TextNavigation;
