import React from 'react';
import {View, Image, Text} from 'react-native';
import {pic_notFound} from '../../../../../assets';
import {styles} from '../styles';

export const NotFound = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.image} source={pic_notFound} />
      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        Not found
      </Text>
    </View>
  );
};
