import React, {useState} from 'react';
import {Text, View, Image} from 'react-native';
import Modal from 'react-native-modal';
import {
  BMICalculateSchema,
  Button,
  TextInputField,
  HeaderBar,
  ListItem,
} from '../../components';
import {commonScreenStyle as style} from './style';
import {
  pic_diet,
  pic_exercise,
  pic_fireworks,
  pic_bmiBig,
} from '../../../assets';
import {useForm} from 'react-hook-form';

export const Normal = () => {
  return (
    <View style={style.modalContainerBMIScreen}>
      <Text style={style.txtBoldBlack}>You are Normal</Text>
      <Image style={style.imageModalBMIScreen} source={pic_fireworks} />
      <Text style={style.txtBoldBlack}>Congratulation</Text>
    </View>
  );
};

type UnderOverWeightProps = {
  isUnderweight: boolean;
};

export const UnderOverWeight = ({isUnderweight}: UnderOverWeightProps) => {
  return (
    <View style={style.modalContainerBMIScreen}>
      <Text style={style.txtBoldBlack}>
        {isUnderweight ? 'You are Underweight' : 'You are Overweight'}
      </Text>
      <Text style={style.txtBoldBlack}>Some Guidelines</Text>
      <ListItem
        style={[style.buttonModalBMIScreen, style.shadowGray]}
        imageSource={pic_diet}
        isMultipleAtrribute={false}>
        <Text style={style.txtBoldBlack}>
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
        style={[style.buttonModalBMIScreen, style.shadowGray]}
        imageSource={pic_exercise}
        isMultipleAtrribute={false}>
        <Text style={style.txtBoldBlack}>
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
        <Text style={[style.txt, style.txtBoldBigBlack]}>
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
          <View style={style.modalBMIScreen}>
            <Text style={[style.txt, style.txtBoldBlack]}>
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
              style={[style.buttonColor, style.shadowBlue]}
              activeOpacity={0.8}
              onPress={toggleModal}
              text="Close"
              textStyle={[style.txt, style.txtBoldBigWhite]}
            />
          </View>
        </Modal>
        <Button
          style={[style.buttonColor, style.shadowBlue]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          text="Calulate Now"
          textStyle={[style.txt, style.txtBoldBigWhite]}
        />
      </View>
    </View>
  );
};
