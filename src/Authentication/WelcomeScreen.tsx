import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, Alert, BackHandler} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {responsiveScreenFontSize as rf} from 'react-native-responsive-dimensions';
import Button from '../components/Button';
import TextNavigation from '../components/TextNavigation';

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
        source={require('../../assets/Image_Icon/healthcare256.png')}
      />

      <Text style={[styles.txt, styles.txtHead]}>
        Welcome to {'\n'} Patient Assitance
      </Text>
      <Text style={[styles.txt, styles.txtNormal]}>
        Your trustworthy healthcare solution
      </Text>
      <Button
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Register')}
        text="Get Started"
      />
      <TextNavigation
        text="Already have an account? Sign In"
        onPress={() => navigation.navigate('Login')}
      />
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

  txtHead: {
    padding: '1.5%',
    fontSize: rf(2.7),
    fontWeight: 'bold',
    color: '#4c4c4c',
  },
});

export default WelcomeScreen;
