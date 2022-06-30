import React from 'react';
import {Text, View, Image, Alert, BackHandler} from 'react-native';
import {AuthNavigationProps} from '../../navigation/routes';
import {Button, TextNavigation} from '../../components';
import {useBackHandler} from '../../utils';
import {styles} from './styles';
import {pic_healthCare256} from '../../../assets';

export const WelcomeScreen = ({navigation}: AuthNavigationProps<'Welcome'>) => {
  const backAction = () => {
    Alert.alert('Notification', 'Are you sure to exit the app?', [
      {
        text: 'Cancel',
        onPress: () => null,
        style: 'cancel',
      },
      {text: 'YES', onPress: () => BackHandler.exitApp()},
    ]);
  };

  useBackHandler(backAction);

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={pic_healthCare256} />

      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        Welcome to {'\n'} Patient Assitance
      </Text>
      <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
        Your trustworthy healthcare solution
      </Text>
      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
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
