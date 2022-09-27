import React from 'react';
import {Text, Image, Alert, BackHandler} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useTranslation} from 'react-i18next';
import {AuthNavigationProps} from '../../navigation/routes';
import {Button, TextNavigation} from '../../components';
import {useBackHandler} from '../../utils';
import {styles} from './styles';
import {pic_healthCare256} from '../../../assets';

export const WelcomeScreen = ({navigation}: AuthNavigationProps<'Welcome'>) => {
  const {t} = useTranslation();
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
    <SafeAreaView edges={['top', 'bottom']} style={styles.container}>
      <Image style={styles.image} source={pic_healthCare256} />

      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        {t('welcomeScreen.welcomeMsg')}
      </Text>
      <Text style={[styles.textAlignCenter, styles.textNormalGray]}>
        {t('welcomeScreen.welcomeMsg1')}
      </Text>
      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Register')}
        text={t('common.getStarted')}
      />
      <TextNavigation
        text={t('common.alreadyHasAccount')}
        onPress={() => navigation.navigate('Login')}
      />
    </SafeAreaView>
  );
};
