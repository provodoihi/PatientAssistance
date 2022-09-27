import React from 'react';
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  activeOpacity?: number;
  disabled?: boolean;
  style?: ViewStyle | ViewStyle[];
  children?: React.ReactNode;
  /**
   * The text to display inside the button.
   */
  text?: string;
  textStyle?: TextStyle | TextStyle[];
}

export const Button = (props: ButtonProps) => {
  const {
    onPress,
    activeOpacity,
    style,
    children,
    text,
    textStyle,
    disabled,
    ...restProps
  } = props;

  const buttonStyle = StyleSheet.flatten([
    style,
    disabled ? styles.buttonDisable : styles.buttonEnable,
  ]);
  return (
    <TouchableOpacity
      style={buttonStyle}
      activeOpacity={activeOpacity}
      onPress={onPress}
      disabled={disabled}
      {...restProps}>
      <Text style={textStyle}>{text}</Text>
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonEnable: {
    opacity: 1,
  },
  buttonDisable: {
    opacity: 0.4,
  },
});
