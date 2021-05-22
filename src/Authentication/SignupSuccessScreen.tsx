import React from 'react';
import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';

const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={require('../../assets/check.png')} />
      <Text style={styles.txt}>Sign Up Success</Text>
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.txt, styles.txtButton]}>Sign In Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    resizeMode: 'contain',
    margin: '3%',
    height: '30%',
    width: '30%',
  },

  txt: {
    fontSize: rf(3),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4c4c4c',
    margin: '2%',
  },

  txtButton: {
    fontSize: rf(2.6),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  shadow: {
    shadowColor: '#00BFFF',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
});

export default SignupSuccessScreen;
