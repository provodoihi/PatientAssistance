import React, {useEffect} from 'react';
import {Text, View, Image, Alert, BackHandler} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {Button, TextNavigation} from '../components';
import {authScreenStyle as style} from './style';
import {pic_healthCare256} from '../../assets';

export const WelcomeScreen = ({navigation}: AuthNavigationProps<'Welcome'>) => {
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
    <View style={style.container}>
      <Image style={style.image} source={pic_healthCare256} />

      <Text style={[style.txt, style.txtHeading]}>
        Welcome to {'\n'} Patient Assitance
      </Text>
      <Text style={[style.txt, style.txtDescription]}>
        Your trustworthy healthcare solution
      </Text>
      <Button
        style={[style.button, style.buttonShadow]}
        textStyle={style.txtButton}
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
