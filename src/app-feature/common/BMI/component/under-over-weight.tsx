import React from 'react';
import {View, Text} from 'react-native';
import {pic_diet, pic_exercise} from '../../../../../assets';
import {ListItem} from '../../../../components';

import {styles} from '../style';

type UnderOverWeightProps = {
  isUnderweight: boolean;
};

export const UnderOverWeight = ({isUnderweight}: UnderOverWeightProps) => {
  return (
    <View style={styles.modalContent}>
      <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
        {isUnderweight ? 'You are Underweight' : 'You are Overweight'}
      </Text>
      <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
        Some Guidelines
      </Text>
      <ListItem
        style={[styles.buttonModal, styles.shadowGray]}
        imageSource={pic_diet}
        isMultipleAtrribute={false}>
        <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
          {isUnderweight
            ? 'Eat more and choose nutrient-rich foods'
            : 'Choose healthy eating plan'}
        </Text>
      </ListItem>
      <ListItem
        style={[styles.buttonModal, styles.shadowGray]}
        imageSource={pic_exercise}
        isMultipleAtrribute={false}>
        <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
          {isUnderweight
            ? 'Exercise to build up your muscles'
            : 'Exercise more to lose weight'}
        </Text>
      </ListItem>
    </View>
  );
};
