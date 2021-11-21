import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import HeaderBar from '../../components/HeaderBar';
import Modal from 'react-native-modal';

export const Normal = () => {
  return (
    <View style={styles.modalOptional}>
      <Text style={styles.txtModal}>You are Normal</Text>
      <Image
        style={styles.imgModal}
        source={require('../../../assets/Image_Icon/fireworks.png')}
      />
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
          <Image
            style={styles.iconButton}
            source={require('../../../assets/Image_Icon/diet.png')}
          />
          <Text style={styles.txtName}>
            Eat more and choose nutrient-rich foods
          </Text>
        </View>
      </View>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image
            style={styles.iconButton}
            source={require('../../../assets/Image_Icon/exercise.png')}
          />
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
          <Image
            style={styles.iconButton}
            source={require('../../../assets/Image_Icon/diet.png')}
          />
          <Text style={styles.txtName}>Choose healthy eating plan</Text>
        </View>
      </View>
      <View style={[styles.buttonModal, styles.shadowGray]}>
        <View style={styles.rowButton}>
          <Image
            style={styles.iconButton}
            source={require('../../../assets/Image_Icon/exercise.png')}
          />
          <Text style={styles.txtName}>Excercise more to lose weight</Text>
        </View>
      </View>
    </View>
  );
};

const BMIScreen = () => {
  const [isVisible, setVisible] = useState<boolean>(false);
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [result, setResult] = useState<number>(0);

  const toggleModal = () => {
    setVisible(false);
  };

  const editdone = () => {
    if (height === '' || weight === '') {
      Alert.alert('Notification', 'Please fill in weight and height', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    } else {
      setResult(
        (weight as unknown as number) /
          Math.pow((height as unknown as number) / 100, 2),
      );
      setVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <HeaderBar text="BMI Calculator" isBack={false} />
      <View style={styles.container2}>
        <Image
          style={styles.img}
          source={require('../../../assets/Image_Icon/bmi_big.png')}
        />
        <Text style={[styles.txt, styles.txtTitle]}>
          Calculate your BMI Metric
        </Text>
        <TextInput
          style={styles.txtInput}
          onChangeText={text1 => {
            setWeight(text1);
          }}
          value={weight}
          placeholder="Weight (kilograms)"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
        />
        <TextInput
          style={styles.txtInput}
          onChangeText={text2 => {
            setHeight(text2);
          }}
          value={height}
          placeholder="Height (centimeters)"
          placeholderTextColor="#9FA5AA"
          keyboardType="numeric"
          multiline={false}
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
            <TouchableOpacity
              style={[styles.button, styles.shadow]}
              activeOpacity={0.8}
              onPress={toggleModal}>
              <Text style={[styles.txt, styles.txtButton]}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          style={[styles.button, styles.shadow]}
          activeOpacity={0.8}
          onPress={editdone}>
          <Text style={[styles.txt, styles.txtButton]}>Calulate Now</Text>
        </TouchableOpacity>
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

export default BMIScreen;
