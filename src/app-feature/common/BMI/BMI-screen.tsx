import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {Button, TextInputField, HeaderBar} from '../../../components';
import {BMICalculateSchema} from '../../../utils';
import {Normal, UnderOverWeight} from './component';
import {styles} from './style';
import {pic_bmiBig} from '../../../../assets';
import {useForm} from 'react-hook-form';

type BMICalculationProps = {
  weight: string | number;
  height: string | number;
};

export const BMIScreen = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  const toggleModal = () => {
    setVisible(false);
  };

  const {control, handleSubmit} = useForm<BMICalculationProps>({
    defaultValues: {
      weight: '',
      height: '',
    },
    resolver: BMICalculateSchema,
  });

  const onSubmit = (data: BMICalculationProps) => {
    setResult(
      (data.weight as unknown as number) /
        Math.pow((data.height as unknown as number) / 100, 2),
    );
    setVisible(true);
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="BMI Calculator" isBack={true} />
      <View style={styles.container2}>
        <Image style={styles.image} source={pic_bmiBig} />
        <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
          Calculate your BMI Metric
        </Text>
        <TextInputField
          placeholder="Weight (kilograms)"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
          controller={control}
          name="weight"
          isErrorField={true}
        />
        <TextInputField
          placeholder="Height (centimeters)"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
          controller={control}
          name="height"
          isErrorField={true}
        />

        <Modal isVisible={isVisible} onBackdropPress={() => setVisible(false)}>
          <View style={styles.modal}>
            <Text style={[styles.textAlignCenter, styles.textNormalBoldBlack]}>
              BMI: {result.toFixed(2)}
            </Text>
            {result <= 18.4 ? (
              <UnderOverWeight isUnderweight={true} />
            ) : result >= 25 ? (
              <UnderOverWeight isUnderweight={false} />
            ) : (
              <Normal />
            )}
            <Button
              style={[styles.buttonBlue, styles.shadowBlue]}
              activeOpacity={0.8}
              onPress={toggleModal}
              text="Close"
              textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
            />
          </View>
        </Modal>
        <Button
          style={[styles.buttonBlue, styles.shadowBlue]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          text="Calulate Now"
          textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        />
      </View>
    </View>
  );
};
