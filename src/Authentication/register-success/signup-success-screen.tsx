import React from 'react';
import {Text, View, Image} from 'react-native';
import {useTranslation} from 'react-i18next';
import {AuthNavigationProps} from '../../navigation';
import {Button} from '../../components';
import {styles} from './styles';
import {pic_check} from '../../../assets';

export const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  const {t} = useTranslation();
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={pic_check} />
      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        {t('signUpSuccessScreen.signUpSuccess')}
      </Text>
      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        text={t('signUpSuccessScreen.signInNow')}
      />
    </View>
  );
};
