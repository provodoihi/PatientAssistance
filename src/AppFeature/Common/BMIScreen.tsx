import React, {useState} from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import Modal from 'react-native-modal';
import {
  BMICalculateSchema,
  Button,
  TextInputField,
  HeaderBar,
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
    <View style={styles.modalOptional}>
      <Text style={styles.txtModal}>You are Normal</Text>
      <Image style={styles.imgModal} source={pic_fireworks} />
      <Text style={styles.txtModal}>Congratulation</Text>
    </View>
  );
};

export const Underweight = () => {
  return (
    <View style={styles.modalOptional}>
      <Text style={styles.txtModal}>You are Underweight</Text>
      <Text style={styles.txtModal}>Some Guidelines</Text>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image style={styles.iconButton} source={pic_diet} />
          <Text style={styles.txtName}>
            Eat more and choose nutrient-rich foods
          </Text>
        </View>
      </View>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image style={styles.iconButton} source={pic_exercise} />
          <Text style={styles.txtName}>Excercise to build up your muscles</Text>
        </View>
      </View>
    </View>
  );
};

export const Overweight = () => {
  return (
    <View style={styles.modalOptional}>
      <Text style={styles.txtModal}>You are Overweight</Text>
      <Text style={styles.txtModal}>Some Guidelines</Text>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image style={styles.iconButton} source={pic_diet} />
          <Text style={styles.txtName}>Choose healthy eating plan</Text>
        </View>
      </View>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image style={styles.iconButton} source={pic_exercise} />
          <Text style={styles.txtName}>Excercise more to lose weight</Text>
        </View>
      </View>
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
        <Text style={[styles.txt, styles.txtTitle]}>
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
            <Text style={styles.txtModal}>BMI: {result.toFixed(2)}</Text>
            {result <= 18.4 ? (
              <Underweight />
            ) : result >= 25 ? (
              <Overweight />
            ) : (
              <Normal />
            )}
            <Button
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={toggleModal}
              text="Close"
              textStyle={[styles.txt, styles.txtButton]}
            />
          </View>
        </Modal>
        <Button
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={handleSubmit(onSubmit)}
          text="Calulate Now"
          textStyle={[styles.txt, styles.txtButton]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  container2: {
    flex: 0.93,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modal: {
    backgroundColor: '#ffffff',
    flex: 0.7,
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalOptional: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  txtInput: {
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#4c4c4c',
    textAlign: 'left',
    justifyContent: 'center',
    alignContent: 'flex-start',
    width: '80%',
    margin: '2%',
    paddingLeft: '4%',
    borderColor: '#808080',
    borderWidth: 1,
    borderRadius: 25,
  },

  txt: {
    textAlign: 'center',
    justifyContent: 'center',
  },

  txtTitle: {
    margin: '2%',
    fontSize: rf(2.5),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtModal: {
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#4c4c4c',
    textAlign: 'center',
  },

  txtButton: {
    padding: '2.5%',
    margin: '2%',
    fontSize: rf(2.2),
    fontWeight: 'bold',
    color: '#ffffff',
    alignSelf: 'center',
  },

  txtName: {
    padding: '1.5%',
    margin: '1%',
    fontSize: rf(1.8),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonModal: {
    backgroundColor: '#FFFFFF',
    margin: '3.5%',
    borderRadius: 24,
    width: '60%',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },

  buttonWhite: {
    margin: '2.5%',
    width: '75%',
    borderRadius: 24,
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: '#ffffff',
  },

  button2: {
    margin: '1%',
  },

  rowButton: {
    flexDirection: 'row',
    margin: '1%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  shadowGray: {
    shadowColor: '#a2a2a2',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  img: {
    width: '35%',
    height: '30%',
    resizeMode: 'contain',
  },

  imgModal: {
    width: 128,
    height: 128,
    margin: '5%',
    resizeMode: 'contain',
  },

  iconButton: {
    width: '40%',
    height: '70%',
    margin: '1.5%',
    resizeMode: 'contain',
  },
});
