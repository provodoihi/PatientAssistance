import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';
import Button from '../components/Button';

const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../assets/Image_Icon/check.png')}
      />
      <Text style={styles.txt}>Sign Up Success</Text>
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        text="Sign In Now"
      />
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
});

export default SignupSuccessScreen;
