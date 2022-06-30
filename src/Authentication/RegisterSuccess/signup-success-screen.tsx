import React from 'react';
import {Text, View, Image} from 'react-native';
import {AuthNavigationProps} from '../../navigation';
import {Button} from '../../components';
import {styles} from './styles';
import {pic_check} from '../../../assets';

export const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={pic_check} />
      <Text style={[styles.textAlignCenter, styles.textBigBoldBlack]}>
        Sign Up Success
      </Text>
      <Button
        style={[styles.buttonBlue, styles.shadowBlue]}
        textStyle={[styles.textAlignCenter, styles.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        text="Sign In Now"
      />
    </View>
  );
};
