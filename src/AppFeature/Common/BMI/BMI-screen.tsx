import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {
  BMICalculateSchema,
  Button,
  TextInputField,
  HeaderBar,
  ListItem,
} from '../../../components';
import {styles} from './style';
import {
  pic_diet,
  pic_exercise,
  pic_fireworks,
  pic_bmiBig,
} from '../../../../assets';
import {useForm} from 'react-hook-form';

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

export const BMIScreen = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [result, setResult] = useState<number>(0);

  const toggleModal = () => {
    setVisible(false);
  };

  interface BMICalculationProps {
    weight: string | number;
    height: string | number;
  }

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
