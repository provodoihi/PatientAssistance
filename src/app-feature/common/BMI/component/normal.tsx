import React from 'react';
import {View, Image, Text} from 'react-native';
import {pic_fireworks} from '../../../../../assets';
import {styles} from '../style';

export const Normal = () => {
  return (
    <View style={styles.modalContent}>
      <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
        You are Normal
      </Text>
      <Image style={styles.imageModal} source={pic_fireworks} />
      <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
        Congratulation
      </Text>
    </View>
  );
};
