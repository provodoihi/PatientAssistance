import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {AuthNavigationProps} from '../../navigation/Routes';
import {CommonActions} from '@react-navigation/routers';
import {useForm} from 'react-hook-form';
import {
  Button,
  SignInSchema,
  ModalLoad,
  TextNavigation,
  TextInputField,
} from '../../components';
import {useStores, SignInDataType} from '../../models';
import {styleLoginScreen as style} from './style';

export const LoginScreen = ({navigation}: AuthNavigationProps<'Login'>) => {
  const [isVisibleLoad, setVisibleLoad] = useState<boolean>(false);
  const {authStore} = useStores();

  const {control, handleSubmit} = useForm<SignInDataType>({
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: SignInSchema,
  });

  const onSubmitLogin = async (data: SignInDataType) => {
    setVisibleLoad(true);
    try {
      await authStore.login(data);
      setVisibleLoad(false);
      navigation.dispatch(
        CommonActions.reset({index: 0, routes: [{name: 'Main'}]}),
      );
    } catch (error) {
      setVisibleLoad(false);
      Alert.alert('Error', 'Invalid username or password', [
        {
          text: 'OK',
          onPress: () => null,
          style: 'cancel',
        },
      ]);
    }
  };

  return (
    <View style={style.container}>
      <Text style={[style.textAlignCenter, style.textBigBoldBlack]}>
        Sign In
      </Text>
      <Text style={[style.textAlignCenter, style.textNormalGray]}>
        Enter your sign in details to access your account
      </Text>
      <ModalLoad isVisibleLoad={isVisibleLoad} />

      <TextInputField
        placeholder="Username"
        placeholderTextColor="#9FA5AA"
        multiline={false}
        controller={control}
        name="username"
        label="Username"
        isErrorField={true}
      />
      <TextInputField
        placeholder="Password"
        placeholderTextColor="#9FA5AA"
        secureTextEntry={true}
        multiline={false}
        controller={control}
        name="password"
        label="Password"
        isErrorField={true}
        onSubmitEditing={handleSubmit(onSubmitLogin)}
      />

      <Button
        style={[style.buttonBlue, style.shadowBlue]}
        textStyle={[style.textAlignCenter, style.textBigBoldWhite]}
        activeOpacity={0.8}
        onPress={handleSubmit(onSubmitLogin)}
        text="Sign In"
      />
      <TextNavigation
        text="Don't have an account? Sign Up"
        onPress={() => navigation.navigate('Register')}
      />
    </View>
  );
};
