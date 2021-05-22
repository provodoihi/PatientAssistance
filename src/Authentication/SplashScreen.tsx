import React, {useEffect} from 'react';
import {StyleSheet, Text, View, Image, ActivityIndicator} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {responsiveFontSize as rf} from 'react-native-responsive-dimensions';

const SplashScreen = ({navigation}: AuthNavigationProps<'Splash'>) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Welcome');
    }, 3000);
  });

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={require('../../assets/healthcare256.png')}
      />
      <Text style={styles.txt}>Patient Assistance</Text>
      <ActivityIndicator
        style={styles.indicator}
        size="large"
        color="#0000ff"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00BFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  img: {
    resizeMode: 'contain',
    margin: '3%',
    height: '35%',
    width: '35%',
  },

  txt: {
    fontSize: rf(3.5),
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#323232',
    margin: '2%',
  },

  indicator: {
    margin: '2%',
  },
});

export default SplashScreen;
