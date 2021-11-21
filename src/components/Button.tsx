import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  activeOpacity?: number;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  text?: string;
  textStyle?: TextStyle | TextStyle[];
}

const Button = (props: ButtonProps) => {
  const {
    onPress,
    activeOpacity,
    style,
    children,
    text,
    textStyle,
    ...restProps
  } = props;
  const styles = StyleSheet.create({
    button: {
      backgroundColor: '#00BFFF',
      margin: '3%',
      borderRadius: 25,
      width: '80%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    shadow: {
      shadowColor: '#00BFFF',
      shadowOffset: {
        width: 0,
        height: 7,
      },
      shadowOpacity: 0.41,
      shadowRadius: 9.11,

      elevation: 14,
    },
    txt: {
      margin: '1.5%',
      alignSelf: 'center',
      textAlign: 'center',
      justifyContent: 'center',
    },
    txtButton: {
      fontSize: rf(2.6),
      padding: '2.5%',
      fontWeight: 'bold',
      color: '#ffffff',
    },
  });
  return (
    <TouchableOpacity
      style={StyleSheet.flatten([style, styles.button, styles.shadow])}
      activeOpacity={activeOpacity}
      onPress={onPress}
      {...restProps}>
      <Text
        style={StyleSheet.flatten([textStyle, styles.txt, styles.txtButton])}>
        {text}
      </Text>
      {children}
    </TouchableOpacity>
  );
};

export default Button;
