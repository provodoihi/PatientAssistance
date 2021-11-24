import React from 'react';
import {Text, View, Image} from 'react-native';
import {AuthNavigationProps} from '../navigation/Routes';
import {Button} from '../components';
import {authScreenStyle as style} from './style';
import {pic_check} from '../../assets';

export const SignupSuccessScreen = ({
  navigation,
}: AuthNavigationProps<'SignupSuccess'>) => {
  return (
    <View style={style.container}>
      <Image style={style.image} source={pic_check} />
      <Text style={style.txtHeading}>Sign Up Success</Text>
      <Button
        style={[style.button, style.buttonShadow]}
        textStyle={style.txtButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('Login')}
        text="Sign In Now"
      />
    </View>
  );
};
