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
import {styleBMIScreen as style} from './style';
import {
  pic_diet,
  pic_exercise,
  pic_fireworks,
  pic_bmiBig,
} from '../../../../assets';
import {useForm} from 'react-hook-form';

export const Normal = () => {
  return (
    <View style={style.modalContent}>
      <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
        You are Normal
      </Text>
      <Image style={style.imageModal} source={pic_fireworks} />
      <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
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
    <View style={style.modalContent}>
      <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
        {isUnderweight ? 'You are Underweight' : 'You are Overweight'}
      </Text>
      <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
        Some Guidelines
      </Text>
      <ListItem
        style={[style.buttonModal, style.shadowGray]}
        imageSource={pic_diet}
        isMultipleAtrribute={false}>
        <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
          {isUnderweight
            ? 'Eat more and choose nutrient-rich foods'
            : 'Choose healthy eating plan'}
        </Text>
      </ListItem>
      {/* <View style={[styles.buttonModal, style.shadowGray]}>
        <View style={styles.rowButton}>
          <Image style={styles.iconButton} source={pic_diet} />
          <Text style={styles.txtName}>
            {isUnderweight
              ? 'Eat more and choose nutrient-rich foods'
              : 'Choose healthy eating plan'}
          </Text>
        </View>
      </View> */}
      <ListItem
        style={[style.buttonModal, style.shadowGray]}
        imageSource={pic_exercise}
        isMultipleAtrribute={false}>
        <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
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
    <View style={style.container}>
      <HeaderBar text="BMI Calculator" isBack={true} />
      <View style={style.container2}>
        <Image style={style.image} source={pic_bmiBig} />
        <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
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
          <View style={style.modal}>
            <Text style={[style.textAlignCenter, style.textNormalBoldBlack]}>
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
              style={[style.buttonBlue, style.shadowBlue]}
              activeOpacity={0.8}
              onPress={toggleModal}
              text="Close"
              textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
            />
          </View>
        </Modal>
        <Button
          style={[style.buttonBlue, style.shadowBlue]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          text="Calulate Now"
          textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
        />
      </View>
    </View>
  );
};
