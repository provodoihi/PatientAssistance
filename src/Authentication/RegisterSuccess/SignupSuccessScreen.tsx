import React from 'react';
import {Text, View, Image} from 'react-native';
import {AuthNavigationProps} from '../../navigation/Routes';
import {Button} from '../../components';
import {styleRegisterSuccessScreen as style} from './style';
import {pic_check} from '../../../assets';

export const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  return (
    <View style={style.container}>
      <Image style={style.image} source={pic_check} />
      <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
        Sign Up Success
      </Text>
      <Button
        style={[style.buttonBlue, style.shadowBlue]}
        textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        text="Sign In Now"
      />
    </View>
  );
};
