import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableOpacityProps,
  ViewStyle,
  ImageSourcePropType,
} from 'react-native';

interface ListItemProps extends TouchableOpacityProps {
  style?: ViewStyle | ViewStyle[];
  activeOpacity?: number;
  onPress?: () => void;
  children?: React.ReactNode;
  imageSource: ImageSourcePropType;
  isMultipleAtrribute?: boolean;
}

export const ListItem = (props: ListItemProps) => {
  const {
    style,
    activeOpacity,
    onPress,
    children,
    imageSource,
    isMultipleAtrribute,
    ...restProps
  } = props;
  return (
    <TouchableOpacity
      style={style}
      activeOpacity={activeOpacity}
      onPress={onPress}
      {...restProps}>
      <View style={styles.row}>
        <Image style={styles.iconButton} source={imageSource} />
        {isMultipleAtrribute ? (
          <View style={styles.column}>{children}</View>
        ) : (
          <>{children}</>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'column',
    margin: '1.5%',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
    maxWidth: '80%',
  },
  iconButton: {
    width: '20%',
    height: '65%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
