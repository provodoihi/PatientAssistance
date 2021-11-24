import React from 'react';
import {
  Text,
  TextStyle,
  TouchableOpacity,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

export interface ButtonProps extends TouchableOpacityProps {
  onPress?: () => void;
  activeOpacity?: number;
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
    ...restProps
  } = props;
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={activeOpacity}
      onPress={onPress}
      {...restProps}>
      <Text style={textStyle}>{text}</Text>
      {children}
    </TouchableOpacity>
  );
};
