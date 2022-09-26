import React from 'react';
import {View, Image, Text} from 'react-native';
import {pic_search} from '../../../../../assets';
import {styles} from '../styles';

export const Initial = () => {
  return (
    <View style={styles.midScreen}>
      <Image style={styles.image} source={pic_search} />
      <Text style={[styles.textAlignCenter, styles.textNormalBlack]}>
        Search hospitals and clinics
      </Text>
    </View>
  );
};
