import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';

const WelcomeScreen = ({navigation}: AuthNavigationProps<'Welcome'>) => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert('Notification', 'Are you sure to exit the app?', [
        {
          text: 'Cancel',
          onPress: () => null,
          style: 'cancel',
        },
        {text: 'YES', onPress: () => BackHandler.exitApp()},
      ]);
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../assets/healthcare256.png')}
      />

      <Text style={[styles.txt, styles.txtHead]}>
        Welcome to {'\n'} Patient Assitance
      </Text>
      <Text style={[styles.txt, styles.txtNormal]}>
        Your trustworthy healthcare solution
      </Text>
      <TouchableOpacity
        style={[styles.button, styles.shadow]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Register')}>
        <Text style={[styles.txt, styles.txtButton]}>Get Started</Text>
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}>
        <Text style={[styles.txt, styles.txtNavigate]}>
          Already have an account? Sign In
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },

  img: {
    resizeMode: 'contain',
    margin: '2%',
    height: '35%',
    width: '35%',
  },

  txt: {
    margin: '1.5%',
    alignSelf: 'center',
    justifyContent: 'center',
    textAlign: 'center',
  },

  txtNormal: {
    padding: '1.5%',
    fontSize: rf(2),
    fontWeight: 'normal',
    color: '#8B959E',
  },

  txtButton: {
    fontSize: rf(2.6),
    padding: '2.5%',
    fontWeight: 'bold',
    color: '#ffffff',
  },

  txtHead: {
    padding: '1.5%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },

  txtNavigate: {
    padding: '1.5%',
    fontSize: rf(1.8),
    fontWeight: 'normal',
    color: '#00BFFF',
  },

  button: {
    backgroundColor: '#00BFFF',
    margin: '3%',
    borderRadius: 25,
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonNew: {
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

export default WelcomeScreen;
